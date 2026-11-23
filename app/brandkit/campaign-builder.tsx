"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  bundleCredit,
  calculateCampaign,
  deliverables,
  extraRevisionRate,
  facebookCrossPostRate,
  formatPkr,
  presets,
  rushPercent,
  type DeliverableQuantities,
  type PresetId,
} from "./campaign-pricing";
import styles from "./brandkit.module.css";

function QuantitySlider({ id, label, detail, min = 0, max, value, onChange }: {
  id: string;
  label: string;
  detail: string;
  min?: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className={styles.quantity}>
      <div className={styles.quantityHeading}>
        <div>
          <label htmlFor={id}>{label}</label>
          <p id={`${id}-detail`}>{detail}</p>
        </div>
        <span aria-hidden="true">{value}</span>
      </div>
      <input id={id} aria-describedby={`${id}-detail`} type="range" min={min} max={max} value={value} onChange={(event) => onChange(event.currentTarget.valueAsNumber)} />
    </div>
  );
}

export function CampaignBuilder({ email }: { email: string }) {
  const [presetId, setPresetId] = useState<PresetId>("instagramReel");
  const [quantities, setQuantities] = useState<DeliverableQuantities>(presets.instagramReel.included);
  const [extraRevisions, setExtraRevisions] = useState(0);
  const [crossPost, setCrossPost] = useState(false);
  const [rush, setRush] = useState(false);

  const preset = presets[presetId];
  const { lines, total, scope } = calculateCampaign(presetId, quantities, extraRevisions, crossPost, rush);
  const estimate = formatPkr(total);
  const body = [
    "Hi Awais, I'd like a quote for this campaign.",
    "",
    "Selected deliverables:",
    ...scope,
    "",
    "Estimate breakdown:",
    ...lines.map(({ label, amount, adjustment }) => `${label} (${adjustment && amount > 0 ? "+" : ""}${formatPkr(amount)})`),
    `Estimated total: ${estimate}`,
    "",
    "Brand and product:",
    "Campaign goals and audience:",
    "Target launch date:",
    "Where the content will be used:",
    "Billing country and currency:",
  ].join("\r\n");
  const requestUrl = `mailto:${email}?subject=${encodeURIComponent("Custom campaign quote")}&body=${encodeURIComponent(body)}`;

  return (
    <section id="brandkit-custom" className={styles.builder} aria-labelledby="brandkit-custom-title">
      <header className={styles.builderHeader}>
        <h3 id="brandkit-custom-title">Build a Custom Package</h3>
        <p>Start with a package or build from scratch. Your estimate updates as you adjust the scope.</p>
      </header>
      <div className={styles.builderGrid}>
        <a className={styles.mobileEstimate} href="#brandkit-estimate">
          <span>Estimated Total</span><strong>{estimate}</strong>
        </a>
        <div className={styles.builderControls}>
          <div className={styles.preset}>
            <label htmlFor="campaign-preset">Starting Package</label>
            <select id="campaign-preset" value={presetId} onChange={(event) => {
              const next = event.currentTarget.value as PresetId;
              setPresetId(next);
              setQuantities(presets[next].included);
            }}>
              {Object.entries(presets).map(([id, option]) => <option key={id} value={id}>{option.label}</option>)}
            </select>
            {preset.rate > 0 && <p>Each package keeps its main deliverable. You can add extras or remove included extras at their bundle value.</p>}
          </div>
          <fieldset>
            <legend>Deliverables</legend>
            {deliverables.map(({ id, label, rate, max }) => {
              const included = preset.included[id];
              const isLead = preset.lead === id;
              const unitRate = `${formatPkr(rate)} ${included ? "per extra" : "each"}`;
              const detail = isLead ? `${included} required · ${unitRate}` : included
                ? `${included} included · ${unitRate} · ${formatPkr(bundleCredit(rate))} credit per removal`
                : unitRate;

              return (
                <QuantitySlider
                  key={id}
                  id={`campaign-${id}`}
                  label={label}
                  detail={detail}
                  min={isLead ? included : 0}
                  max={max}
                  value={quantities[id]}
                  onChange={(value) => setQuantities((current) => ({ ...current, [id]: value }))}
                />
              );
            })}
          </fieldset>
          <fieldset disabled={scope.length === 0}>
            <legend>Add-Ons</legend>
            <QuantitySlider
              id="campaign-revisions"
              label="Extra Revision Rounds"
              detail={`${formatPkr(extraRevisionRate)} per extra round on one deliverable`}
              max={3}
              value={extraRevisions}
              onChange={setExtraRevisions}
            />
            <label className={styles.addOn}>
              <input type="checkbox" checked={rush} onChange={(event) => setRush(event.currentTarget.checked)} />
              <span><strong>Rush Delivery</strong><small>+{rushPercent}% of subtotal, subject to availability</small></span>
            </label>
            <label className={styles.addOn}>
              <input type="checkbox" checked={crossPost} onChange={(event) => setCrossPost(event.currentTarget.checked)} />
              <span><strong>Facebook Cross-Post</strong><small>{formatPkr(facebookCrossPostRate)} for one eligible campaign post</small></span>
            </label>
          </fieldset>
        </div>
        <aside className={styles.estimate} id="brandkit-estimate" aria-labelledby="brandkit-estimate-title" tabIndex={-1}>
          <h4 id="brandkit-estimate-title">Estimated Total</h4>
          <output className={styles.total} aria-live="polite" aria-atomic="true">{estimate}</output>
          {lines.length > 0 ? (
            <dl className={styles.estimateLines}>
              {lines.map(({ label, amount, adjustment }) => (
                <div key={label}><dt>{label}</dt><dd>{adjustment && amount > 0 ? "+" : ""}{formatPkr(amount)}</dd></div>
              ))}
            </dl>
          ) : <p>Choose at least one deliverable to request a quote.</p>}
          <p>Includes one revision round per deliverable. Travel, usage rights, and final delivery dates are confirmed in your quote. International quotes are in USD.</p>
          {total > 0 ? (
            <a className="action action--primary" href={requestUrl}>Email This Estimate <ArrowUpRight size={17} aria-hidden="true" /></a>
          ) : <button className="action" type="button" disabled>Email This Estimate</button>}
          <a className={styles.packageLink} href={`mailto:${email}`}>{email}</a>
        </aside>
      </div>
    </section>
  );
}
