#!/usr/bin/env bash
set -euo pipefail
umask 022

root=/srv/awais-tech
channel=https://github.com/awaisarif18/awais-tech/releases

exec 9>"$root/.deploy.lock"
flock -n 9 || exit 0

work=$(mktemp -d "$root/.incoming.XXXXXX")
trap 'rm -rf -- "$work"' EXIT

fetch() {
  curl --proto '=https' --proto-redir '=https' --fail --silent --show-error \
    --location --retry 2 --connect-timeout 8 --max-time 90 --max-filesize 250000000 "$1" -o "$2"
}

# The latest redirect can outlive a publish in an intermediary cache.
fetch "$channel/latest/download/release.json?poll=$(date +%s)" "$work/release.json"
commit=$(jq -er '.commit | select(test("^[0-9a-f]{40}$"))' "$work/release.json")
current=$(readlink "$root/current" || true)
target="releases/$commit"
if [[ "$current" == "$target" || "$(cat "$root/.failed-release" 2>/dev/null || true)" == "$commit" ]]; then
  exit 0
fi

source="$channel/download/production-$commit"
fetch "$source/release.sig" "$work/release.sig"
openssl pkeyutl -verify -rawin -pubin -inkey /etc/awais-tech/release-signing.pub \
  -in "$work/release.json" -sigfile "$work/release.sig"
digest=$(jq -er '.sha256 | select(test("^[0-9a-f]{64}$"))' "$work/release.json")
fetch "$source/portfolio-arm64.tar.gz" "$work/portfolio-arm64.tar.gz"
(cd "$work" && printf '%s  portfolio-arm64.tar.gz\n' "$digest" | sha256sum --check --strict)

mkdir "$work/release"
tar --extract --gzip --no-same-owner --no-same-permissions -f "$work/portfolio-arm64.tar.gz" -C "$work/release"
test -f "$work/release/server.js"
test -d "$work/release/.next/static"
test "$(cat "$work/release/public/release.txt")" = "$commit"
ln -s /var/cache/awais-tech "$work/release/.next/cache"
if [[ ! -d "$root/$target" ]]; then
  mv -T -- "$work/release" "$root/$target"
fi

switch_to() {
  ln -s -- "$1" "$work/current"
  mv -Tf -- "$work/current" "$root/current"
}

healthy() {
  local version
  for _ in {1..20}; do
    version=$(curl -fsS --max-time 3 http://127.0.0.1:3210/release.txt 2>/dev/null || true)
    if [[ "$version" == "$commit" ]] && curl -fsS --max-time 3 -o /dev/null http://127.0.0.1:3210/; then
      return 0
    fi
    sleep 1
  done
  return 1
}

switch_to "$target"
if sudo -n /usr/bin/systemctl restart awais-tech.service && healthy; then
  if [[ -n "$current" ]]; then
    ln -s -- "$current" "$work/previous"
    mv -Tf -- "$work/previous" "$root/previous"
  fi
  rm -f -- "$root/.failed-release"
  for release in "$root"/releases/*; do
    candidate="releases/${release##*/}"
    if [[ "$candidate" =~ ^releases/[0-9a-f]{40}$ && "$candidate" != "$target" && "$candidate" != "$current" ]]; then
      rm -rf -- "$release"
    fi
  done
  printf 'Activated %s\n' "$commit"
else
  printf '%s\n' "$commit" > "$root/.failed-release"
  if [[ "$current" =~ ^releases/[0-9a-f]{40}$ ]]; then
    switch_to "$current"
    sudo -n /usr/bin/systemctl restart awais-tech.service
  else
    rm -f -- "$root/current"
    sudo -n /usr/bin/systemctl stop awais-tech.service
  fi
  printf 'Release %s failed health checks and was rolled back\n' "$commit" >&2
  exit 1
fi
