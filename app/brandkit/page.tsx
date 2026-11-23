import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Footer } from "../components/site";
import { socialLinks } from "../content/profile";
import { CampaignBuilder } from "./campaign-builder";
import { extraRevisionRate, facebookCrossPostRate, formatPkr, presets, rushPercent } from "./campaign-pricing";
import { channels } from "./channels";
import styles from "./brandkit.module.css";

export const metadata: Metadata = {
  title: "Creator Brand Kit",
  description: "Work with Awais Arif on tech demos, travel films, and photography. Explore past work and campaign formats.",
  alternates: { canonical: "/brandkit" },
};

const samples = channels.flatMap(({ slug, samples }) => samples.map(({ id, format, title }) => ({
  format,
  title,
  href: `/brandkit/${slug}#${id}`,
})));

const packages = [
  {
    name: "Instagram Feature",
    description: "For a product launch, local offer, or hands-on tech demo.",
    rate: presets.instagramPost.rate,
    reelRate: presets.instagramReel.rate,
    deliverables: ["1 photo post or carousel, or 1 Reel up to 60 seconds", "3 Story frames with a link sticker on one frame when available"],
  },
  {
    name: presets.travel.label,
    description: "For stays, destinations, outdoor gear, or camera products.",
    rate: presets.travel.rate,
    deliverables: ["1 Reel from a location shoot", "1 photo carousel and 3 Story frames", "Travel and location costs quoted with the brief"],
  },
  {
    name: presets.youtubeIntegration.label,
    description: "For a brand that fits an upcoming tech tutorial or travel video.",
    rate: presets.youtubeIntegration.rate,
    deliverables: ["1 sponsored segment of 45–90 seconds in a relevant YouTube video", "1 Instagram Reel and 3 Story frames", "Brand link in the YouTube description"],
  },
  {
    name: presets.youtubeDedicated.label,
    description: "For an in-depth product walkthrough, review, or destination film.",
    rate: presets.youtubeDedicated.rate,
    deliverables: ["1 dedicated YouTube video with length agreed in the brief", "1 Instagram Reel cut from the video and 3 Story frames", "Brand link in the YouTube description"],
  },
];

const audience = [
  { value: "68.2%", label: "In Pakistan" },
  { value: "5.4%", label: "In the United States" },
  { value: "83.8%", label: "Aged 18–34" },
  { value: "20,205", label: "Instagram views in 30 days" },
];

const campaignTerms = [
  { title: "Brief and Approval", description: "We agree on the concept, posting account, deliverables, and dates before production. I send the first draft for approval and disclose the sponsorship when I post." },
  { title: "Revisions", description: "Send one consolidated list of edits per round. A round covers edits to the agreed concept. I quote reshoots and concept changes separately." },
  { title: "Timeline and Payment", description: "Your quote confirms the schedule and payment milestones. Production starts once the brief, product, and required assets are ready." },
  { title: "Usage Rights", description: "Starting rates cover production and posting on the agreed creator channels. I quote brand reposting, paid ads, partnership ads, raw footage, and exclusivity separately. The quote specifies where you can use the content and for how long." },
  { title: "Campaign Report", description: "I share available views, reach, interactions, and link taps seven days after the final post. I capture Story metrics from Insights where available." },
];

const email = socialLinks.find(({ label }) => label === "Email")?.href ?? "mailto:m.awaisarif17@gmail.com";
const emailAddress = email.slice("mailto:".length);

function campaignUrl(subject = "Creator partnership with Awais Arif") {
  return `${email}?subject=${encodeURIComponent(subject)}`;
}

const briefUrl = campaignUrl();

