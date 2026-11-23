import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "../../components/site";
import { channels } from "../channels";
import styles from "../brandkit.module.css";

type ChannelPageProps = { params: Promise<{ channel: string }> };

export function generateStaticParams() {
  return channels.map(({ slug }) => ({ channel: slug }));
}

export async function generateMetadata({ params }: ChannelPageProps): Promise<Metadata> {
  const { channel: slug } = await params;
  const channel = channels.find((entry) => entry.slug === slug);
  if (!channel) return {};

  return {
    title: `${channel.label} on ${channel.platform}`,
    description: channel.description,
    alternates: { canonical: `/brandkit/${channel.slug}` },
  };
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { channel: slug } = await params;
  const channel = channels.find((entry) => entry.slug === slug);
  if (!channel) notFound();

  return (
    <>
      <main id="main" className={`section-shell ${styles.kit}`}>
        <header className={styles.channelHeader}>
          <Link href="/brandkit" className={styles.packageLink}>Back to Brand Kit</Link>
          <p className={styles.label}>{channel.handle} · {channel.platform}</p>
          <h1 className="section-title">{channel.label}</h1>
          <p>{channel.description}</p>
          <a className="action action--primary" href={channel.url}>Visit {channel.platform} <ArrowUpRight size={17} aria-hidden="true" /></a>
        </header>
        {channel.samples.length > 0 && (
          <section className={styles.section} aria-labelledby="channel-samples-title">
            <h2 className="section-title" id="channel-samples-title">Selected Work</h2>
            <div className={styles.mediaGrid}>
              {channel.samples.map(({ id, format, title, url, embedUrl }) => (
                <article key={id} id={id}>
                  <p className={styles.label}>{format}</p>
                  <h3>{title}</h3>
                  <iframe
                    className={channel.platform === "YouTube" ? styles.videoFrame : styles.instagramFrame}
                    src={embedUrl}
                    title={`${title} on ${channel.platform}`}
                    loading="lazy"
                    allow="encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                  <a className={styles.packageLink} href={url}>Open on {channel.platform} <ArrowUpRight size={16} aria-hidden="true" /></a>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
