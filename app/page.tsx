import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { CardContainer } from "./components/aceternity/3d-card";
import { Cover } from "./components/aceternity/cover";
import { Timeline } from "./components/aceternity/timeline";
import { ExperienceTimeline } from "./components/experience-timeline";
import { FAQ } from "./components/faq";
import { HeroPhoto } from "./components/hero-photo";
import { ProjectCover, ProjectCoverLink } from "./components/project-cover";
import { BookingLink, Footer } from "./components/site";
import { FlippingStage } from "./components/text-motion";
import { projects } from "./content/projects";

export default function Home() {
  return (
    <>
      <main id="main">
        <header className="hero">
          <div className="hero-stage">
            <HeroPhoto />
            <h1 className="hero-name">
              <span>Awais</span>{" "}<span>Arif</span>
            </h1>
          </div>
          <div className="hero-intro">
            <p className="hero-role">Forward Deployed AI Engineer</p>
            <p className="hero-description">I turn manual research and review into software your team can check.</p>
            <a className="hero-projects-link" href="#projects">
              View Projects <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
        </header>

        <ExperienceTimeline />

        <section className="section-shell work" id="projects" aria-labelledby="work-title">
          <h2 id="work-title" className="section-title">Selected Projects</h2>
          {projects.map((project) => (
            <article key={project.slug} className={`spread spread--${project.kind}`}>
              <h3>{project.title}</h3>
              <ProjectCoverLink
                href={`/projects/${project.slug}`}
                title={project.title}
              >
                <ProjectCover kind={project.kind} />
              </ProjectCoverLink>
              <div className="spread-notes">
                <p>{project.summary}</p>
                <p className="project-proof">{project.proof}</p>
                <p className="project-context">{project.context}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="section-shell approach" aria-labelledby="approach-title">
          <div className="approach-copy">
            <h2 id="approach-title" className="section-title">How I Work</h2>
            <p>I work with the people who do the job today. They help me spot the exceptions and check the first version against their own work.</p>
            <p className="approach-bio">I studied computer science at COMSATS. Outside engineering, I take my camera into the mountains.</p>
            <CardContainer className="approach-photo">
              <Image
                src="/images/field-portrait.webp"
                alt="Awais Arif in a dark jacket and cap with mountains behind him"
                fill
                sizes="(min-width: 861px) 39vw, calc(100vw - max(48px, 9.72vw))"
              />
            </CardContainer>
          </div>
          <Timeline className="approach-timeline">
            <li className="approach-step">
              <span className="timeline-marker" aria-hidden="true" />
              <h3>Start With a Real Example</h3>
              <p>Walk through a survey response, a document question, or a record your team reviews.</p>
            </li>
            <li className="approach-step">
              <span className="timeline-marker" aria-hidden="true" />
              <h3>Agree on a <Cover>Good Result</Cover></h3>
              <p>Pick examples to test and decide which cases still need someone’s judgment.</p>
            </li>
            <li className="approach-step">
              <span className="timeline-marker" aria-hidden="true" />
              <h3><span className="visually-hidden">Prototype, Pilot, Release</span><FlippingStage /></h3>
              <p>Build one useful part first. Test it on your examples before connecting it to the rest of the workflow.</p>
            </li>
          </Timeline>
        </section>

        <FAQ />

        <section className="section-shell discovery" id="contact" aria-labelledby="discovery-title">
          <div>
            <h2 id="discovery-title" className="section-title">What Does Your Team<br className="desktop-break" /> Still Do by Hand?</h2>
            <p>Bring one workflow and an example you deal with today. We’ll map where the time goes and what a useful first version could handle.</p>
          </div>
          <div className="discovery-action">
            <BookingLink />
            <p>Choose a time for a Google Meet call.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
