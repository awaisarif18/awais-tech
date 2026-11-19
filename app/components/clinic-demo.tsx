"use client";

import { Check, RotateCcw } from "lucide-react";
import { useEffect, useReducer, useRef, useState } from "react";
import { ClinicCalendar, ClinicInbox } from "./clinic-demo-panels";
import { appointment, clinicWorkflow, patients, scenarios, startWorkflow, type Phase, type Scenario } from "./clinic-workflow";
import "./clinic-demo.css";

const demoReplyWindow = 8;
const milestones = [
  { label: "Cancel", phases: ["scheduled"] },
  { label: "Find a match", phases: ["matching"] },
  { label: "Get a reply", phases: ["offered"] },
  { label: "Resolve the slot", phases: ["accepted", "booked", "review"] },
];

const phaseLabel: Record<Phase, string> = {
  scheduled: "Start with the 2:30 p.m. booking",
  matching: "Checking the waitlist",
  offered: "An offer is in the inbox",
  accepted: "Accepted. Checking the calendar.",
  booked: "The replacement appointment is booked",
  review: "Reception needs to review this slot",
};

const instructions: Record<Phase, string> = {
  scheduled: "Cancel the booking for " + appointment.patient + ". The demo detects the opening and checks the waitlist.",
  matching: "The workflow checks opt-in, appointment type and availability, then offers the slot in waitlist order.",
  offered: "Respond from the demo inbox. Try declining the first offer, letting the second expire and accepting the third.",
  accepted: "Reception has an email. The calendar preview checks the slot one last time before booking.",
  booked: "The calendar shows the new patient. The inbox has the booking confirmation and the earlier offers.",
  review: "Open the reception email in the inbox for the reason and next step.",
};

export function ClinicDemo() {
  const [state, dispatch] = useReducer(clinicWorkflow, "standard", startWorkflow);
  const [selectedMail, setSelectedMail] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(demoReplyWindow);
  const status = useRef<HTMLHeadingElement>(null);
  const expiresAt = state.expiresAt;
  const currentMessage = state.messages.find(({ id }) => id === selectedMail) ?? state.messages.at(-1);
  const currentMilestone = milestones.findIndex(({ phases }) => phases.includes(state.phase));

  useEffect(() => {
    if (state.phase !== "matching" && state.phase !== "accepted" && expiresAt === null) return;
    const delay = expiresAt === null ? 900 : Math.max(0, expiresAt - Date.now());
    const timeout = window.setTimeout(() => dispatch({ type: "advance", snapshot: state }), delay);
    if (expiresAt === null) return () => window.clearTimeout(timeout);

    const ticker = window.setInterval(() => setSeconds(Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000))), 200);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(ticker);
    };
  }, [state, expiresAt]);

  const nextInstruction = state.phase === "offered" && expiresAt !== null
    ? "The demo is counting down to the reply deadline. Watch the inbox for the next offer."
    : state.phase === "offered" && state.scenario === "conflict"
      ? "Accept the offer to see what happens when another booking takes the slot."
      : instructions[state.phase];

  function reset(scenario: Scenario) {
    setSelectedMail(null);
    dispatch({ type: "reset", scenario });
  }

  return (
    <section id="clinic-demo" className="clinic-demo" aria-labelledby="clinic-demo-title">
      <header className="clinic-demo-header">
        <h2 id="clinic-demo-title">Try the interactive walkthrough</h2>
        <p>A sample calendar and inbox recreate the Zapier workflow in your browser. Calendar cancellation detection and automatic booking are integration previews. All appointments and messages are fictional.</p>
      </header>
      <div className="clinic-demo-frame">
        <div className="clinic-demo-toolbar">
          <label htmlFor="clinic-scenario">Scenario</label>
          <select id="clinic-scenario" value={state.scenario} onChange={(event) => reset(event.target.value as Scenario)}>
            {Object.entries(scenarios).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <button className="clinic-text-button clinic-restart" onClick={() => reset(state.scenario)} disabled={state.phase === "scheduled"}>
            <RotateCcw size={15} aria-hidden /> Restart
          </button>
        </div>
        <ol className="clinic-milestones" aria-label="Walkthrough progress">
          {milestones.map(({ label }, index) => (
            <li key={label} aria-current={index === currentMilestone ? "step" : undefined} data-done={index < currentMilestone}>
              <span aria-hidden>{index < currentMilestone ? <Check size={13} /> : index + 1}</span>
              {label}
            </li>
          ))}
        </ol>
        <div className="clinic-next">
          <div role="status" aria-atomic="true">
            <h3 ref={status} tabIndex={-1}>{phaseLabel[state.phase]}</h3>
            <p>{nextInstruction}</p>
          </div>
          {(state.phase === "offered" || state.phase === "review") && (
            <a className="clinic-inbox-jump" href="#clinic-demo-inbox">Go to demo inbox</a>
          )}
        </div>
        <div className="clinic-demo-panels">
          <ClinicCalendar state={state} onCancel={() => { dispatch({ type: "cancel" }); status.current?.focus({ preventScroll: true }); }} />
          <ClinicInbox
            state={state}
            message={currentMessage}
            seconds={expiresAt === null ? null : seconds}
            onRead={setSelectedMail}
            onRespond={(offerId, outcome) => {
              setSelectedMail(null);
              dispatch({ type: "respond", offerId, outcome, at: Date.now() });
              status.current?.focus({ preventScroll: true });
            }}
            onCountdown={(offerId) => {
              setSeconds(demoReplyWindow);
              dispatch({ type: "countdown", offerId, expiresAt: Date.now() + demoReplyWindow * 1000 });
              status.current?.focus({ preventScroll: true });
            }}
          />
        </div>
        <div className="clinic-demo-log">
          <h3>Workflow activity</h3>
          {state.activity.length > 0 ? (
            <ol>
              {state.activity.map(({ source, text }, index) => <li key={index}><strong>{source}</strong><span>{text}</span></li>)}
            </ol>
          ) : <p>Activity will appear when you cancel the booking.</p>}
          <details>
            <summary>View the sample waitlist</summary>
            <ol className="clinic-waitlist">
              {patients.map(({ name, optedIn, type, start }) => (
                <li key={name}>
                  <strong>{name}</strong>
                  <span>{optedIn ? type : "Offer emails off"}{start >= 15 * 60 ? " · Available after 3 p.m." : ""}</span>
                </li>
              ))}
            </ol>
          </details>
        </div>
      </div>
    </section>
  );
}
