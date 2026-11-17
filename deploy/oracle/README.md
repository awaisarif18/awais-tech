# Oracle deployment

Push to `master` to deploy. Pull requests into `master` run the build and smoke tests. The **Test and deploy portfolio** workflow builds for Linux ARM64, checks the homepage and project pages, and publishes a signed GitHub Release. GitHub Actions then checks that the public site serves the matching commit at `/release.txt`.

The Oracle VM checks for releases approximately every 30 seconds. It verifies the Ed25519 signature and archive SHA-256 before unpacking. The deploy user can restart or stop only the portfolio service through sudo. The web service runs as a separate unprivileged user on `127.0.0.1:3210`. Caddy fronts it on public HTTPS and redirects HTTP and `www` to `https://awaisarif.tech`.

Check the release and the services from the existing VM admin session:

```sh
curl -fsS https://awaisarif.tech/release.txt
systemctl status awais-tech.service awais-tech-deploy.timer
sudo journalctl -u awais-tech-deploy.service -u awais-tech.service -n 60
```

A release that fails its health check is replaced with the previous working release when one exists. To roll back an otherwise healthy release through CI, revert the offending commit and push the revert to `master`.

The GitHub Actions secret `PORTFOLIO_RELEASE_SIGNING_KEY` holds the private key, and `/etc/awais-tech/release-signing.pub` holds the verification key on Oracle. To rotate the signing key, pause the deployment timer, update both keys, publish a fresh commit, then resume the timer and verify the HTTPS release marker. The managed application files are under `/srv/awais-tech/`, and the image cache is under `/var/cache/awais-tech/`.
