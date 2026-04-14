import { MonitorSmartphone, MessageCircle, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: MonitorSmartphone,
    color: '#ec4899',
    title: 'Works Instantly — No Download',
    body: 'Open the link and your image is ready in seconds. Nothing to install, nothing to sign up for — works on any phone, tablet, or computer.',
  },
  {
    icon: MessageCircle,
    color: '#8b5cf6',
    title: 'Made for Telegram & WhatsApp',
    body: 'Messaging apps shrink your photos and destroy the quality. Compress with ImageSmith first — so what people see is sharp, not blurry.',
  },
  {
    icon: Sparkles,
    color: '#06b6d4',
    title: 'Completely Free, No Catch',
    body: 'Every tool is free with no ads, no signup, and no watermarks. Just open it and go — no account, no subscription, nothing hidden.',
  },
];

export default function LandingFeatures() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto" aria-label="Why ImageSmith">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map(({ icon: Icon, color, title, body }) => (
          <article
            key={title}
            className="flex items-start gap-4 p-6 rounded-2xl"
            style={{
              background: `${color}08`,
              border: `1px solid ${color}15`,
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: `${color}18`, border: `1px solid ${color}30` }}
            >
              <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold mb-1 text-sm">{title}</h3>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
