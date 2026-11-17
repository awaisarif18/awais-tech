import type { Metadata } from "next";
import { Navigation } from "./components/navigation";
import { DeferredCubes } from "./components/deferred-cubes";
import { homeDescription, homeTitle, siteName, siteUrl } from "./content/seo";
import "@fontsource-variable/zalando-sans-expanded/wght.css";
import "@fontsource-variable/source-sans-3/wght.css";
import "./globals.css";
import "./home.css";
import "./projects.css";
import "./aceternity.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: `%s | ${siteName}`,
  },
  description: homeDescription,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">Skip to Content</a>
        <div className="site-cubes" aria-hidden="true"><DeferredCubes /></div>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
