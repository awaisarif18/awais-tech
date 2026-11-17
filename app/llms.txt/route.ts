import { projects } from "../content/projects";
import { homeDescription, role, services, siteName, siteUrl } from "../content/seo";

export const dynamic = "force-static";

export function GET() {
  const content = [
    `# ${siteName}`,
    "",
    `> ${role}. ${homeDescription}`,
    "",
    "## Services",
    "",
    ...services.map(({ id, name, description }) => `- [${name}](${siteUrl}/#${id}): ${description}`),
    "",
    "## Case Studies",
    "",
    ...projects.map(({ slug, title, search }) => `- [${title}](${siteUrl}/projects/${slug}): ${search.description}`),
    "",
  ].join("\n");

  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
