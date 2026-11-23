export const deliverables = [
  { id: "posts", label: "Photo Posts or Carousels", unit: "Post or Carousel", rate: 10000, max: 4 },
  { id: "reels", label: "Instagram Reels", unit: "Instagram Reel", rate: 14000, max: 4 },
  { id: "stories", label: "Instagram Story Frames", unit: "Story Frame", rate: 1500, max: 12 },
  { id: "integrations", label: "YouTube Integrations", unit: "YouTube Integration", rate: 10000, max: 2 },
  { id: "videos", label: "Dedicated YouTube Videos", unit: "Dedicated YouTube Video", rate: 24000, max: 2 },
] as const;

type DeliverableId = (typeof deliverables)[number]["id"];
export type DeliverableQuantities = Record<DeliverableId, number>;
export type PresetId = "custom" | "instagramPost" | "instagramReel" | "travel" | "youtubeIntegration" | "youtubeDedicated";

const emptyQuantities: DeliverableQuantities = { posts: 0, reels: 0, stories: 0, integrations: 0, videos: 0 };

export const presets: Record<PresetId, { label: string; rate: number; included: DeliverableQuantities; lead?: DeliverableId }> = {
  custom: { label: "From Scratch", rate: 0, included: emptyQuantities },
  instagramPost: { label: "Instagram Feature · Post", rate: 12000, included: { ...emptyQuantities, posts: 1, stories: 3 }, lead: "posts" },
  instagramReel: { label: "Instagram Feature · Reel", rate: 15000, included: { ...emptyQuantities, reels: 1, stories: 3 }, lead: "reels" },
  travel: { label: "Travel and Photography Feature", rate: 25000, included: { ...emptyQuantities, posts: 1, reels: 1, stories: 3 }, lead: "reels" },
  youtubeIntegration: { label: "YouTube Integration and Instagram", rate: 22000, included: { ...emptyQuantities, reels: 1, stories: 3, integrations: 1 }, lead: "integrations" },
  youtubeDedicated: { label: "Dedicated YouTube Campaign", rate: 35000, included: { ...emptyQuantities, reels: 1, stories: 3, videos: 1 }, lead: "videos" },
};

export const extraRevisionRate = 2500;
export const facebookCrossPostRate = 2500;
export const rushPercent = 25;

const numberFormatter = new Intl.NumberFormat("en-PK");

export function formatPkr(amount: number) {
  return `${amount < 0 ? "−" : ""}PKR ${numberFormatter.format(Math.abs(amount))}`;
}

export function bundleCredit(rate: number) {
  return Math.round(rate * 0.7);
}

export function calculateCampaign(presetId: PresetId, quantities: DeliverableQuantities, extraRevisions: number, crossPost: boolean, rush: boolean) {
  const preset = presets[presetId];
  const scope = deliverables.flatMap(({ id, label, unit }) => {
    const count = quantities[id];
    return count ? [`${count} × ${count === 1 ? unit : label}`] : [];
  });
  const lines: { label: string; amount: number; adjustment?: boolean }[] = [];
  if (!scope.length) return { lines, total: 0, scope };

  if (preset.rate) lines.push({ label: preset.label, amount: preset.rate });
  for (const { id, label, unit, rate } of deliverables) {
    const difference = quantities[id] - preset.included[id];
    if (difference === 0) continue;

    const count = Math.abs(difference);
    const name = count === 1 ? unit : label;
    const prefix = difference < 0 ? "Removed " : preset.rate ? "Extra " : "";
    lines.push({ label: `${prefix}${count} × ${name}`, amount: difference * (difference < 0 ? bundleCredit(rate) : rate), adjustment: preset.rate > 0 });
  }

  if (extraRevisions) {
    lines.push({ label: `${extraRevisions} × Extra Revision ${extraRevisions === 1 ? "Round" : "Rounds"}`, amount: extraRevisionRate * extraRevisions, adjustment: true });
  }
  if (crossPost) lines.push({ label: "Facebook Cross-Post", amount: facebookCrossPostRate, adjustment: true });

  const subtotal = lines.reduce((sum, { amount }) => sum + amount, 0);
  const rushFee = rush ? Math.round(subtotal * rushPercent / 100) : 0;
  if (rushFee) lines.push({ label: "Rush Delivery", amount: rushFee, adjustment: true });
  return { lines, total: subtotal + rushFee, scope };
}
