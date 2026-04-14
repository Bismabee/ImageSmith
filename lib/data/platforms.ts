export type Platform = {
  slug: string;
  label: string;
  displayName: string;
  description: string;
  maxFileSizeKB: number;
  recommendedDimensions: string;
  recommendedFormat: string;
  supportedFormats: string[];
  compressionTips: string[];
  faqItems: Array<{ q: string; a: string }>;
};

export const PLATFORMS: Platform[] = [
  {
    slug: 'instagram',
    label: 'Instagram',
    displayName: 'Instagram',
    description: "Instagram automatically recompresses uploaded images, so starting with properly optimized files is essential to avoid double-compression artifacts and preserve visual quality in your feed.",
    maxFileSizeKB: 8000,
    recommendedDimensions: '1080×1080 (square), 1080×1350 (portrait), 1080×566 (landscape)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'webp'],
    compressionTips: [
      'Use JPEG quality 80–90 to prevent Instagram re-compression artifacts',
      'Square images (1:1 ratio) maximize feed real estate',
      'Keep file size under 8MB for smooth, fast uploads',
      'Use sRGB color profile for consistent colors across devices',
    ],
    faqItems: [
      {
        q: 'What is the ideal image size for Instagram?',
        a: 'Instagram recommends 1080×1080 pixels for square posts, 1080×1350 for portrait, and 1080×566 for landscape. File size should be under 8MB for best results.',
      },
      {
        q: 'Does Instagram compress my images?',
        a: 'Yes, Instagram recompresses all uploaded images. Pre-optimizing at quality 80–90 with ImageSmith minimizes the artifacts caused by this double compression.',
      },
      {
        q: 'What format is best for Instagram posts?',
        a: 'JPEG is recommended for most Instagram posts. PNG works well for graphics with text. WebP is supported but JPEG is the most reliable for consistent quality across the platform.',
      },
    ],
  },
  {
    slug: 'facebook',
    label: 'Facebook',
    displayName: 'Facebook',
    description: "Facebook recompresses images on upload, and uses aggressive compression for link previews. Pre-optimizing your images ensures they maintain quality after Facebook's processing.",
    maxFileSizeKB: 4000,
    recommendedDimensions: '1200×630 (link previews), 1080×1080 (square posts)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Use sRGB color profile for accurate colors across devices',
      'Keep profile photos at 170×170 and cover photos at 820×312',
      'Link preview images should be 1200×630 for optimal display',
      'Upload PNG for graphics with text to avoid JPEG artifacts',
    ],
    faqItems: [
      {
        q: 'What file size does Facebook recommend for images?',
        a: 'Facebook recommends keeping image files under 4MB. For link preview images, use 1200×630 pixels for optimal display across all device sizes.',
      },
      {
        q: 'Why do my Facebook photos look blurry after upload?',
        a: "Facebook compresses photos automatically. Pre-compressing with ImageSmith at a controlled quality level results in much better final image quality than relying on Facebook's auto-compression.",
      },
    ],
  },
  {
    slug: 'wordpress',
    label: 'WordPress',
    displayName: 'WordPress',
    description: "Optimizing images before uploading to WordPress dramatically improves page load speed, Core Web Vitals scores, and SEO rankings. WordPress 5.8+ natively supports WebP.",
    maxFileSizeKB: 500,
    recommendedDimensions: 'Max 1200px wide — WordPress generates thumbnails automatically',
    recommendedFormat: 'WebP',
    supportedFormats: ['jpeg', 'png', 'webp', 'avif'],
    compressionTips: [
      'Target under 200KB per image for optimal page speed scores',
      'Use WebP format — WordPress 5.8+ supports it natively',
      'Regenerate thumbnails after bulk uploading pre-optimized images',
      'Install a lazy-loading plugin to defer off-screen image loading',
    ],
    faqItems: [
      {
        q: 'How do I compress images for WordPress?',
        a: 'Download your images, compress them with ImageSmith targeting under 200KB per image, then upload to WordPress. Use WebP format for maximum compression with best quality.',
      },
      {
        q: 'What is the best image format for WordPress?',
        a: 'WebP is the best format for WordPress 5.8 and later. It offers 25–35% smaller file sizes than JPEG with comparable quality. JPEG remains the best choice for older WordPress installations.',
      },
      {
        q: 'How do compressed images improve WordPress SEO?',
        a: "Smaller images load faster, directly improving Google's Core Web Vitals (LCP, FID, CLS) scores. Google uses page speed as a ranking factor, so optimized images directly boost SEO.",
      },
    ],
  },
  {
    slug: 'shopify',
    label: 'Shopify',
    displayName: 'Shopify',
    description: "Fast-loading product images are critical for Shopify store conversions. Optimized images reduce bounce rate, improve page speed scores, and create a better shopping experience.",
    maxFileSizeKB: 4000,
    recommendedDimensions: '2048×2048 maximum (Shopify auto-scales for display)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'webp', 'gif'],
    compressionTips: [
      'Shopify automatically serves WebP to browsers that support it if you upload JPEG/PNG',
      'Use square product images (1:1 ratio) for consistent grid display',
      'Target under 1MB per product image for fast store loading',
      'Compress all product variants — they are all loaded on product pages',
    ],
    faqItems: [
      {
        q: 'What image size does Shopify recommend?',
        a: 'Shopify recommends 2048×2048 pixels for product images. Keep files under 4MB — Shopify auto-scales images and serves WebP to supported browsers.',
      },
      {
        q: 'Do large product images slow down my Shopify store?',
        a: 'Yes. Large uncompressed product images are one of the most common causes of slow Shopify stores. Compressing images with ImageSmith before upload typically cuts page load times by 30–60%.',
      },
    ],
  },
  {
    slug: 'email',
    label: 'Email',
    displayName: 'Email',
    description: "Email images must be small and universally compatible. Large images trigger spam filters, slow rendering in email clients, and create poor experiences on slow mobile connections.",
    maxFileSizeKB: 200,
    recommendedDimensions: '600px wide maximum for email body images',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'Keep individual email images under 100KB to avoid spam filters',
      'Total email HTML size (including images) should be under 1MB',
      'Avoid WebP — Outlook and many email clients do not support it',
      'Use a CDN to host email images rather than embedding them',
    ],
    faqItems: [
      {
        q: 'Why must email images be compressed?',
        a: 'Large images slow email load times, increase spam filter scores, and look broken on slow mobile connections. Keep email images under 100KB each for best deliverability.',
      },
      {
        q: 'What image format should I use for email newsletters?',
        a: 'Use JPEG for photographs and PNG for graphics in email. Avoid WebP since Outlook and many corporate email clients do not render it. GIF works for simple animations.',
      },
    ],
  },
  {
    slug: 'web',
    label: 'Web',
    displayName: 'websites',
    description: "Web image optimization is one of the highest-impact improvements for site speed, Google Core Web Vitals scores, and organic SEO rankings.",
    maxFileSizeKB: 200,
    recommendedDimensions: 'Match display dimensions — use responsive images with srcset',
    recommendedFormat: 'WebP',
    supportedFormats: ['jpeg', 'png', 'webp', 'avif'],
    compressionTips: [
      'Target under 200KB for hero/banner images, under 100KB for thumbnails',
      'Use WebP or AVIF for the best compression-to-quality ratio',
      'Implement lazy loading: add loading="lazy" to non-critical images',
      'Use Next.js Image component or similar for automatic optimization',
    ],
    faqItems: [
      {
        q: 'How do compressed images improve website SEO?',
        a: "Smaller images reduce page load time, directly improving Google's Core Web Vitals (LCP, FID, CLS). Faster-loading pages rank higher in search results and have lower bounce rates.",
      },
      {
        q: 'What is the recommended image size for websites?',
        a: 'Target under 200KB for hero images and under 100KB for thumbnails. Use WebP format for modern browsers. Always size images to match their display dimensions rather than relying on CSS scaling.',
      },
    ],
  },
  {
    slug: 'twitter',
    label: 'Twitter',
    displayName: 'Twitter / X',
    description: "Twitter / X displays images in a compressed format. Uploading pre-optimized images ensures the best possible quality in your timeline, profile, and shared links.",
    maxFileSizeKB: 5000,
    recommendedDimensions: '1200×675 (landscape), 1080×1080 (square), 1200×1200 (profile)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'webp', 'gif'],
    compressionTips: [
      'Twitter supports up to 4 images per tweet',
      'GIFs must be under 15MB and 150 frames for Twitter',
      'Profile photos display at 400×400px but accept larger uploads',
      'Use 1200×675 for optimal landscape tweet card display',
    ],
    faqItems: [
      {
        q: 'What is the maximum image size for Twitter / X?',
        a: 'Twitter accepts photos up to 5MB and GIFs up to 15MB. Use 1200×675 pixels for landscape tweet images to fill the full card preview.',
      },
      {
        q: 'What image format does Twitter recommend?',
        a: 'JPEG is recommended for photographs. PNG works well for graphics and screenshots. Twitter also supports WebP and GIF. The 5MB file size limit applies to all formats.',
      },
    ],
  },
  {
    slug: 'linkedin',
    label: 'LinkedIn',
    displayName: 'LinkedIn',
    description: "LinkedIn is a professional network where image quality matters for brand perception. Properly sized and optimized images load faster and create stronger first impressions.",
    maxFileSizeKB: 8000,
    recommendedDimensions: '1200×627 (posts), 1128×191 (company banner), 400×400 (profile)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'LinkedIn feed images display at 552×414 pixels on desktop',
      'Use 1200×627 pixels for link preview images',
      'Keep article cover images under 4MB for fast loading',
      'PNG provides better quality for graphics and presentation screenshots',
    ],
    faqItems: [
      {
        q: 'What size should LinkedIn post images be?',
        a: 'LinkedIn recommends 1200×627 pixels for post images and 1128×191 for company page banners. Profile pictures should be 400×400 pixels. Keep files under 8MB.',
      },
    ],
  },
  {
    slug: 'pinterest',
    label: 'Pinterest',
    displayName: 'Pinterest',
    description: "Pinterest is a visual discovery platform where tall, high-quality images drive the most saves and clicks. Properly formatted pins increase reach and referral traffic significantly.",
    maxFileSizeKB: 20000,
    recommendedDimensions: '1000×1500 (2:3 ratio preferred), 1000×2100 maximum',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'webp'],
    compressionTips: [
      'Vertical images (2:3 ratio) perform 60% better on Pinterest feeds',
      'High-contrast images with bold text overlays get more saves',
      'PNG for text-heavy graphics, JPEG for photographs',
      'Avoid images with very light backgrounds — they blend into the feed',
    ],
    faqItems: [
      {
        q: 'What is the ideal Pinterest image ratio?',
        a: 'Pinterest recommends a 2:3 ratio (1000×1500 pixels). Tall vertical images take up more screen real estate and consistently get more engagement and clicks than square or landscape images.',
      },
      {
        q: 'How large should Pinterest pin images be?',
        a: 'Use 1000×1500 pixels as your standard Pinterest image size. The maximum supported height is 1000×2100. Keep file sizes under 20MB, though under 2MB is ideal for fast loading.',
      },
    ],
  },
  {
    slug: 'whatsapp',
    label: 'WhatsApp',
    displayName: 'WhatsApp',
    description: "WhatsApp automatically compresses images before delivery. Pre-compressing your images with controlled settings prevents the quality degradation caused by this automatic double compression.",
    maxFileSizeKB: 16000,
    recommendedDimensions: '1280×720 maximum for photos sent as images',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'WhatsApp auto-compresses images — pre-compress to avoid double compression',
      'Send images as "Documents" to bypass WhatsApp compression',
      'Keep images under 5MB for instant delivery without waiting',
      'Use JPEG quality 80–85 for optimal WhatsApp image quality',
    ],
    faqItems: [
      {
        q: 'Why does WhatsApp reduce image quality?',
        a: "WhatsApp automatically compresses images to reduce data usage. Pre-compressing with ImageSmith at quality 80–85 gives you control over quality before WhatsApp's additional compression.",
      },
      {
        q: 'How can I send full-quality images on WhatsApp?',
        a: 'Send your image as a "Document" instead of a photo in WhatsApp — this bypasses compression. Alternatively, compress your images with ImageSmith targeting 1–2MB before sending.',
      },
    ],
  },
  {
    slug: 'youtube',
    label: 'YouTube',
    displayName: 'YouTube',
    description: "YouTube thumbnails are the single most impactful factor in video click-through rate. Compressed, well-sized thumbnails load quickly and display crisply across all devices.",
    maxFileSizeKB: 2048,
    recommendedDimensions: '1280×720 (thumbnails), 2560×1440 (channel art)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif', 'bmp'],
    compressionTips: [
      'Custom thumbnails must be under 2MB file size',
      'Use 1280×720 pixels — displayed at various sizes across devices',
      'High contrast with bold, readable text increases click-through rate',
      'Bright, saturated colors stand out in recommendation feeds',
    ],
    faqItems: [
      {
        q: 'What is the YouTube thumbnail file size limit?',
        a: 'YouTube thumbnails must be under 2MB. Use 1280×720 pixels in JPEG or PNG format. High-contrast thumbnails with readable text consistently achieve higher click-through rates.',
      },
      {
        q: 'What image size should YouTube channel art be?',
        a: 'YouTube channel art should be 2560×1440 pixels. The safe area that displays on all devices is the center 1546×423 pixels. Keep the total file under 6MB.',
      },
    ],
  },
  {
    slug: 'tiktok',
    label: 'TikTok',
    displayName: 'TikTok',
    description: "TikTok's slideshow feature supports up to 35 images per post. Properly optimized vertical images fill the full screen and create an immersive, high-quality viewing experience.",
    maxFileSizeKB: 25000,
    recommendedDimensions: '1080×1920 (9:16 vertical full-screen), 1080×1080 (square)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'webp'],
    compressionTips: [
      'TikTok slideshows support up to 35 images per post',
      'Vertical 9:16 format fills the full screen for maximum impact',
      'Keep each image under 10MB for smooth, fast uploads',
      'Use high-contrast, visually striking images to stop the scroll',
    ],
    faqItems: [
      {
        q: 'What image format does TikTok use?',
        a: 'TikTok supports JPEG, PNG, and WebP. For slideshows, use 1080×1920 vertical images. Each image can be up to 25MB, but keeping files under 5MB improves upload speed.',
      },
      {
        q: 'What is the best aspect ratio for TikTok photo posts?',
        a: 'The 9:16 vertical ratio (1080×1920 pixels) is ideal for TikTok as it fills the entire phone screen. Square (1:1) images also work but leave black bars at the top and bottom.',
      },
    ],
  },
  // NEW PLATFORMS
  {
    slug: 'snapchat',
    label: 'Snapchat',
    displayName: 'Snapchat',
    description: "Snapchat is designed for vertical, full-screen mobile content. Snaps and Stories display at 1080×1920 and should be optimized for quick loading on mobile networks.",
    maxFileSizeKB: 5120,
    recommendedDimensions: '1080×1920 (9:16 vertical, full screen)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Vertical 9:16 format fills the entire Snapchat screen',
      'Keep Snaps under 5MB for instant delivery',
      'Use bold, high-contrast visuals visible at small phone screen sizes',
      'Snapchat overlays text and filters on top — avoid important content at screen edges',
    ],
    faqItems: [
      {
        q: 'What is the correct image size for Snapchat?',
        a: 'Snapchat images should be 1080×1920 pixels in 9:16 vertical format. Keep files under 5MB. JPEG is recommended for photographs, PNG for graphics with text.',
      },
    ],
  },
  {
    slug: 'reddit',
    label: 'Reddit',
    displayName: 'Reddit',
    description: "Reddit image posts display in feed thumbnails and full-size previews. Optimized images load faster and look sharper across Reddit's desktop site, mobile app, and old.reddit.",
    maxFileSizeKB: 20000,
    recommendedDimensions: '1200×628 (link previews), 1080×1080 (image posts)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'Reddit thumbnails display at 140×140 — ensure key content is centered',
      'Use 1200×628 for link preview images',
      'PNG for screenshots and graphics, JPEG for photographs',
      'Reddit GIFs auto-convert to MP4 for better performance',
    ],
    faqItems: [
      {
        q: 'What is the maximum image size for Reddit?',
        a: 'Reddit supports image uploads up to 20MB. For best performance, keep image posts under 5MB. Use 1200×628 pixels for link share images to fill the preview card.',
      },
    ],
  },
  {
    slug: 'discord',
    label: 'Discord',
    displayName: 'Discord',
    description: "Discord displays images inline in chat channels and DMs. Optimized images load faster in channels, look sharp in server media galleries, and reduce bandwidth for members.",
    maxFileSizeKB: 8192,
    recommendedDimensions: '1280×720 for shared images, 512×512 for server icons',
    recommendedFormat: 'PNG',
    supportedFormats: ['jpeg', 'png', 'gif', 'webp'],
    compressionTips: [
      'Discord free accounts have 8MB upload limit per file',
      'Server icons must be square — use 512×512 PNG with transparency',
      'Discord Nitro raises the file limit to 500MB',
      'Use PNG for server icons and emojis to preserve transparency',
    ],
    faqItems: [
      {
        q: 'What is the Discord image upload limit?',
        a: 'Discord free accounts can upload files up to 8MB. Discord Nitro raises this to 500MB. Server icons should be 512×512 PNG with a transparent background.',
      },
    ],
  },
  {
    slug: 'slack',
    label: 'Slack',
    displayName: 'Slack',
    description: "Slack displays images inline in messages and generates previews for shared links. Smaller images load faster in busy channels and improve performance for remote teams.",
    maxFileSizeKB: 1000000,
    recommendedDimensions: '800×600 or smaller for inline chat images',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif', 'webp'],
    compressionTips: [
      'Slack generates automatic thumbnails — keep shared images under 1MB',
      'PNG for screenshots and diagrams, JPEG for photographs',
      'GIFs animate automatically in Slack — keep under 10MB for smooth playback',
      'Avoid oversized images in channel history — they slow channel loading',
    ],
    faqItems: [
      {
        q: 'What is the Slack file size limit for images?',
        a: 'Slack supports files up to 1GB on paid plans. However, for smooth inline image loading in channels, keep images under 1MB. Very large images require a click to preview.',
      },
    ],
  },
  {
    slug: 'telegram',
    label: 'Telegram',
    displayName: 'Telegram',
    description: "Telegram compresses photos by default but allows sending images as files to preserve quality. Pre-optimizing your images gives you full control over final quality.",
    maxFileSizeKB: 10000,
    recommendedDimensions: '1280×720 or smaller for instant photo delivery',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'webp'],
    compressionTips: [
      'Send images as "File" to bypass Telegram compression and preserve quality',
      'Photos sent as images are compressed to max 1280px on the longer side',
      'Use WebP for stickers — Telegram supports WebP with transparency natively',
      'Keep photos under 10MB for smooth, instant delivery',
    ],
    faqItems: [
      {
        q: 'Does Telegram compress images automatically?',
        a: 'Yes. Telegram automatically compresses any image sent as a "photo" — often reducing quality significantly. To bypass this, either send as a "File" or use ImageSmith to pre-compress the image to exactly the right size before sending.',
      },
      {
        q: 'What is the best image size for Telegram?',
        a: 'Telegram recommends images under 1280px on the longest side and under 1,280KB total for photos. For files sent as documents, there is a 2GB limit. ImageSmith pre-sets these targets for you automatically.',
      },
      {
        q: 'How do I send high-quality photos on Telegram without them getting blurry?',
        a: "Two options: (1) Send the image as a \"File\" in Telegram instead of a \"Photo\" — this skips Telegram's compression entirely. (2) Use ImageSmith to compress the image to under 1,280KB before sending as a photo — ImageSmith's compression is much gentler than Telegram's.",
      },
      {
        q: 'What image format is best for Telegram?',
        a: 'JPEG is the recommended format for photos shared on Telegram — it offers the best quality-to-size ratio. PNG works well for screenshots or graphics with text where you need pixel-perfect clarity. ImageSmith will auto-compress to the right format for Telegram.',
      },
    ],
  },
  {
    slug: 'medium',
    label: 'Medium',
    displayName: 'Medium',
    description: "Medium's editor displays images at up to 1400px wide. Properly optimized feature images make articles look professional and load quickly for readers on all devices.",
    maxFileSizeKB: 25000,
    recommendedDimensions: '1400×933 for article feature images',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'Feature images display at up to 1400px wide — optimize to this width',
      'Target under 500KB for article images to maintain fast reading speed',
      'PNG for diagrams and screenshots, JPEG for photographs',
      'Medium applies light additional compression on upload',
    ],
    faqItems: [
      {
        q: 'What image size does Medium recommend for articles?',
        a: 'Medium displays feature images at up to 1400px wide. Use 1400×933 pixels (3:2 ratio) and compress to under 500KB for fast loading. PNG is best for diagrams and code screenshots.',
      },
    ],
  },
  {
    slug: 'substack',
    label: 'Substack',
    displayName: 'Substack',
    description: "Substack newsletter images are embedded in email and displayed on web. Images must be optimized for both email clients and web browsers, with email-safe formats prioritized.",
    maxFileSizeKB: 10000,
    recommendedDimensions: '1200×675 for newsletter cover images',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'Email subscribers see compressed images — pre-optimize for email quality',
      'Keep email-embedded images under 200KB for reliable delivery',
      'Use JPEG for photographs — Substack email clients do not support WebP',
      'Cover images display at 1200×675 in web and email previews',
    ],
    faqItems: [
      {
        q: 'What image format works best for Substack newsletters?',
        a: 'JPEG is the most reliable format for Substack newsletters as it renders correctly in all email clients including Outlook. Keep images under 200KB each for fast email loading.',
      },
    ],
  },
  {
    slug: 'ghost',
    label: 'Ghost',
    displayName: 'Ghost',
    description: "Ghost is a professional publishing platform focused on performance. Optimized images are critical for Ghost sites to achieve excellent Core Web Vitals scores and SEO rankings.",
    maxFileSizeKB: 2000,
    recommendedDimensions: '1200×900 for post feature images, 600px wide for inline',
    recommendedFormat: 'WebP',
    supportedFormats: ['jpeg', 'png', 'webp', 'gif'],
    compressionTips: [
      'Ghost natively supports WebP — use it for 25–35% smaller files',
      'Feature images display prominently — use high-quality source files',
      'Target under 200KB for article images and under 100KB for thumbnails',
      'Ghost generates responsive image srcsets automatically from your uploads',
    ],
    faqItems: [
      {
        q: 'What is the best image format for Ghost CMS?',
        a: 'WebP is the recommended format for Ghost as the platform fully supports it and generates responsive variants automatically. Target feature images under 500KB for fast page loads.',
      },
    ],
  },
  {
    slug: 'wix',
    label: 'Wix',
    displayName: 'Wix',
    description: "Wix automatically processes and serves images through its CDN, but uploading pre-optimized images still improves initial load times and ensures the best quality baseline.",
    maxFileSizeKB: 25000,
    recommendedDimensions: '2500px maximum width — Wix resizes automatically',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'webp', 'gif'],
    compressionTips: [
      'Wix serves images via its CDN and applies automatic optimization',
      'Upload at 2× the display size for crisp Retina/HiDPI display',
      'PNG for images with transparency, JPEG for photographs',
      'Wix converts uploads to WebP automatically for modern browsers',
    ],
    faqItems: [
      {
        q: 'How do I optimize images for Wix?',
        a: 'Compress images with ImageSmith before uploading to Wix. Target under 1MB per image and upload at 2× display size for Retina screens. Wix handles additional CDN optimization automatically.',
      },
    ],
  },
  {
    slug: 'squarespace',
    label: 'Squarespace',
    displayName: 'Squarespace',
    description: "Squarespace websites are visually driven — large, beautiful images are central to the design. Properly compressed images maintain visual quality while dramatically improving page load speed.",
    maxFileSizeKB: 20000,
    recommendedDimensions: '2500px max width for full-bleed sections',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'Upload JPEG at quality 80–85 for optimal quality-to-size ratio',
      'Squarespace uses 2500px as the display maximum — match this for full-bleed images',
      'Optimize all gallery images before upload to reduce page weight',
      'PNG for logos with transparent backgrounds',
    ],
    faqItems: [
      {
        q: 'What image size should I use for Squarespace?',
        a: 'Squarespace recommends uploading images at 2500px wide maximum. Use JPEG at quality 80–85 for photographs. Compress all images before uploading to keep your site loading fast.',
      },
    ],
  },
  {
    slug: 'webflow',
    label: 'Webflow',
    displayName: 'Webflow',
    description: "Webflow projects are performance-critical. Unoptimized images are the #1 cause of slow Webflow sites. Pre-compressing images ensures fast load times and high Lighthouse scores.",
    maxFileSizeKB: 4000,
    recommendedDimensions: 'Match CSS display dimensions — use 2× for Retina',
    recommendedFormat: 'WebP',
    supportedFormats: ['jpeg', 'png', 'webp', 'avif', 'svg'],
    compressionTips: [
      'Webflow supports WebP and AVIF natively — use for best performance',
      'Set explicit width/height in Webflow image settings to prevent CLS',
      'Use 2× source images (e.g., 1600px for 800px display) for Retina sharpness',
      'Enable lazy loading on Webflow images for off-screen content',
    ],
    faqItems: [
      {
        q: 'What is the best image format for Webflow?',
        a: 'WebP is the best choice for Webflow as it offers 25–35% smaller files than JPEG with excellent browser support. Webflow also supports AVIF for even greater compression on modern browsers.',
      },
    ],
  },
  {
    slug: 'woocommerce',
    label: 'WooCommerce',
    displayName: 'WooCommerce',
    description: "WooCommerce product images directly impact conversion rates. Optimized images load faster, reduce bounce rate, and improve the overall shopping experience on your WooCommerce store.",
    maxFileSizeKB: 2000,
    recommendedDimensions: '800×800 or 1000×1000 for product images',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'webp'],
    compressionTips: [
      'WooCommerce generates thumbnails automatically from your uploads',
      'Use square product images for a consistent product grid layout',
      'Target under 500KB per product image for fast WooCommerce page loads',
      'Install Imagify or similar plugin for automatic WebP conversion',
    ],
    faqItems: [
      {
        q: 'What is the recommended product image size for WooCommerce?',
        a: 'WooCommerce recommends 800×800 to 1000×1000 pixels for product images. Keep files under 500KB each. WooCommerce generates all thumbnail sizes automatically from your uploaded images.',
      },
    ],
  },
  {
    slug: 'etsy',
    label: 'Etsy',
    displayName: 'Etsy',
    description: "Etsy shop listings rely heavily on image quality for buyer engagement. High-quality, properly compressed product images are essential for conversion in Etsy's competitive marketplace.",
    maxFileSizeKB: 1000,
    recommendedDimensions: '2000×2000 maximum, 1:1 square recommended',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Etsy allows up to 10 images per listing — use all slots with varied angles',
      'First image is critical — use square 1:1 ratio for grid consistency',
      'Keep file size under 1MB for fast Etsy marketplace loading',
      'Use 2000×2000 for the primary listing image for zoom quality',
    ],
    faqItems: [
      {
        q: 'What image size does Etsy recommend for listings?',
        a: 'Etsy recommends 2000×2000 pixels square for product listing images. Keep files under 1MB. The first image is the most important — use the best angle and ensure it works as a square thumbnail.',
      },
    ],
  },
  {
    slug: 'ebay',
    label: 'eBay',
    displayName: 'eBay',
    description: "eBay listings with high-quality images consistently sell faster and at higher prices. Optimized images load quickly in search results and provide the detail buyers need to purchase.",
    maxFileSizeKB: 7000,
    recommendedDimensions: '1600px on the longest side for zoom quality',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'eBay requires at least 500×500 pixels — use 1600×1600 for best zoom',
      'Use up to 24 photos per listing — show all product angles',
      'White or neutral background is preferred for product shots',
      'Keep file size under 7MB per image',
    ],
    faqItems: [
      {
        q: 'What image size does eBay recommend for listings?',
        a: 'eBay recommends at least 1600px on the longest side to enable the zoom feature. Keep files under 7MB. Use a clean white background for best presentation in search results.',
      },
    ],
  },
  {
    slug: 'amazon',
    label: 'Amazon',
    displayName: 'Amazon',
    description: "Amazon product images follow strict guidelines that directly impact search ranking and conversion rate. Properly optimized images meet Amazon's requirements while loading fast.",
    maxFileSizeKB: 10000,
    recommendedDimensions: '2000×2000 (1:1), minimum 1000px on shortest side',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif', 'tiff'],
    compressionTips: [
      'Main product image must have pure white background (#FFFFFF)',
      'Product should fill 85–95% of the image frame',
      'Use at least 1000px on the shortest side to enable zoom',
      'Avoid watermarks, borders, or extra text on the main product image',
    ],
    faqItems: [
      {
        q: 'What are the Amazon product image requirements?',
        a: 'Amazon requires main product images to be on a pure white background with the product filling 85–95% of the frame. Minimum 1000px on the shortest side to enable zoom. JPEG format at 2000×2000 pixels is recommended.',
      },
    ],
  },
  {
    slug: 'twitch',
    label: 'Twitch',
    displayName: 'Twitch',
    description: "Twitch stream thumbnails and profile images determine click-through rate in Browse pages. Optimized, high-contrast thumbnails with readable text consistently attract more viewers.",
    maxFileSizeKB: 10000,
    recommendedDimensions: '1920×1080 (stream previews), 256×256 (profile icon)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Stream preview thumbnails must be under 10MB in JPEG or PNG',
      'Profile icons display at 256×256 — upload 1:1 square images',
      'Offline banners display at 1920×1080 when stream is offline',
      'Use high-contrast visuals and large text readable at thumbnail size',
    ],
    faqItems: [
      {
        q: 'What image size does Twitch require for stream thumbnails?',
        a: 'Twitch stream preview thumbnails should be 1920×1080 pixels (16:9 ratio). Profile icons display at 256×256. Keep all images under 10MB in JPEG or PNG format.',
      },
    ],
  },
  {
    slug: 'vimeo',
    label: 'Vimeo',
    displayName: 'Vimeo',
    description: "Vimeo is a professional video platform where thumbnail quality reflects the professional standard of your content. High-quality optimized thumbnails improve click-through rates.",
    maxFileSizeKB: 5000,
    recommendedDimensions: '1280×720 minimum, 1920×1080 recommended',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Vimeo displays thumbnails at 16:9 ratio across all layouts',
      'Use 1920×1080 for sharp display at all screen sizes',
      'Keep file size under 5MB for fast Vimeo CDN delivery',
      'High-quality, professional thumbnails reflect your brand standards',
    ],
    faqItems: [
      {
        q: 'What thumbnail size does Vimeo recommend?',
        a: 'Vimeo recommends 1920×1080 pixels (16:9 ratio) for video thumbnails. Minimum accepted size is 1280×720. Keep files under 5MB in JPEG format.',
      },
    ],
  },
  {
    slug: 'flickr',
    label: 'Flickr',
    displayName: 'Flickr',
    description: "Flickr is a photography-first community where image quality and presentation matter greatly. Properly optimized photos maintain maximum visual quality while uploading efficiently.",
    maxFileSizeKB: 204800,
    recommendedDimensions: 'Full resolution — Flickr serves optimized sizes automatically',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'Flickr Pro allows uploads up to 200MB per image in original resolution',
      'Use JPEG quality 90+ for Flickr uploads to preserve photographic detail',
      'Flickr generates multiple display sizes from your upload automatically',
      'Free accounts have 1TB storage — optimize if approaching limits',
    ],
    faqItems: [
      {
        q: 'What is the maximum upload size for Flickr?',
        a: 'Flickr Pro allows photo uploads up to 200MB. Free accounts are limited to 200MB total storage. Use JPEG quality 90+ for photography uploads to maximize visible quality.',
      },
    ],
  },
  {
    slug: 'behance',
    label: 'Behance',
    displayName: 'Behance',
    description: "Behance is Adobe's portfolio platform for creative professionals. High-quality project images are essential for making a strong impression on clients and employers browsing portfolios.",
    maxFileSizeKB: 50000,
    recommendedDimensions: '1400px wide for project modules (Behance scales automatically)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'Behance modules display at 1400px wide maximum — optimize to this width',
      'Use JPEG quality 85–90 for portfolio images to maintain professional quality',
      'Cover images display at 1400×787 (16:9) in search and profile views',
      'PNG for graphics with clean lines, JPEG for photographs and mockups',
    ],
    faqItems: [
      {
        q: 'What image size should I use for Behance projects?',
        a: 'Behance project modules display up to 1400px wide. Use JPEG quality 85–90 for professional quality. Cover images should be 1400×787 pixels (16:9). PNG is best for clean UI and logo work.',
      },
    ],
  },
  {
    slug: 'dribbble',
    label: 'Dribbble',
    displayName: 'Dribbble',
    description: "Dribbble is a design community where visual quality is paramount. Shots must look exceptional at both preview and full sizes to attract followers, clients, and career opportunities.",
    maxFileSizeKB: 10000,
    recommendedDimensions: '1600×1200 (4:3 ratio, the Dribbble shot standard)',
    recommendedFormat: 'PNG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'Dribbble shots display at 1600×1200 — the standard 4:3 ratio',
      'Use PNG for UI work to preserve sharp edges and exact colors',
      'GIFs must be under 40 frames for animated shots',
      'Ensure your design is clearly visible at the 400×300 thumbnail size',
    ],
    faqItems: [
      {
        q: 'What is the standard Dribbble shot size?',
        a: 'Dribbble shots should be 1600×1200 pixels (4:3 ratio). Use PNG for UI/design work to preserve sharp edges. GIF is supported for animations up to 40 frames.',
      },
    ],
  },
  {
    slug: '500px',
    label: '500px',
    displayName: '500px',
    description: "500px is a professional photography community where image quality, detail, and artistic vision determine visibility and sales opportunities in the marketplace.",
    maxFileSizeKB: 60000,
    recommendedDimensions: 'Full resolution — 500px serves optimized sizes automatically',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg'],
    compressionTips: [
      'Upload at full resolution — 500px displays at various sizes for different uses',
      'Use JPEG quality 90+ to maintain photographic detail',
      'HDR and high-detail landscape photos perform best at full resolution',
      '500px generates display-optimized versions for web and mobile viewing',
    ],
    faqItems: [
      {
        q: 'What is the file size limit for 500px uploads?',
        a: '500px allows JPEG uploads up to 60MB. Upload at full resolution with JPEG quality 90+ to preserve all photographic detail. 500px generates optimized display versions automatically.',
      },
    ],
  },
  {
    slug: 'google-business',
    label: 'Google Business',
    displayName: 'Google Business Profile',
    description: "Google Business Profile photos directly impact local search appearance and customer trust. High-quality, properly sized images improve local SEO and attract more customers.",
    maxFileSizeKB: 5120,
    recommendedDimensions: '1200×900 (cover), 250×250 minimum (profile/logo)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Cover photos display at 1200×628 in search results — optimize to this size',
      'Profile/logo images must be square (1:1) with minimum 250×250 pixels',
      'Minimum dimensions: 250×250, maximum: 10,000×10,000 pixels',
      'Keep all photos under 5MB for fast Google CDN processing',
    ],
    faqItems: [
      {
        q: 'What size should Google Business Profile photos be?',
        a: 'Google Business Profile recommends cover photos at 1200×628 pixels and profile/logo images at minimum 250×250 (square). Keep files under 5MB. JPEG for photos, PNG for logos.',
      },
    ],
  },
  {
    slug: 'google-ads',
    label: 'Google Ads',
    displayName: 'Google Ads',
    description: "Google Display Ads require images in multiple specific sizes. Properly optimized ad images load faster across the Google Display Network and maintain quality at all display sizes.",
    maxFileSizeKB: 150,
    recommendedDimensions: '1200×628 (landscape), 1200×1200 (square), 300×250 (rectangle)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'Responsive Display Ads accept up to 15 images in various sizes',
      'Landscape: 1200×628 minimum, Square: 1200×1200 minimum',
      'Logo images must be square with 1:1 ratio at 128×128 minimum',
      'Keep ad images under 150KB for fastest Google Display Network delivery',
    ],
    faqItems: [
      {
        q: 'What image sizes does Google Ads require?',
        a: 'Google Responsive Display Ads need landscape images (1200×628), square images (1200×1200), and logos (128×128). Keep all files under 150KB. JPEG or PNG are the accepted formats.',
      },
    ],
  },
  {
    slug: 'facebook-ads',
    label: 'Facebook Ads',
    displayName: 'Facebook Ads',
    description: "Facebook ad images must meet specific size requirements and file limits for each placement. Optimized images perform better across Facebook, Instagram, Messenger, and Audience Network.",
    maxFileSizeKB: 30000,
    recommendedDimensions: '1200×628 (feed link ads), 1080×1080 (square ads)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Feed ads: 1200×628 (landscape) or 1080×1080 (square)',
      'Stories ads: 1080×1920 for full-screen vertical format',
      'Text overlays must cover less than 20% of the image area',
      'Use high-contrast images that stand out in the news feed',
    ],
    faqItems: [
      {
        q: 'What is the best image size for Facebook ads?',
        a: 'Facebook feed ads should use 1080×1080 (square) or 1200×628 (landscape). Stories ads need 1080×1920. Keep files under 30MB. Minimize text overlay to less than 20% of the image.',
      },
    ],
  },
  {
    slug: 'linkedin-ads',
    label: 'LinkedIn Ads',
    displayName: 'LinkedIn Ads',
    description: "LinkedIn ad images target professional audiences with high purchase intent. Well-optimized images maintain the quality standard expected in professional B2B advertising contexts.",
    maxFileSizeKB: 5120,
    recommendedDimensions: '1200×627 (Sponsored Content), 100×100 (Sponsored InMail logos)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Sponsored Content images: 1200×627 pixels, under 5MB',
      'Single image ads: minimum 400×400 pixels',
      'Carousel ad images must be 1080×1080 square',
      'Professional, clean imagery performs best with LinkedIn audiences',
    ],
    faqItems: [
      {
        q: 'What image sizes does LinkedIn Ads require?',
        a: 'LinkedIn Sponsored Content images should be 1200×627 pixels under 5MB. Carousel ads need 1080×1080 (square). Use professional, clean imagery for the best performance with B2B audiences.',
      },
    ],
  },
  {
    slug: 'mailchimp',
    label: 'Mailchimp',
    displayName: 'Mailchimp',
    description: "Mailchimp email campaigns require properly sized, email-safe images. Optimized images improve email deliverability, load faster in all email clients, and increase engagement rates.",
    maxFileSizeKB: 10240,
    recommendedDimensions: '600px wide for email body, 1200×600 for header banners',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif'],
    compressionTips: [
      'Email content area is 600px wide — design at 600px or 1200px (2× Retina)',
      'Keep individual images under 200KB for fast email loading',
      'Avoid WebP — Outlook does not support it in emails',
      'Test emails across clients (Gmail, Outlook, Apple Mail) before sending',
    ],
    faqItems: [
      {
        q: 'What image size should I use in Mailchimp?',
        a: 'Mailchimp email templates are typically 600px wide. Use 600px or 1200px (for Retina) wide images. Keep each image under 200KB for fast loading. Stick to JPEG and PNG — avoid WebP.',
      },
    ],
  },
  {
    slug: 'canva',
    label: 'Canva',
    displayName: 'Canva',
    description: "Canva lets you upload and use custom images in your designs. Pre-optimized images upload faster, use less storage, and produce cleaner results in Canva's design canvas.",
    maxFileSizeKB: 102400,
    recommendedDimensions: 'Depends on template — upload at 2× template size for Retina',
    recommendedFormat: 'PNG',
    supportedFormats: ['jpeg', 'png', 'webp', 'gif', 'svg'],
    compressionTips: [
      'Canva accepts files up to 100MB — compress large source files before uploading',
      'PNG for images with transparency used in designs',
      'JPEG for photographic background images',
      'Upload at 2× the template dimensions for crisp Retina output',
    ],
    faqItems: [
      {
        q: 'What image formats can I upload to Canva?',
        a: 'Canva accepts JPEG, PNG, WebP, GIF, and SVG up to 100MB. For best design quality, use PNG for images with transparency and JPEG for photographs. Upload at 2× your design dimensions for Retina output.',
      },
    ],
  },
  {
    slug: 'figma',
    label: 'Figma',
    displayName: 'Figma',
    description: "Figma design files can include raster images as fills or assets. Optimized images keep Figma files fast to load and collaborate on, and export at the exact quality needed.",
    maxFileSizeKB: 4096,
    recommendedDimensions: 'Match frame dimensions — upload at 2× for Retina design work',
    recommendedFormat: 'PNG',
    supportedFormats: ['jpeg', 'png', 'webp', 'gif', 'svg'],
    compressionTips: [
      'Compress large background images before importing into Figma',
      'PNG preserves transparency for UI mockup assets and icons',
      'JPEG for photographic mockup content and hero image assets',
      'Keep imported images under 4MB to maintain Figma file performance',
    ],
    faqItems: [
      {
        q: 'What image format is best for Figma?',
        a: 'PNG is recommended for most Figma assets as it preserves transparency and sharp edges. JPEG works for photographic fills. Keep images under 4MB to maintain file performance during collaboration.',
      },
    ],
  },
  {
    slug: 'notion',
    label: 'Notion',
    displayName: 'Notion',
    description: "Notion pages with large images slow down loading and create a poor reading experience. Properly compressed images keep your Notion workspace fast and professional.",
    maxFileSizeKB: 5120,
    recommendedDimensions: '1500px wide for full-width page images',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'gif', 'webp'],
    compressionTips: [
      'Notion pages render at approximately 900px wide — optimize to this width',
      'Keep images under 2MB for fast Notion page loading',
      'Inline images should be under 500KB each',
      'Avoid very large cover images — they slow initial page render',
    ],
    faqItems: [
      {
        q: 'What image size works best in Notion?',
        a: 'Notion page content renders at approximately 900px wide. Optimize images to 900–1800px (2× Retina) and keep files under 2MB for the fastest loading. Use JPEG for photos, PNG for screenshots.',
      },
    ],
  },
  {
    slug: 'iphone-wallpaper',
    label: 'iPhone Wallpaper',
    displayName: 'iPhone',
    description: "iPhone wallpapers need to be optimized for the high-resolution Retina display while keeping file sizes manageable. The perfect iPhone wallpaper is crisp, fast to set, and battery-efficient.",
    maxFileSizeKB: 10000,
    recommendedDimensions: '1290×2796 (iPhone 15 Pro Max), 1179×2556 (iPhone 15)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'heic'],
    compressionTips: [
      'Use 1179×2556 for iPhone 14/15 or 1290×2796 for iPhone 14/15 Pro Max',
      'JPEG works well for photographs; PNG for graphics with text',
      'Keep wallpapers under 5MB for fast preview and application',
      'Avoid very dark images — they may look different on OLED True Black displays',
    ],
    faqItems: [
      {
        q: 'What resolution should an iPhone wallpaper be?',
        a: 'iPhone 15/14: 1179×2556 pixels. iPhone 15/14 Pro Max: 1290×2796 pixels. iPhone 13/12: 1170×2532 pixels. Use JPEG for photos and PNG for graphics. Keep files under 5MB.',
      },
    ],
  },
  {
    slug: 'android-wallpaper',
    label: 'Android Wallpaper',
    displayName: 'Android',
    description: "Android wallpapers need to accommodate various screen resolutions across different manufacturers. A properly sized and optimized wallpaper looks great on all Android devices.",
    maxFileSizeKB: 10000,
    recommendedDimensions: '1440×3040 (Samsung flagship), 1080×2400 (standard Android)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png', 'webp'],
    compressionTips: [
      'Use 1080×2400 for broad compatibility across Android phones',
      'Samsung flagships use 1440×3040 — upload at this size for best quality',
      'JPEG for photographs, PNG for graphics and illustrations',
      'Android scrolls wallpapers — use extra-wide images for parallax effect',
    ],
    faqItems: [
      {
        q: 'What is the correct Android wallpaper size?',
        a: 'Standard Android: 1080×2400 pixels. Samsung Galaxy flagship: 1440×3040 pixels. For parallax wallpapers, use twice the screen width (e.g., 2160×2400). JPEG works for most wallpapers.',
      },
    ],
  },
  {
    slug: 'desktop-wallpaper',
    label: 'Desktop Wallpaper',
    displayName: 'Desktop',
    description: "Desktop wallpapers display across the full screen of monitors. A properly optimized wallpaper looks stunning on modern 4K monitors while keeping the file size reasonable.",
    maxFileSizeKB: 20000,
    recommendedDimensions: '3840×2160 (4K), 2560×1440 (1440p), 1920×1080 (1080p)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'For 4K monitors, use 3840×2160 pixels for full-resolution display',
      'JPEG at quality 90 is a good balance for large wallpaper files',
      'PNG produces larger files but perfect quality for graphic wallpapers',
      'Consider creating multiple resolutions for different screen sizes',
    ],
    faqItems: [
      {
        q: 'What is the best resolution for a desktop wallpaper?',
        a: 'For 4K displays: 3840×2160 pixels. For 1440p: 2560×1440 pixels. For 1080p: 1920×1080 pixels. Use JPEG at quality 85–90 to balance quality and file size for large wallpaper images.',
      },
    ],
  },
  {
    slug: 'print',
    label: 'Print',
    displayName: 'Print',
    description: "Print-ready images require higher resolution than web images. At 300 DPI, images must be much larger in pixel dimensions to produce sharp, professional-quality physical prints.",
    maxFileSizeKB: 50000,
    recommendedDimensions: 'A4: 3508×4961 (300 DPI), Letter: 3300×2550 (300 DPI)',
    recommendedFormat: 'TIFF',
    supportedFormats: ['tiff', 'jpeg', 'png'],
    compressionTips: [
      'Print requires 300 DPI — an A4 page needs 3508×4961 pixels minimum',
      'TIFF for lossless print-ready files, JPEG quality 95+ for compressed print files',
      'Convert to CMYK color mode for professional commercial printing',
      'Add 3mm bleed (extra image beyond the trim line) for printed materials',
    ],
    faqItems: [
      {
        q: 'What resolution do images need to be for print?',
        a: 'Print requires 300 DPI minimum. For an A4 (8.27×11.69 inch) page, that means 2480×3508 pixels at 300 DPI. For premium quality, use 3508×4961. TIFF is best for print; JPEG at quality 95+ also works.',
      },
    ],
  },
  {
    slug: 'podcast-cover',
    label: 'Podcast Cover',
    displayName: 'Podcast',
    description: "Podcast cover art is displayed at many sizes across Spotify, Apple Podcasts, and podcast apps. A properly compressed cover image uploads quickly and looks sharp at all display sizes.",
    maxFileSizeKB: 3000,
    recommendedDimensions: '3000×3000 (maximum), 1400×1400 (minimum required)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Apple Podcasts requires minimum 1400×1400, maximum 3000×3000 pixels',
      'JPEG is recommended by most podcast platforms for photos',
      'Keep file size under 3MB for fast platform processing',
      'Use sRGB color space — same color appears consistently across players',
    ],
    faqItems: [
      {
        q: 'What are the podcast cover art requirements?',
        a: 'Podcast cover art must be square (1:1 ratio), minimum 1400×1400 pixels, and maximum 3000×3000 pixels. Keep files under 3MB in JPEG or PNG format. Use sRGB color for consistent display across podcast apps.',
      },
    ],
  },
  {
    slug: 'ebook-cover',
    label: 'eBook Cover',
    displayName: 'eBook',
    description: "eBook covers are the primary marketing asset for digital books on Amazon Kindle, Apple Books, and other platforms. A high-quality optimized cover stands out in store search results.",
    maxFileSizeKB: 2048,
    recommendedDimensions: '1600×2560 (Amazon Kindle ideal ratio)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Amazon Kindle recommends 1600×2560 pixels (2:3 portrait ratio)',
      'Minimum height 1000px, ideal height 2500px for best store display',
      'Keep cover JPEG files under 2MB',
      'Text must be readable at thumbnail size (around 100px tall)',
    ],
    faqItems: [
      {
        q: 'What size should an eBook cover be?',
        a: 'Amazon Kindle recommends 1600×2560 pixels (2:3 portrait ratio) for eBook covers. Minimum height is 1000px. Keep JPEG files under 2MB. Ensure title text is readable at small thumbnail sizes.',
      },
    ],
  },
  {
    slug: 'app-store',
    label: 'App Store',
    displayName: 'App Store',
    description: "App Store screenshots and icons are the primary conversion drivers for app downloads. Properly optimized at exact dimensions, they display crisply on all device screen sizes.",
    maxFileSizeKB: 500,
    recommendedDimensions: '1290×2796 (iPhone 15 Pro Max screenshots), 1024×1024 (app icon)',
    recommendedFormat: 'PNG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'App icons must be exactly 1024×1024 PNG without transparency',
      'Screenshot sizes vary by device — submit for each device category',
      'Use PNG for screenshots with UI elements and sharp text',
      'App Preview videos display before screenshots in the gallery',
    ],
    faqItems: [
      {
        q: 'What dimensions are required for App Store screenshots?',
        a: 'App Store requires screenshots at specific sizes: iPhone 15 Pro Max (1290×2796), iPhone 14 (1284×2778), iPad Pro (2048×2732). App icons must be 1024×1024 PNG without transparency.',
      },
    ],
  },
  {
    slug: 'google-play',
    label: 'Google Play',
    displayName: 'Google Play',
    description: "Google Play store listings rely on screenshots, feature graphics, and icons to drive downloads. Optimized assets at the correct dimensions improve listing quality and app visibility.",
    maxFileSizeKB: 8192,
    recommendedDimensions: '1024×500 (feature graphic), 512×512 (icon)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Feature graphic must be exactly 1024×500 pixels — required for listings',
      'App icon must be 512×512 PNG with transparent background',
      'Screenshots can be any size — common: 1080×1920 for phones',
      'Keep feature graphic under 1MB, screenshots under 8MB each',
    ],
    faqItems: [
      {
        q: 'What are the Google Play image requirements?',
        a: 'Google Play requires a feature graphic at exactly 1024×500 pixels and an app icon at 512×512 PNG. Phone screenshots are typically 1080×1920. Keep all assets under 8MB.',
      },
    ],
  },
  {
    slug: 'spotify',
    label: 'Spotify',
    displayName: 'Spotify',
    description: "Spotify displays artist images, album art, and podcast covers across apps, desktop, and web players. Optimized images at correct dimensions look sharp across all Spotify surfaces.",
    maxFileSizeKB: 10000,
    recommendedDimensions: '3000×3000 (album/podcast cover), 2660×1140 (artist header)',
    recommendedFormat: 'JPEG',
    supportedFormats: ['jpeg', 'png'],
    compressionTips: [
      'Album and podcast covers must be square — use 3000×3000 for best quality',
      'Artist header images: 2660×1140 (Spotify for Artists)',
      'Canvas loop videos replace static covers for enhanced artist profiles',
      'Use sRGB color for consistent display across Spotify platforms',
    ],
    faqItems: [
      {
        q: 'What image size does Spotify require for album covers?',
        a: 'Spotify displays album and podcast covers as squares. Upload at 3000×3000 pixels in JPEG format for best quality. Artist header images should be 2660×1140 pixels submitted via Spotify for Artists.',
      },
    ],
  },
];

export const PLATFORM_SLUGS = PLATFORMS.map((p) => p.slug);

export function getPlatform(slug: string): Platform | undefined {
  return PLATFORMS.find((p) => p.slug === slug);
}
