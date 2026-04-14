export type Comparison = {
  slug: string;
  formatA: string;
  formatB: string;
  title: string;
  h1: string;
  description: string;
  targetKeyword: string;
  verdict: string;
  whenToUseA: string;
  whenToUseB: string;
  keyDifferences: Array<{ aspect: string; a: string; b: string }>;
  faqs: Array<{ q: string; a: string }>;
  sections?: Array<{ heading: string; paragraphs: string[] }>;
  ctaLinks?: Array<{ label: string; href: string }>;
};

export const COMPARISONS: Comparison[] = [
  {
    slug: 'jpeg-vs-png',
    formatA: 'jpeg',
    formatB: 'png',
    title: 'JPEG vs PNG: Which Image Format Should You Use? (2025 Guide) | ImageSmith',
    h1: 'JPEG vs PNG: Which Image Format Should You Use?',
    description:
      'JPEG vs PNG — what\'s the real difference? This guide explains compression, file size, transparency, and exactly when to use each format. Quick answer: JPEG for photos, PNG for logos and graphics.',
    targetKeyword: 'jpeg vs png',
    verdict:
      'Use JPEG for photographs — it keeps files small without visible quality loss, which is critical when sharing on messaging apps like Telegram or WhatsApp. Use PNG for logos, icons, screenshots, and any image that needs a transparent background. When in doubt: if it\'s a photo, pick JPEG. If it\'s a graphic, pick PNG.',
    whenToUseA:
      'Choose JPEG when you\'re working with photographs — anything with millions of colors, gradients, or real-world scenes. If you\'re sharing on Telegram, WhatsApp, Instagram, or via email, JPEG gives you a sharp result at the smallest possible file size. It\'s also the right choice for product photos, real estate images, and any photo that will be compressed by a platform.',
    whenToUseB:
      'Choose PNG when your image has a transparent background, contains sharp text or fine lines, or is a logo, icon, or graphic. PNG preserves every pixel exactly — no artifacts around edges, no color bleeding. If you\'re making UI mockups, app screenshots, stickers, or anything you\'ll overlay onto another image, PNG is the only choice.',
    keyDifferences: [
      { aspect: 'Compression type', a: 'Lossy — removes imperceptible data to shrink files', b: 'Lossless — every pixel is preserved exactly' },
      { aspect: 'File size (photos)', a: '60–90% smaller than uncompressed — typically 500KB–1MB for a smartphone photo', b: '3–5× larger than equivalent JPEG — same photo can be 3–6MB' },
      { aspect: 'File size (logos/graphics)', a: 'Larger — compression artifacts appear on sharp edges and text', b: 'Smaller and cleaner — crisp edges, no artifacts' },
      { aspect: 'Transparency', a: 'Not supported — transparent areas become solid white or black', b: 'Full alpha channel — partial and full transparency both supported' },
      { aspect: 'Quality on re-save', a: 'Degrades slightly each time you edit and re-save', b: 'No quality loss — the 1,000th save is identical to the first' },
      { aspect: 'Messaging apps (Telegram, WhatsApp)', a: 'Recommended — smaller files pass through app compression with less damage', b: 'Not ideal for photos — large files trigger heavy automatic compression' },
      { aspect: 'Browser & device support', a: 'Universal — every browser, device, and email client', b: 'Universal — every browser, device, and email client' },
      { aspect: 'Best use case', a: 'Photos, social media, product images, email, messaging', b: 'Logos, icons, screenshots, UI graphics, transparent overlays' },
    ],
    sections: [
      {
        heading: 'The core difference: lossy vs lossless compression',
        paragraphs: [
          'JPEG (Joint Photographic Experts Group) was designed in 1992 specifically for photographs. It uses lossy compression — it analyzes your image, identifies data that the human eye is unlikely to notice, and removes it permanently. A 6MB photo becomes 600KB with no visible difference at normal viewing distances. The trade-off: every time you edit and re-save a JPEG, it discards a little more data. Edit it ten times, and you\'ll start to see the damage.',
          'PNG (Portable Network Graphics) was designed in 1996 as an open, patent-free alternative to GIF. It uses lossless compression — every single pixel is preserved exactly. You can open, edit, and save a PNG a thousand times and the result is bit-for-bit identical to the original. The trade-off: the files are significantly larger, which matters when sending images via apps or loading them on a page.',
          'Neither format is universally "better" — they solve different problems. JPEG wins on file size for photographs. PNG wins on precision for graphics. The decision usually takes less than five seconds once you know the rule.',
        ],
      },
      {
        heading: 'File size: what the difference looks like in real numbers',
        paragraphs: [
          'A typical smartphone photo (6MB uncompressed TIFF or raw) saved as JPEG at quality 80 becomes approximately 600KB to 900KB — an 85–90% reduction. Saved as PNG, that same photo is 3–5MB — barely smaller than the original.',
          'For most everyday use — Telegram, WhatsApp, Instagram, email — JPEG is the obvious choice. Nobody will notice the difference at quality 75 or above, but the file is up to ten times smaller. Smaller files load faster, survive platform compression with less visible damage, and take up less space on every device along the way.',
          'PNG makes sense for photographs only when you need pixel-perfect accuracy: medical imaging, archival photography, or professional pre-press work where any data loss is unacceptable.',
        ],
      },
      {
        heading: 'Transparency: the one thing JPEG cannot do',
        paragraphs: [
          'PNG supports full alpha-channel transparency. Each pixel in a PNG can be fully opaque, fully transparent, or anywhere in between. This is why every logo, icon, sticker, and watermark you\'ve ever seen with a transparent background is a PNG (or WebP, which also supports transparency).',
          'JPEG has zero transparency support. If you save a logo with a transparent background as JPEG, the transparent areas become solid white — or black — depending on the software. There is no way to preserve transparency in JPEG format, and no workaround.',
          'This is the deciding factor for an entire category of images. Any image that needs to sit on top of another image — a company logo, an app icon, a product watermark — must be PNG or WebP, full stop.',
        ],
      },
      {
        heading: 'Which format is better for Telegram, WhatsApp, and messaging apps?',
        paragraphs: [
          'JPEG is almost always the better choice for photos sent via messaging apps — and the reason is how those apps handle images.',
          'Telegram, WhatsApp, and Discord automatically compress photos before delivering them. They apply their own compression algorithm on top of whatever file you send. If you send a large PNG (4MB), the app compresses it aggressively — often producing a blurry, artifact-filled result that looks nothing like what you sent. If you send a well-compressed JPEG (600KB), the app has far less work to do, and your photo arrives sharp.',
          'The best approach is to compress your image yourself before sending — using a tool like ImageSmith — so you control the quality and the app\'s algorithm does minimal damage. For Telegram, target under 1,280KB for photos. For WhatsApp, target under 1,500KB. ImageSmith pre-sets these targets for you on each platform page.',
        ],
      },
    ],
    ctaLinks: [
      { label: 'Compress JPEG', href: '/compress/jpeg' },
      { label: 'Compress PNG', href: '/compress/png' },
      { label: 'Convert JPEG → PNG', href: '/convert/jpeg/to/png' },
      { label: 'Convert PNG → JPEG', href: '/convert/png/to/jpeg' },
    ],
    faqs: [
      {
        q: 'What is the difference between JPEG and PNG?',
        a: 'JPEG uses lossy compression — it removes imperceptible image data to produce very small files, making it ideal for photographs. PNG uses lossless compression — every pixel is preserved exactly, making it ideal for logos, screenshots, and graphics. PNG also supports transparency; JPEG does not. For photos, choose JPEG. For graphics, choose PNG.',
      },
      {
        q: 'Is JPEG or PNG better for websites?',
        a: 'JPEG is better for photographic content — smaller files mean faster load times. PNG is better for logos, icons, and graphics with sharp edges or transparent backgrounds. For the best of both, use WebP — it offers smaller files than JPEG with transparency support like PNG and is now supported by all modern browsers.',
      },
      {
        q: 'Does PNG have better quality than JPEG?',
        a: 'PNG is lossless, so technically yes — every pixel is preserved. However, at JPEG quality 80 or above, the difference is invisible to the human eye for photographs. PNG files are 3–5× larger than JPEG for photos, so JPEG is the practical choice for photography. For graphics with sharp text or fine lines, PNG quality is clearly superior.',
      },
      {
        q: 'Should I save photos as JPEG or PNG?',
        a: 'Save photos as JPEG. PNG files for photographs are 3–5× larger with no visible quality benefit at normal viewing sizes. Use PNG only when the image contains transparency, sharp text, or is a logo or graphic where pixel accuracy matters.',
      },
      {
        q: 'When should I convert PNG to JPEG?',
        a: 'Convert PNG to JPEG when the image is a photograph (no transparency needed), you need smaller file sizes for sharing or web use, or you\'re sending images via Telegram or email. Never convert logos, icons, or images with transparent backgrounds to JPEG — you\'ll get white or black fill where the transparency was.',
      },
      {
        q: 'Is JPEG or PNG faster to load on a website?',
        a: 'JPEG loads faster for photographs because files are 3–5× smaller than equivalent PNG. For logos and graphics, PNG can sometimes be smaller than JPEG because it handles flat colors and sharp edges more efficiently. WebP is the fastest option for web delivery — 25–35% smaller than JPEG with equal quality.',
      },
      {
        q: 'Does PNG or JPEG have better quality for logos?',
        a: 'PNG is clearly better for logos. JPEG\'s lossy compression introduces "artifacts" — slight color bleeding and blurriness — around sharp edges and text. PNG preserves every pixel cleanly, which is why all professional logo files are distributed as PNG or SVG, never JPEG.',
      },
    ],
  },
  {
    slug: 'webp-vs-jpeg',
    formatA: 'webp',
    formatB: 'jpeg',
    title: 'WebP vs JPEG: The Modern Web Image Format Comparison | ImageSmith',
    h1: 'WebP vs JPEG: Which Is Better for the Web?',
    description: 'Detailed comparison of WebP and JPEG — compression efficiency, quality, browser support, and when to use each format for web optimization.',
    targetKeyword: 'webp vs jpeg',
    verdict: 'WebP outperforms JPEG for web delivery: 25–35% smaller files at equivalent visual quality. Use WebP for all modern web images. Keep JPEG for email and maximum compatibility.',
    whenToUseA: 'All modern web delivery — websites, apps, blogs, e-commerce targeting Chrome/Firefox/Safari users',
    whenToUseB: 'Email newsletters, legacy systems, apps requiring maximum cross-platform compatibility',
    keyDifferences: [
      { aspect: 'File size', a: '25–35% smaller than JPEG', b: 'Baseline — larger than WebP' },
      { aspect: 'Transparency', a: 'Supported (both lossy and lossless)', b: 'Not supported' },
      { aspect: 'Browser support', a: 'All modern browsers (Chrome 32+, Firefox 65+, Safari 14+)', b: 'Universal including legacy' },
      { aspect: 'Email support', a: 'Limited — Outlook does not support WebP', b: 'Universal — all email clients' },
      { aspect: 'Encoding speed', a: 'Slightly slower to encode', b: 'Faster encoding' },
    ],
    faqs: [
      {
        q: 'Should I convert all my JPEG images to WebP?',
        a: 'For web delivery, yes. WebP files are 25–35% smaller than JPEG at equivalent quality. All major browsers now support WebP. Convert your images with ImageSmith for free.',
      },
      {
        q: 'Is WebP supported in all browsers?',
        a: 'WebP is supported in Chrome, Firefox, Safari (14+), Edge, and Opera — covering over 95% of web users. For legacy Safari support (pre-2020), provide a JPEG fallback using the HTML <picture> element.',
      },
      {
        q: 'Does WebP look better than JPEG?',
        a: 'At the same file size, WebP typically looks better than JPEG. At the same visual quality, WebP is significantly smaller. In practical terms, WebP delivers better quality per byte.',
      },
      {
        q: 'Can I use WebP for emails?',
        a: 'No — Outlook (which accounts for 30%+ of business email clients) does not support WebP. For email, use JPEG for photos and PNG for graphics. WebP is only recommended for web and app delivery.',
      },
    ],
  },
  {
    slug: 'webp-vs-png',
    formatA: 'webp',
    formatB: 'png',
    title: 'WebP vs PNG: Should You Convert Your PNGs to WebP? | ImageSmith',
    h1: 'WebP vs PNG: The Best Format for Web Graphics',
    description: 'Compare WebP and PNG for web graphics, logos, and transparent images — file size, quality, transparency support, and practical conversion advice.',
    targetKeyword: 'webp vs png',
    verdict: 'WebP reduces PNG file sizes by 50–70% while maintaining transparency. Convert PNGs to WebP for web delivery. Keep PNG for print files, editing sources, and legacy compatibility.',
    whenToUseA: 'Web graphics, logos, and transparent images targeting modern browsers',
    whenToUseB: 'Print-ready files, editing source files, legacy software compatibility, email graphics',
    keyDifferences: [
      { aspect: 'File size (graphics)', a: '50–70% smaller than PNG', b: 'Baseline — larger than WebP' },
      { aspect: 'Transparency', a: 'Full alpha channel support', b: 'Full alpha channel support' },
      { aspect: 'Compression', a: 'Lossy or lossless (both modes)', b: 'Lossless only' },
      { aspect: 'Browser support', a: 'Modern browsers (95%+ coverage)', b: 'Universal' },
      { aspect: 'Editing software support', a: 'Growing — Photoshop, Figma support WebP', b: 'Universal support everywhere' },
    ],
    faqs: [
      {
        q: 'Does WebP support transparency like PNG?',
        a: 'Yes. WebP supports full alpha channel transparency, just like PNG. This makes WebP an excellent replacement for PNG logos and graphics on modern websites.',
      },
      {
        q: 'Is WebP lossless like PNG?',
        a: 'WebP supports both lossy and lossless compression modes. WebP lossless produces files that are 26% smaller than PNG lossless. WebP lossy produces files 3–5× smaller than PNG at visually equivalent quality.',
      },
      {
        q: 'Can I convert PNG to WebP for free?',
        a: 'Yes. ImageSmith converts PNG to WebP automatically when you compress. Upload your PNG files, and ImageSmith will output smaller WebP files while preserving all transparency.',
      },
    ],
  },
  {
    slug: 'avif-vs-webp',
    formatA: 'avif',
    formatB: 'webp',
    title: 'AVIF vs WebP: Next-Generation Image Format Comparison 2025 | ImageSmith',
    h1: 'AVIF vs WebP: Which Next-Gen Format Wins?',
    description: 'AVIF vs WebP compression efficiency, quality at low bitrates, browser support, and which format to choose for modern web image delivery.',
    targetKeyword: 'avif vs webp',
    verdict: 'AVIF offers 30–50% better compression than WebP but with slightly lower browser coverage. Use AVIF with WebP fallback for the best performance-compatibility balance.',
    whenToUseA: 'Maximum compression priority — streaming platforms, CDN optimization, performance-critical apps',
    whenToUseB: 'Broad browser compatibility with excellent compression — the safe modern choice for most websites',
    keyDifferences: [
      { aspect: 'Compression vs JPEG', a: '50%+ smaller than JPEG', b: '25–35% smaller than JPEG' },
      { aspect: 'Browser support', a: 'Chrome 85+, Firefox 93+, Safari 16+ (~85% coverage)', b: 'Chrome 32+, Firefox 65+, Safari 14+ (~95% coverage)' },
      { aspect: 'Encoding speed', a: 'Slow — encoding can take 10× longer than WebP', b: 'Fast — practical for real-time processing' },
      { aspect: 'HDR support', a: 'Full HDR and wide color gamut support', b: 'Limited HDR support' },
      { aspect: 'Transparency', a: 'Supported', b: 'Supported' },
    ],
    faqs: [
      {
        q: 'Should I use AVIF or WebP for my website in 2025?',
        a: 'For most websites, WebP offers the best balance of compression and browser support. If you need maximum compression and target modern browsers exclusively, AVIF with WebP fallback is ideal. Use the HTML <picture> element to serve AVIF to supported browsers and WebP as a fallback.',
      },
      {
        q: 'Is AVIF supported by all browsers?',
        a: 'AVIF is supported by Chrome 85+, Firefox 93+, and Safari 16+ — covering approximately 85% of web users as of 2025. Internet Explorer does not support AVIF. Always provide a WebP or JPEG fallback.',
      },
      {
        q: 'Does AVIF really look better than WebP?',
        a: 'At very low file sizes (high compression), AVIF maintains significantly better quality than WebP. At moderate compression levels for typical web images, the difference is less noticeable. AVIF particularly excels for high-contrast and photographic content.',
      },
    ],
  },
  {
    slug: 'jpeg-vs-webp',
    formatA: 'jpeg',
    formatB: 'webp',
    title: 'JPEG vs WebP Compression: Complete 2025 Guide | ImageSmith',
    h1: 'JPEG vs WebP: A Complete Compression Guide',
    description: 'Side-by-side comparison of JPEG vs WebP file sizes, quality, use cases, and compression performance to help you choose the best format.',
    targetKeyword: 'jpeg vs webp compression',
    verdict: 'WebP outperforms JPEG for web delivery in every metric. Switch to WebP for 25–35% size savings. Keep JPEG for email and maximum platform compatibility.',
    whenToUseA: 'Email campaigns, legacy platforms, apps requiring universal image support',
    whenToUseB: 'Modern web delivery, CMS media libraries, e-commerce storefronts, blog content',
    keyDifferences: [
      { aspect: 'Web file size', a: 'Larger — baseline format', b: '25–35% smaller at same quality' },
      { aspect: 'Transparency', a: 'Not supported', b: 'Full alpha support' },
      { aspect: 'Browser support', a: '100% — universal', b: '95%+ modern browsers' },
      { aspect: 'Email clients', a: 'All email clients', b: 'Not supported by Outlook' },
      { aspect: 'CMS support', a: 'Universal', b: 'WordPress 5.8+, modern CMSes' },
    ],
    faqs: [
      {
        q: 'Is JPEG still relevant in 2025?',
        a: 'JPEG remains relevant for email, print, and legacy system compatibility. For modern web delivery, WebP is the better choice — smaller files with equal or better quality. AVIF is emerging as the next step beyond WebP.',
      },
      {
        q: 'How much smaller are WebP files compared to JPEG?',
        a: 'WebP files are typically 25–35% smaller than JPEG at equivalent visual quality. For some images, especially those with large areas of similar color, savings can reach 40–50%.',
      },
    ],
  },
];

export const COMPARISON_SLUGS = COMPARISONS.map((c) => c.slug);

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
