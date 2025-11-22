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

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);} // eslint-disable-line no-inner-declarations
  window.gtag = window.gtag || gtag;
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID, { send_page_view: false });

  _initialized = true;
}

export function pageview(path) {
  if (!_initialized || typeof window === 'undefined' || !window.gtag) return;
  try { window.gtag('event', 'page_view', { page_path: path }); } catch (e) { /* noop */ }
}

export function trackEvent(name, params = {}) {
  if (!_initialized || typeof window === 'undefined' || !window.gtag) return;
  try { window.gtag('event', name, params); } catch (e) { /* noop */ }
}

export default {
  initGA4,
  pageview,
  trackEvent
};
