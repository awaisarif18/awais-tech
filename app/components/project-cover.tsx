import Image from "next/image";
import type { ProjectKind } from "../content/projects";
import { CardContainer } from "./aceternity/3d-card";
export { ProjectCoverLink } from "./project-cover-link";

export const covers = {
  survey: {
    src: "/images/survey-theme-analysis-cover.webp",
    alt: "Colour-coded paper slips branch into separate piles marked with checks and crosses.",
    kicker: "One survey response",
    statement: "“Good flavour. Hard to open.”",
    result: "Two clauses, two tags.",
    note: "Flavour is positive. Packaging is negative.",
  },
  travel: {
    src: "/images/journey-02-follow-the-water.webp",
    alt: "",
    kicker: "Ask the travel guide",
    statement: "Where can I refuel before Khunjerab?",
    result: "Refuel at Sost.",
    note: "Travel guide · PDF pages 6–8",
  },
  build: {
    src: "/images/overnight-ai-build-lab-cover.webp",
    alt: "An amber line passes through checkpoints and a server to a build report on a desk at night.",
    kicker: "Telegram → OpenCode",
    statement: "Send a brief. Wake to a report.",
    result: "The build runs on a remote VM.",
    note: "Saved checkpoints let it pick up where it stopped.",
  },
  trade: {
    src: "/images/tradesync-pro-cover.webp",
    alt: "Two chart displays connect to the same gateway and show different position sizes.",
    kicker: "MT5 trade copying",
    statement: "Same signal. Different trade sizes.",
    result: "The copier sizes the trade.",
    note: "Each account applies its own risk limits.",
  },
};

const coverSizes = {
  gallery: {
    survey: "(max-width: 420px) calc(74vw - 36px), (max-width: 800px) 60vw, 36vw",
    build: "(max-width: 420px) calc(74vw - 36px), (max-width: 800px) 60vw, 36vw",
    travel: "(max-width: 800px) 52vw, 40vw",
    trade: "(max-width: 420px) calc(74vw - 36px), (max-width: 800px) 60vw, 40vw",
  },
  caseStudy: {
    survey: "(max-width: 420px) calc(74vw - 36px), (min-width: 1140px) 684px, 61vw",
    build: "(max-width: 420px) calc(74vw - 36px), (min-width: 1140px) 684px, 61vw",
    travel: "(min-width: 1140px) 530px, calc(52vw - 25px)",
    trade: "(max-width: 420px) calc(74vw - 36px), (min-width: 1140px) 684px, 61vw",
  },
};

export function ProjectCover({ kind, placement = "gallery" }: { kind: ProjectKind; placement?: "gallery" | "caseStudy" }) {
  const { src, alt, kicker, statement, result, note } = covers[kind];
  const travel = kind === "travel";
  const isLeadImage = placement === "caseStudy";

  return (
    <div className={`cover-art cover-art--${kind}${travel ? "" : " cover-art--illustrated"}`}>
      <CardContainer className="cover-media">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={coverSizes[placement][kind]}
          loading={isLeadImage ? "eager" : "lazy"}
          fetchPriority={isLeadImage ? "high" : undefined}
        />
      </CardContainer>
      <div className="cover-copy">
        <p className="cover-kicker">{kicker}</p>
        <p className="cover-statement">{statement}</p>
        <div className="cover-result">
          <p>{result}</p>
          <p className="cover-note">{note}</p>
        </div>
      </div>
    </div>
  );
}
