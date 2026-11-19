export const scenarios = {
  standard: "Decline, timeout, then booking",
  unmatched: "No eligible patient",
  conflict: "Slot taken before booking",
} as const;

export type Scenario = keyof typeof scenarios;
export type Phase = "scheduled" | "matching" | "offered" | "accepted" | "booked" | "review";

export const appointment = {
  id: "PT-1125",
  patient: "John Miller",
  date: "Wednesday, 25 November 2026",
  time: "2:30–3:00 p.m.",
  start: 14 * 60 + 30,
  end: 15 * 60,
  clinician: "Dr. James Bennett",
  type: "Physiotherapy review",
};

export const patients = [
  { name: "Emily Carter", type: appointment.type, optedIn: true, start: 14 * 60, end: 16 * 60, joined: 1 },
  { name: "Michael Brooks", type: appointment.type, optedIn: true, start: 13 * 60, end: 15 * 60, joined: 2 },
  { name: "Sarah Mitchell", type: appointment.type, optedIn: true, start: 14 * 60, end: 16 * 60, joined: 3 },
  { name: "Daniel Wilson", type: "Initial consultation", optedIn: true, start: 14 * 60, end: 16 * 60, joined: 4 },
  { name: "Rachel Kim", type: appointment.type, optedIn: false, start: 13 * 60, end: 16 * 60, joined: 5 },
  { name: "Chris Jordan", type: appointment.type, optedIn: true, start: 15 * 60, end: 17 * 60, joined: 6 },
];

export type Outcome = "accepted" | "declined" | "expired";
type Offer = { id: string; kind: "offer"; recipient: string; outcome?: Outcome };
type Notice = { id: string; kind: "booking" | "handoff" | "review"; recipient: string; body: string };
export type Message = Offer | Notice;
type Activity = { source: string; text: string };

export type Workflow = {
  scenario: Scenario;
  phase: Phase;
  tried: string[];
  messages: Message[];
  activity: Activity[];
  activeOffer: Offer | null;
  expiresAt: number | null;
  reviewReason?: "unmatched" | "conflict";
};

type WorkflowAction =
  | { type: "reset"; scenario: Scenario }
  | { type: "cancel" }
  | { type: "advance"; snapshot: Workflow }
  | { type: "respond"; offerId: string; outcome: Exclude<Outcome, "expired">; at: number }
  | { type: "countdown"; offerId: string; expiresAt: number };

export function startWorkflow(scenario: Scenario): Workflow {
  return { scenario, phase: "scheduled", tried: [], messages: [], activity: [], activeOffer: null, expiresAt: null };
}

export function appointmentType(scenario: Scenario) {
  return scenario === "unmatched" ? "Sports injury assessment" : appointment.type;
}

export function clinicWorkflow(state: Workflow, action: WorkflowAction): Workflow {
  switch (action.type) {
    case "reset":
      return startWorkflow(action.scenario);
    case "cancel":
      if (state.phase !== "scheduled") return state;
      return {
        ...state,
        phase: "matching",
        activity: [
          { source: "Reception", text: "Cancelled the calendar booking for " + appointment.patient + "." },
          { source: "Calendar preview", text: "Detected the cancellation and opened the 2:30 p.m. slot." },
        ],
      };
    case "advance":
      if (action.snapshot !== state) return state;
      if (state.phase === "matching") return sendOffer(state);
      if (state.phase === "accepted") return bookSlot(state);
      if (state.phase === "offered" && state.expiresAt) return settleOffer(state, "expired");
      return state;
    case "respond":
      if (state.phase !== "offered" || state.activeOffer?.id !== action.offerId) return state;
      const expired = state.expiresAt !== null && action.at >= state.expiresAt;
      return settleOffer(state, expired ? "expired" : action.outcome);
    case "countdown":
      if (state.phase !== "offered" || state.activeOffer?.id !== action.offerId || state.expiresAt) return state;
      return { ...state, expiresAt: action.expiresAt };
  }
}

function sendOffer(state: Workflow): Workflow {
  const patient = patients
    .filter(({ name, type, optedIn, start, end }) => (
      optedIn && type === appointmentType(state.scenario) && start <= appointment.start &&
      end >= appointment.end && !state.tried.includes(name)
    ))
    .sort((first, second) => first.joined - second.joined)[0];

  if (!patient) return sendForReview(state, "unmatched");

  const offer: Offer = {
    id: appointment.id + "-" + (state.tried.length + 1),
    kind: "offer",
    recipient: patient.name,
  };

  return {
    ...state,
    phase: "offered",
    activeOffer: offer,
    tried: [...state.tried, patient.name],
    messages: [...state.messages, offer],
    activity: [...state.activity, { source: "Send Offer", text: "Held the slot for " + patient.name + " and sent an offer email." }],
  };
}

function settleOffer(state: Workflow, outcome: Outcome): Workflow {
  const offer = state.activeOffer;
  if (!offer) return state;

  const closedOffer = { ...offer, outcome };
  const accepted = outcome === "accepted";
  const expired = outcome === "expired";
  const text = expired
    ? offer.recipient + " did not reply by the deadline. The slot reopened."
    : offer.recipient + (accepted ? " accepted. Reception received an email." : " declined. The slot reopened.");

  return {
    ...state,
    phase: accepted ? "accepted" : "matching",
    activeOffer: accepted ? closedOffer : null,
    expiresAt: null,
    messages: [
      ...state.messages.map((message) => message.id === offer.id ? closedOffer : message),
      ...(accepted ? [{
        id: "reception-accepted",
        kind: "handoff" as const,
        recipient: "Reception",
        body: offer.recipient + " accepted the 2:30 p.m. appointment. In the tested Zapier workflow, reception books it in the clinic calendar. The calendar preview will now try to book it automatically.",
      }] : []),
    ],
    activity: [...state.activity, { source: expired ? "Expire Offer" : "Process Reply", text }],
  };
}

function bookSlot(state: Workflow): Workflow {
  const patient = state.activeOffer?.recipient;
  if (!patient) return state;
  if (state.scenario === "conflict") return sendForReview(state, "conflict");

  return {
    ...state,
    phase: "booked",
    messages: [...state.messages, {
      id: "booking-confirmed",
      kind: "booking",
      recipient: patient,
      body: "Your " + appointment.type.toLowerCase() + " with " + appointment.clinician + " is booked for " + appointment.time + " on " + appointment.date + ".",
    }],
    activity: [...state.activity, {
      source: "Calendar preview",
      text: "Checked that the slot was free, booked " + patient + ", and sent a confirmation.",
    }],
  };
}

function sendForReview(state: Workflow, reason: "unmatched" | "conflict"): Workflow {
  const conflict = reason === "conflict";
  const body = conflict
    ? "Another appointment took the slot before the booking completed. Review the accepted offer and arrange a different time."
    : "Nobody on the waitlist qualifies for this opening. The slot is still open for reception to fill.";

  return {
    ...state,
    phase: "review",
    activeOffer: null,
    reviewReason: reason,
    messages: [...state.messages, { id: "reception-review", kind: "review", recipient: "Reception", body }],
    activity: [...state.activity, {
      source: conflict ? "Calendar preview" : "Send Offer",
      text: conflict ? "Found an overlapping booking and handed the slot to reception." : "Found no eligible patient and handed the slot to reception.",
    }],
  };
}
