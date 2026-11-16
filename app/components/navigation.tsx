import { BriefcaseBusiness, CalendarDays, CircleHelp, FolderOpen } from "lucide-react";
import { sectionLinks } from "../content/profile";
import { FloatingNav } from "./aceternity/floating-navbar";
import { BrandLogo } from "./brand-logo";

const icons = [BriefcaseBusiness, FolderOpen, CircleHelp, CalendarDays];

export function Navigation() {
  return (
    <FloatingNav
      home={<BrandLogo className="floating-nav-logo" />}
      navItems={sectionLinks.map(({ href, label }, index) => {
        const Icon = icons[index];
        return { link: href, name: label, icon: <Icon size={19} /> };
      })}
    />
  );
}
