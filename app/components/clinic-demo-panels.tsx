import { CalendarDays, Clock3, Inbox, Mail } from "lucide-react";
import { appointment, appointmentType, type Message, type Workflow } from "./clinic-workflow";

const days = [["Mon", 23], ["Tue", 24], ["Wed", 25], ["Thu", 26], ["Fri", 27]] as const;
const rows = [
  ["1:30", "", "Follow-up", "", "", "Consult"],
  ["2:00", "Review", "", "Follow-up", "Review", ""],
  ["2:30", "", "", "", "", "Follow-up"],
  ["3:00", "Follow-up", "", "Assessment", "", ""],
] as const;

export function ClinicCalendar({ state, onCancel }: { state: Workflow; onCancel: () => void }) {
  const status = {
    scheduled: "Booked",
    matching: "Opening",
    offered: "On hold",
    accepted: "Booking…",
    booked: "Rebooked",
    review: state.reviewReason === "conflict" ? "Taken" : "Open",
  }[state.phase];
  const detail = {
    scheduled: appointment.patient,
    matching: "Checking the waitlist",
    offered: "Held for " + state.activeOffer?.recipient,
    accepted: "Checking the calendar for " + state.activeOffer?.recipient,
    booked: state.activeOffer?.recipient + " · Confirmed",
    review: state.reviewReason === "conflict" ? "Another appointment occupies this slot" : "Open for reception to fill",
  }[state.phase];

  return (
    <section className="clinic-calendar" aria-labelledby="clinic-calendar-heading">
      <h3 id="clinic-calendar-heading"><CalendarDays size={19} aria-hidden /> Clinic calendar</h3>
      <div className="clinic-calendar-period">
        <strong className="clinic-period-week">23–27 November 2026</strong>
        <strong className="clinic-period-focus">24–26 November 2026</strong>
        <span>PKT</span>
      </div>
      <table className="clinic-week">
        <caption className="visually-hidden">Physiotherapy calendar, times in the afternoon</caption>
        <thead>
          <tr>
            <th scope="col">p.m.</th>
            {days.map(([day, date]) => (
              <th key={date} scope="col" className={date === 25 ? "clinic-calendar-day" : undefined}>
                <span>{day}</span> <strong>{date}</strong>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([time, ...events], index) => (
            <tr key={time}>
              <th scope="row">{time}</th>
              {events.map((event, dayIndex) => {
                const slot = dayIndex === 2 && index === 2;
                return (
                  <td key={days[dayIndex][1]} className={dayIndex === 2 ? "clinic-calendar-day" : undefined}>
                    {slot ? <span className="clinic-calendar-slot" data-phase={state.phase}>{status}</span>
                      : event && <span className="clinic-calendar-event">{event}</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="clinic-calendar-detail">
        <div>
          <p><strong>{appointmentType(state.scenario)}</strong></p>
          <p>{appointment.time} · {appointment.clinician}</p>
          <p>{detail}</p>
        </div>
        {state.phase === "scheduled" && (
          <button className="action action--primary" onClick={onCancel}>Cancel booking</button>
        )}
      </div>
    </section>
  );
}

const subjects = {
  offer: "Appointment offer",
  handoff: "Appointment accepted",
  booking: "Booking confirmed",
  review: "Reception review needed",
};

export function ClinicInbox({ state, message, seconds, onRead, onRespond, onCountdown }: {
  state: Workflow;
  message: Message | undefined;
  seconds: number | null;
  onRead: (id: string) => void;
  onRespond: (offerId: string, outcome: "accepted" | "declined") => void;
  onCountdown: (offerId: string) => void;
}) {
  return (
    <section className="clinic-inbox" id="clinic-demo-inbox" aria-labelledby="clinic-inbox-heading" tabIndex={-1}>
      <h3 id="clinic-inbox-heading"><Inbox size={19} aria-hidden /> Demo inbox</h3>
      {message ? (
        <>
          <div className="clinic-message">
            <p className="clinic-message-recipient">To {message.recipient}</p>
            <h4>{subjects[message.kind]}</h4>
            {message.kind === "offer" ? (
              <>
                <p>A {appointment.type.toLowerCase()} is available on Wednesday, 25 November, from {appointment.time} PKT.</p>
                {message.outcome ? (
                  <p className="clinic-message-outcome">{message.outcome === "expired" ? "Offer expired" : "Offer " + message.outcome}</p>
                ) : (
                  <>
                    <p className="clinic-offer-meta">
                      <Clock3 size={14} aria-hidden />
                      {seconds === null ? "Reply window: 5 minutes" : <span role="timer">{seconds}s left in the demo</span>}
                    </p>
                    <div className="clinic-replies" aria-label="Respond to offer">
                      <button className="action action--primary" onClick={() => onRespond(message.id, "accepted")}>Accept</button>
                      <button className="action" onClick={() => onRespond(message.id, "declined")}>Decline</button>
                    </div>
                    <button className="clinic-text-button" disabled={seconds !== null} onClick={() => onCountdown(message.id)}>Simulate no reply</button>
                  </>
                )}
              </>
            ) : <p>{message.body}</p>}
          </div>
          {state.messages.length > 1 && (
            <ul className="clinic-mail-list" aria-label="Inbox messages">
              {[...state.messages].reverse().map((item) => (
                <li key={item.id}>
                  <button onClick={() => onRead(item.id)} aria-pressed={item.id === message.id}>
                    <Mail size={15} aria-hidden />
                    <span>{subjects[item.kind]} · {item.recipient}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : <p className="clinic-inbox-empty">Offer emails and updates will appear here as the walkthrough runs.</p>}
    </section>
  );
}
