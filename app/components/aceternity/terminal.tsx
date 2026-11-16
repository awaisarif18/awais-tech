"use client";

// Adapted from https://ui.aceternity.com/registry/terminal.json.
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type TokenType =
  | "command"
  | "flag"
  | "string"
  | "number"
  | "operator"
  | "path"
  | "variable"
  | "comment"
  | "default";

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeBash(text: string): Token[] {
  const tokens: Token[] = [];
  const words = text.split(/(\s+)/);

  let isFirstWord = true;

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      tokens.push({ type: "default", value: word });
      continue;
    }

    if (word.startsWith("#")) {
      tokens.push({ type: "comment", value: word });
      continue;
    }

    if (word.startsWith("$")) {
      tokens.push({ type: "variable", value: word });
      isFirstWord = false;
      continue;
    }

    if (word.startsWith("--") || word.startsWith("-")) {
      tokens.push({ type: "flag", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^["'].*["']$/.test(word)) {
      tokens.push({ type: "string", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^\d+$/.test(word)) {
      tokens.push({ type: "number", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^[|>&<]+$/.test(word)) {
      tokens.push({ type: "operator", value: word });
      isFirstWord = true;
      continue;
    }

    if (word.includes("/") || word.startsWith(".") || word.startsWith("~")) {
      tokens.push({ type: "path", value: word });
      isFirstWord = false;
      continue;
    }

    if (isFirstWord) {
      tokens.push({ type: "command", value: word });
      isFirstWord = false;
      continue;
    }

    tokens.push({ type: "default", value: word });
  }

  return tokens;
}

function SyntaxHighlightedText({ text }: { text: string }) {
  const tokens = tokenizeBash(text);

  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} data-token={token.type}>
          {token.value}
        </span>
      ))}
    </>
  );
}

type Entry = { command: string; output: string[] };

export function Terminal({ entries }: { entries: Entry[] }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: .35 });
  const reduced = useReducedMotion();
  const [position, setPosition] = useState({ entry: 0, count: 0 });
  const current = entries[position.entry];
  const typing = current && position.count < current.command.length;

  useEffect(() => {
    if (!visible || reduced || !current) return;
    const timer = window.setTimeout(
      () => setPosition(typing ? { entry: position.entry, count: position.count + 1 } : { entry: position.entry + 1, count: 0 }),
      typing ? 20 : 540,
    );
    return () => window.clearTimeout(timer);
  }, [visible, reduced, current, typing, position]);

  return (
    <figure className="build-terminal" ref={ref}>
      <figcaption><span className="terminal-lights" aria-hidden="true" />Example build session</figcaption>
      <div className="terminal-body">
        {entries.map(({ command, output }, index) => {
          const complete = !!reduced || index <= position.entry && (index < position.entry || !typing);
          const typed = index === position.entry ? position.count : 0;
          return (
            <div className="terminal-entry" key={command}>
              <code>
                <span aria-hidden="true" className="terminal-prompt">$ </span>
                <span className="visually-hidden">{command}</span>
                <span className="terminal-command" aria-hidden="true">
                  <span className="terminal-measure">{command}</span>
                  <span className="terminal-typed">
                    <SyntaxHighlightedText text={complete ? command : command.slice(0, typed)} />
                    {visible && !reduced && index === position.entry && typing && <span className="terminal-cursor" />}
                  </span>
                </span>
              </code>
              <div className={complete ? "terminal-output" : "terminal-output terminal-output-pending"}>
                {output.map((line) => <p key={line}>{line}</p>)}
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
