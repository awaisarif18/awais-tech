import type { Metadata } from "next";
import { Navigation } from "./components/navigation";
import { BackgroundCubesGrid } from "./components/aceternity/background-cubes-grid";
import "@fontsource-variable/zalando-sans-expanded/wght.css";
import "@fontsource-variable/source-sans-3/wght.css";
import "./globals.css";
import "./home.css";
import "./projects.css";
import "./aceternity.css";

export const metadata: Metadata = {
  title: {
    default: "Awais Arif · Forward Deployed AI Engineer",
    template: "%s · Awais Arif",
  },
  description:
    "I turn manual research and review into software your team can check. Explore my work or book a discovery call.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">Skip to Content</a>
        <BackgroundCubesGrid className="site-cubes" cellSize={105} topColor="#14212b" leftColor="#293a46" rightColor="#1c2b36" gap={.052} idleRipples={false} glowColor="#e59268" glow={.7} />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
