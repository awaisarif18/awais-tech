import Link from "next/link";
import { appointmentUrl, sectionLinks, socialLinks } from "../content/profile";
import { LinkPreview } from "./aceternity/link-preview";
import { NoiseBackground } from "./aceternity/noise-background";
import { BrandLogo } from "./brand-logo";

export function BookingLink() {
  return <LinkPreview className="action action--primary" url={appointmentUrl} title="Google Calendar appointment"><NoiseBackground primary />Book a Discovery Call</LinkPreview>;
}

export function Footer() {
  return (
    <footer className="section-shell site-footer">
      <Link className="footer-name" href="/">
        <BrandLogo className="footer-logo" />
        Awais Arif
      </Link>
      <p className="footer-role">Forward Deployed AI Engineer</p>
      <nav className="footer-sections" aria-label="Site sections">
        {sectionLinks.map(({ label, href }) => <Link key={label} href={href}>{label}</Link>)}
      </nav>
      <div className="footer-meta">
        <p>© {new Date().getFullYear()} Awais Arif</p>
        <nav aria-label="Find Awais online">
          {socialLinks.map(({ label, href }) => <LinkPreview key={label} url={href} title={label === "Email" ? "Email Awais" : `Awais on ${label}`}>{label}</LinkPreview>)}
        </nav>
      </div>
    </footer>
  );
}
