import { CandlestickChart, Database, FileSpreadsheet, Mail, Zap } from "lucide-react";
import Image from "next/image";
import type { ProjectKind } from "../content/projects";
import { FeatureBlockAnimatedCard } from "./aceternity/feature-block-animated-card";

const projectStacks = {
  clinic: {
    tools: [
      ["Zapier", "zap"],
      ["Google Sheets", "spreadsheet"],
      ["Gmail", "mail"],
      ["Next.js", "nextdotjs"],
    ],
    skills: ["Waitlist matching", "Conditional routing", "Offer expiry", "Reception handoff"],
  },
  survey: {
    tools: [
      ["Streamlit", "streamlit"],
      ["spaCy", "spacy"],
      ["Python", "python"],
      ["Transformers", "huggingface"],
      ["scikit-learn", "scikitlearn"],
    ],
    skills: ["Aspect-based sentiment", "Agglomerative clustering", "Local model inference", "Analyst review workflows"],
  },
  travel: {
    tools: [
      ["Streamlit", "streamlit"],
      ["LangChain", "langchain"],
      ["Gemini", "googlegemini"],
      ["LangGraph", "langgraph"],
      ["Chroma", "database"],
    ],
    skills: ["Conversational RAG", "Page-level citations", "Passage indexing", "Retrieval evaluation"],
  },
  build: {
    tools: [
      ["Telegram", "telegram"],
      ["Podman", "podman"],
      ["OpenCode", "opencode"],
      ["Tailscale", "tailscale"],
      ["Ubuntu", "ubuntu"],
    ],
    skills: ["Agent orchestration", "Checkpoint recovery", "Rootless containers", "CI/CD and rollback"],
  },
  trade: {
    tools: [
      ["MetaTrader 5", "candlestick"],
      ["PySide6", "qt"],
      ["Socket.IO", "socketdotio"],
      ["NestJS", "nestjs"],
      ["Next.js", "nextdotjs"],
    ],
    skills: ["WebSocket event routing", "Broker symbol mapping", "Ticket reconciliation", "Account-level risk controls"],
  },
} satisfies Record<ProjectKind, { tools: [name: string, icon: string][]; skills: string[] }>;

export function ProjectStack({ kind }: { kind: ProjectKind }) {
  const { tools, skills } = projectStacks[kind];

  return (
    <section className="case-section" aria-labelledby="project-stack-title">
      <h2 id="project-stack-title">Tools and Skills</h2>
      <FeatureBlockAnimatedCard
        tools={tools.map(([name, icon]) => ({ name, icon: <TechnologyIcon icon={icon} /> }))}
        skills={skills}
      />
    </section>
  );
}

function TechnologyIcon({ icon }: { icon: string }) {
  if (icon === "zap") return <Zap aria-hidden="true" />;
  if (icon === "spreadsheet") return <FileSpreadsheet aria-hidden="true" />;
  if (icon === "mail") return <Mail aria-hidden="true" />;
  if (icon === "database") return <Database aria-hidden="true" />;
  if (icon === "candlestick") return <CandlestickChart aria-hidden="true" />;

  return <Image src={`/images/tech/${icon}.svg`} alt="" width={32} height={32} unoptimized />;
}
