import type { Metadata } from "next";
import "@fontsource/barlow-semi-condensed/latin-600.css";
import "@fontsource-variable/atkinson-hyperlegible-next/wght.css";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseArrival } from "../../components/case-arrival";
import { LinkPreview } from "../../components/aceternity/link-preview";
import { NoiseBackground } from "../../components/aceternity/noise-background";
import { Terminal } from "../../components/aceternity/terminal";
import { ProjectCover } from "../../components/project-cover";
import { ProjectStack } from "../../components/project-stack";
import { BookingLink, Footer } from "../../components/site";
import { projects, type CaseText, type ProjectKind } from "../../content/projects";

type CasePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  return project ? { title: project.title, description: project.premise } : {};
}

export default async function CaseStudy({ params }: CasePageProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();

  return (
    <>
      <main className="case-shell" id="main">
        <div className="case-topbar">
          <Link href="/#projects"><ArrowLeft size={17} aria-hidden="true" /> All Projects</Link>
        </div>
        <CaseArrival>
          <header className="case-header">
            <h1>{project.title}</h1>
            <p>{project.premise}</p>
            {project.status && <p className="case-status">{project.status}</p>}
            {project.actions.length > 0 && (
              <div className="case-actions">
                {project.actions.map(({ label, href }) => {
                  const primary = label === "Open Live App";
                  return (
                    <LinkPreview key={href} url={href} title={label} screenshot className={`action${primary ? " action--primary" : ""}`}>
                      <NoiseBackground primary={primary} />{label}
                    </LinkPreview>
                  );
                })}
              </div>
            )}
          </header>
          <figure className="case-figure">
            <ProjectCover kind={project.kind} placement="caseStudy" />
            <figcaption>{project.caption}</figcaption>
          </figure>
          <ProjectStack kind={project.kind} />
          <CaseEvidence kind={project.kind} />
          {project.sections.map((section) => (
            <section className="case-section" key={section.title}>
              <h2>{section.title}</h2>
              <div className="case-prose">
                {section.body.map(({ heading, text }, index) => (
                  <div key={heading ?? index}>
                    {heading && <h3>{heading}</h3>}
                    <CaseParagraphText text={text} />
                  </div>
                ))}
              </div>
            </section>
          ))}
          <section className="case-section case-discovery">
            <h2>{project.booking.title}</h2>
            <div className="case-prose">
              <p>{project.booking.description}</p>
              <BookingLink />
            </div>
          </section>
        </CaseArrival>
      </main>
      <Footer />
    </>
  );
}

function CaseParagraphText({ text }: { text: CaseText }) {
  if (typeof text === "string") return <p>{text}</p>;

  return (
    <p>
      {text.map((part, index) => typeof part === "string" ? part : (
        <strong key={index} className={part.tone === "result" ? "case-result" : "case-emphasis"}>{part.strong}</strong>
      ))}
    </p>
  );
}

function CaseEvidence({ kind }: { kind: ProjectKind }) {
  if (kind === "build") {
    return (
      <aside className="case-evidence" aria-label="Invoice reviewer demo">
        <p className="evidence-label">Invoice reviewer demo</p>
        <h2><strong className="case-result">$200 discrepancy</strong> flagged</h2>
        <p>Invoice and PO: $12 per unit. Contract: $10 per unit. Quantity: 100 units.</p>
        <Terminal entries={[
          { command: "podman ps --format '{{.Names}}'", output: ["opencode-build"] },
          { command: "cat ./build-report.txt", output: ["Invoice and purchase order  $12 per unit", "Contract                    $10 per unit", "Flagged                     $200 across 100 units"] },
        ]} />
      </aside>
    );
  }

  return null;
}
