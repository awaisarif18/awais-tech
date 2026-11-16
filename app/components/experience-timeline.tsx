import { experience } from "../content/profile";
import { Timeline } from "./aceternity/timeline";

export function ExperienceTimeline() {
  return (
    <section className="section-shell experience" id="experience" aria-labelledby="experience-title">
      <header>
        <h2 id="experience-title" className="section-title">Experience</h2>
        <p>Research tooling and full-stack delivery.</p>
      </header>
      <Timeline>
        {experience.map(({ date, company, role, contribution }) => (
          <li className="timeline-entry" key={company}>
            <div className="entry-date">
              <span className="timeline-marker" aria-hidden="true" />
              {date}
            </div>
            <div className="entry-work">
              <h3>{company}</h3>
              <p className="entry-role">{role}</p>
              <p className="entry-contribution">{contribution}</p>
            </div>
          </li>
        ))}
      </Timeline>
    </section>
  );
}
