"use client";

import Script from "next/script";
import { useId, useState, useSyncExternalStore } from "react";
import styles from "./analytics-preferences.module.css";

const storageKey = "awaisarif-analytics-consent";
const consentChanged = "analytics-consent-changed";
type Choice = "allowed" | "declined";
let sessionChoice: Choice | null = null;

const tagManagerBootstrap = `
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
  gtag('consent', 'update', { analytics_storage: 'granted' });
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MDHMCHSD';
  document.head.appendChild(tag);
`;

function subscribe(listener: () => void) {
  function syncTabs(event: StorageEvent) {
    if (event.key === storageKey && event.oldValue === "allowed" && event.newValue !== "allowed") {
      stopAnalytics();
    }
    listener();
  }

  window.addEventListener(consentChanged, listener);
  window.addEventListener("storage", syncTabs);
  return () => {
    window.removeEventListener(consentChanged, listener);
    window.removeEventListener("storage", syncTabs);
  };
}

function readChoice() {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved === "allowed" || saved === "declined" ? saved : null;
  } catch {
    return sessionChoice;
  }
}

function readServerChoice() {
  return undefined;
}

function saveChoice(choice: Choice) {
  sessionChoice = choice;
  try {
    window.localStorage.setItem(storageKey, choice);
  } catch {
    // The choice still applies during this page session if storage is unavailable.
  }
  window.dispatchEvent(new Event(consentChanged));
}

function stopAnalytics() {
  Reflect.set(window, "ga-disable-G-1RP8HQJZEN", true);
  window.location.reload();
}

export function AnalyticsPreferences() {
  const id = useId();
  const choice = useSyncExternalStore(subscribe, readChoice, readServerChoice);
  const [isOpen, setIsOpen] = useState(false);
  const showChoices = choice === null || isOpen;

  function choose(next: Choice) {
    saveChoice(next);
    setIsOpen(false);
    if (choice === "allowed" && next === "declined") stopAnalytics();
  }

  return (
    <>
      {choice === "allowed" && <Script id="portfolio-analytics">{tagManagerBootstrap}</Script>}
      <button type="button" className={styles.settings} aria-expanded={showChoices} aria-controls={id} onClick={() => setIsOpen(!isOpen)}>
        Analytics Preferences
      </button>
      <aside id={id} className={styles.notice} aria-label="Analytics preferences" hidden={!showChoices}>
        <p>With your permission, Google Analytics uses cookies to measure site visits and clicks.</p>
        <div className={styles.actions}>
          <button type="button" className="action" onClick={() => choose("declined")}>Decline Analytics</button>
          <button type="button" className="action" onClick={() => choose("allowed")}>Allow Analytics</button>
        </div>
      </aside>
    </>
  );
}
