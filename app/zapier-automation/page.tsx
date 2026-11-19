import type { Metadata } from "next";
import "@fontsource/barlow-semi-condensed/latin-600.css";
import "@fontsource-variable/atkinson-hyperlegible-next/wght.css";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CoverArtwork } from "../components/project-cover";
import { BookingLink, Footer } from "../components/site";

const title = "Zapier Automations for Small Businesses";
const description = "See how Zapier can route leads, onboard clients, collect invoice approvals, and catch shipping delays.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/zapier-automation" },
};

const useCases = [
  {
    title: "Route new leads",
    artwork: {
      src: "/images/zapier/route-new-leads-cover.webp",
      alt: "A quote-request card filed in a sales tray beside a phone.",
      kicker: "Quote form → CRM",
      statement: "The right rep gets the lead.",
      result: "Follow up if there’s no reply.",
    },
    flow: "A quote request creates or updates a contact in the CRM. Zapier assigns the request based on service or territory and alerts the owner. Before sending a follow-up, it checks whether the contact has already replied.",
    measure: "Time to first response and leads that went unanswered.",
    source: {
      label: "Zapier Paths",
      href: "https://help.zapier.com/hc/en-us/articles/8496288555917-Add-branching-logic-to-Zap-workflows-with-Paths",
    },
  },
  {
    title: "Onboard clients after signing",
    artwork: {
      src: "/images/zapier/client-onboarding-cover.webp",
      alt: "A signed contract beside a project folder and a completed kickoff checklist.",
      kicker: "E-signature → Project",
      statement: "The contract is signed.",
      result: "The kickoff checklist is ready.",
    },
    flow: "When a DocuSign agreement is complete, Zapier updates the deal, creates a project from a template, and assigns the kickoff checklist. The account owner gets the project link and sees who owns each next step.",
    measure: "Time from signature to kickoff.",
    source: {
      label: "DocuSign integration",
      href: "https://zapier.com/apps/docusign/integrations",
    },
  },
  {
    title: "Approve supplier invoices",
    artwork: {
      src: "/images/zapier/invoice-approvals-cover.webp",
      alt: "An approval stamp next to an invoice marked with a teal check.",
      kicker: "Inbox → Approval",
      statement: "A supplier invoice arrives.",
      result: "Finance gets the approved bill.",
    },
    flow: "An invoice from a shared inbox enters an approval queue. Zapier looks for the same supplier and invoice number, then asks the manager to review the bill. Approved invoices go to finance for payment.",
    measure: "Time to approval and duplicate invoices flagged.",
    source: {
      label: "Zapier approval steps",
      href: "https://help.zapier.com/hc/en-us/articles/38731463206029-Request-approval-to-keep-your-workflow-running-with-Human-in-the-Loop",
    },
  },
  {
    title: "Catch missed shipments",
    artwork: {
      src: "/images/zapier/missed-shipments-cover.webp",
      alt: "A scanner points at an orange exception tag on a warehouse parcel.",
      kicker: "Orders → Fulfillment",
      statement: "An order misses its ship date.",
      result: "Fulfillment gets an exception list.",
    },
    flow: "Each weekday afternoon, Zapier checks paid orders against their shipping records. Any order past its promised ship date without a tracking number goes on one exception list for the fulfillment team.",
    measure: "Overdue orders and time to resolve them.",
    source: {
      label: "Schedule by Zapier",
      href: "https://help.zapier.com/hc/en-us/articles/8496288648461-Schedule-Zap-workflows-to-run-at-specific-intervals",
    },
  },
];

export default function ZapierAutomationPage() {
  return (
    <>
      <main className="case-shell zapier-shell" id="main">
        <div className="case-topbar">
          <Link href="/projects/clinic-waitlist-automation"><ArrowLeft size={17} aria-hidden="true" /> Clinic Waitlist Automation</Link>
        </div>
        <header className="case-header">
          <h1>{title}</h1>
          <p>Connect the apps you already use so the next step starts when a lead comes in, a contract gets signed, or an order falls behind.</p>
        </header>
        <div className="work">
          {useCases.map(({ title, artwork, flow, measure, source }) => (
            <article className="spread" key={title}>
              <div className="spread-copy">
                <h2>{title}</h2>
                <div className="spread-notes zapier-notes">
                  <p>{flow}</p>
                  <p><strong className="case-result">What to track.</strong> {measure}</p>
                  <p><a href={source.href}>{source.label}</a></p>
                </div>
              </div>
              <CoverArtwork
                artwork={artwork}
                className="spread-visual cover-art--illustrated cover-art--zapier"
                sizes="(max-width: 420px) calc(74vw - 36px), (max-width: 800px) 60vw, (max-width: 1500px) 36vw, 544px"
              />
            </article>
          ))}
        </div>
        <section className="case-section case-discovery">
          <h2>Have a workflow in mind?</h2>
          <div className="case-prose">
            <p>Bring one task your team repeats every week. We can map what starts it, which apps need to share data, and where someone should step in.</p>
            <BookingLink />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