export default function BrandKit() {
  return (
    <>
      <main id="main" className={`section-shell ${styles.kit}`}>
        <header className={styles.hero}>
          <div className={styles.intro}>
            <p className={styles.label}>Awais Arif · Creator Brand Kit</p>
            <h1>Tech, Travel, and Photography</h1>
            <p>I&apos;m an AI engineer and creator based in Lahore. I show how tech works through demos and explainers, and tell travel stories through photography and film.</p>
            <div className={styles.actions}>
              <a className="action action--primary" href={briefUrl}>Send a Campaign Brief</a>
              <a className="action" href="#brandkit-work">See the Work</a>
            </div>
          </div>
          <div className={styles.portrait}>
            <Image src="/images/field-portrait.webp" alt="Awais Arif outdoors in the mountains" fill sizes="(max-width: 760px) 90vw, 38vw" />
          </div>
        </header>

        <section className={styles.section} id="brandkit-work" aria-labelledby="brandkit-work-title">
          <h2 id="brandkit-work-title" className="section-title">Selected Work</h2>
          <ul className={styles.samples}>
            {samples.map(({ format, title, href }) => (
              <li key={href}>
                <Link href={href}>
                  <span className={styles.label}>{format}</span>
                  <span className={styles.sampleTitle}>{title}</span>
                  <ArrowUpRight size={21} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="brandkit-audience-title">
          <h2 id="brandkit-audience-title" className="section-title">Channels and Audience</h2>
          <p className={styles.note}>@m.awais_arif · Instagram Insights · 30-day snapshot checked <time dateTime="2026-11-23">23 November 2026</time>.</p>
          <dl className={styles.audience}>
            {audience.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.note}>The United States was the second-largest country audience. Lahore led the city breakdown at 31.0%, followed by Okara (8.3%) and Karachi (5.2%). Instagram reported 85.3% men and 14.7% women. The median across the 10 latest unpinned Reels was 982 views.</p>
          <ul className={styles.accounts}>
            {channels.map(({ slug, label, handle, metric, platform, url }) => (
              <li key={slug}>
                <span className={styles.label}>{label} · {platform}</span>
                <Link href={`/brandkit/${slug}`} className={styles.channelLink}>{handle}</Link>
                <strong>{metric}</strong>
                <a className={styles.packageLink} href={url} aria-label={`Visit ${handle} on ${platform}`}>Visit {platform} <ArrowUpRight size={16} aria-hidden="true" /></a>
              </li>
            ))}
          </ul>
          <p className={styles.note}>Channel counts as of 23 November 2026. Audience demographics for @awais.deploys unlock at 100 followers.</p>
        </section>

        <section className={styles.section} id="brandkit-packages" aria-labelledby="brandkit-packages-title">
          <header className={styles.packagesHeader}>
            <div>
              <h2 id="brandkit-packages-title" className="section-title">Campaign Packages</h2>
              <p className={styles.note}>Starting rates are in PKR for campaigns in Pakistan. International campaigns are quoted in USD.</p>
            </div>
            <a className="action" href="#brandkit-custom">Build a Custom Package <ArrowUpRight size={17} aria-hidden="true" /></a>
          </header>
          <div className={styles.packages}>
            {packages.map(({ name, description, rate, reelRate, deliverables }) => (
              <article key={name}>
                <header>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </header>
                <div className={styles.packagePrice}>
                  <span>From</span> <strong>{formatPkr(rate)}</strong>
                  {reelRate && <small>With a post or carousel · {formatPkr(reelRate)} with a Reel</small>}
                </div>
                <ul>
                  {[...deliverables, "1 revision round per deliverable"].map((deliverable) => (
                    <li key={deliverable}><Check size={16} aria-hidden="true" />{deliverable}</li>
                  ))}
                </ul>
                <a className={styles.packageLink} href={campaignUrl(`Campaign inquiry: ${name}`)} aria-label={`Ask about ${name}`}>
                  Ask About This Package <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
          <dl className={styles.packageAddOns}>
            <div><dt>Extra Revisions</dt><dd>{formatPkr(extraRevisionRate)} per round on one deliverable</dd></div>
            <div><dt>Rush Delivery</dt><dd>+{rushPercent}% of subtotal, subject to availability</dd></div>
            <div><dt>Facebook Cross-Post</dt><dd>{formatPkr(facebookCrossPostRate)} for one eligible campaign post</dd></div>
          </dl>
          <CampaignBuilder email={emailAddress} />
        </section>

        <section className={styles.section} aria-labelledby="brandkit-terms-title">
          <h2 id="brandkit-terms-title" className="section-title">How Campaigns Work</h2>
          <dl className={styles.terms}>
            {campaignTerms.map(({ title, description }) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={`${styles.section} ${styles.contact}`} aria-labelledby="brandkit-contact-title">
          <div>
            <h2 id="brandkit-contact-title" className="section-title">Tell Me About Your Campaign</h2>
            <p>Share your product, audience, formats, timeline, and where you plan to use the content. I&apos;ll reply with a quote for the work.</p>
          </div>
          <div className={styles.contactActions}>
            <a className="action action--primary" href={briefUrl}>Send a Campaign Brief</a>
            <a className={styles.packageLink} href={email}>{emailAddress}</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
