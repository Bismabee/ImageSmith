// Lightweight GA4 runtime loader and helper for Vite + React
// Put your measurement id in .env as VITE_GA4_ID=G-XXXXXXX
const GA4_ID = import.meta.env.VITE_GA4_ID || '';

let _initialized = false;

export function initGA4() {
  if (!GA4_ID || _initialized || typeof window === 'undefined') return;

  // Inject the gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  // Always ensure dataLayer/gtag function exists so events can be queued
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);} // eslint-disable-line no-inner-declarations
  window.gtag = window.gtag || gtag;
  try { window.gtag('js', new Date()); } catch {}
  try { window.gtag('config', GA4_ID, { send_page_view: false }); } catch {}

  _initialized = true;

  if (import.meta.env.DEV) {
    // helpful debug info during development
    // eslint-disable-next-line no-console
    console.debug('[ga4] initGA4 called, GA4_ID=', GA4_ID);
  }
}

function _withDebugModeIfDev(params = {}) {
  if (import.meta.env.DEV) return { ...params, debug_mode: true };
  return params;
}

function _normalizePath(path = '') {
  if (!path) return '/';
  if (typeof path !== 'string') path = String(path);
  return path.startsWith('/') ? path : `/${path}`;
}

export function pageview(path) {
  if (typeof window === 'undefined') return;
  const p = _normalizePath(path);
  const params = _withDebugModeIfDev({ page_path: p });
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[ga4] pageview', p, params);
  }
  try {
    if (window.gtag) {
      window.gtag('event', 'page_view', params);
      return;
    }
    // If gtag not present yet, push to dataLayer so gtag script (when ready) will pick it up
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(['event', 'page_view', params]);
  } catch (e) {
    // ignore
  }
}

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;
  const p = _withDebugModeIfDev(params);
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[ga4] trackEvent', name, p);
  }
  try {
    if (window.gtag) {
      window.gtag('event', name, p);
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(['event', name, p]);
  } catch (e) {
    // ignore
  }
}

export default {
  initGA4,
  pageview,
  trackEvent
};
