import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';
import './globals.css';
import { AppProvider } from '@/providers/AppProvider';
import { PostHogProvider } from '@/providers/PostHogProvider';
import { PostHogPageView } from '@/components/analytics/PostHogPageView';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Toaster from '@/components/ui/Toaster';
import CelebrationOverlay from '@/components/ui/CelebrationOverlay';

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://www.imagesmith.store'),
  title: {
    default: 'ImageSmith — Compress Images for Telegram, WhatsApp & Discord',
    template: '%s | ImageSmith',
  },
  description:
    'Stop letting apps blur your photos. ImageSmith compresses images for Telegram, WhatsApp & Discord — free, instant, browser-only. No signup, no ads.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  robots: { index: true, follow: true },
  verification: {
    google: '1GCrUsgiYjhFJInbzFe63VQtNrEdZ4KnMUJeeoQFt7o',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PostHogProvider>
          <AppProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
            <CelebrationOverlay />
          </AppProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
        </PostHogProvider>
        <Analytics />

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
