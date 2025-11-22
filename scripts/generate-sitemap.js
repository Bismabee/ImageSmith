const fs = require('fs');
const path = require('path');

// Use SITE_URL env var if provided, otherwise default to production domain
const SITE_URL = process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://www.imagesmith.store';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE_URL}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${SITE_URL}/app</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>\n`;

const outDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('Wrote public/sitemap.xml with SITE_URL =', SITE_URL);
