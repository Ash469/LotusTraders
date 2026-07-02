/* eslint-disable @next/next/next-script-for-ga */
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Providers } from './providers';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lotustradersmachinery.com'),
  title: {
    default: "Lotus Traders - Construction Equipment Supplier",
    template: "%s | Lotus Traders"
  },
  description: "Buy construction equipment in Guwahati. Best brick making machines, concrete mixers & construction machinery. Top supplier in Assam. Call: 9435559130",
  keywords: ["construction equipment Assam", "brick making machine price", "concrete mixer Guwahati", "construction machinery dealer", "equipment supplier Northeast"],
  authors: [{ name: "Lotus Traders" }],
  creator: "Lotus Traders",
  publisher: "Lotus Traders",
  formatDetection: { email: false, address: false, telephone: false },
  icons: { icon: '/title_logo.png' },
  openGraph: {
    title: "Construction Equipment Supplier in Assam | Brick Making Machines",
    description: "Leading construction equipment supplier in Guwahati. Best prices on brick making machines, concrete mixers. Trusted dealer in Assam. Contact: 9435559130",
    url: 'https://www.lotustradersmachinery.com',
    siteName: 'Lotus Traders',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Lotus Traders - Construction Equipment',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lotus Traders - Construction Equipment',
    description: 'Manufacturing and supplying high-quality construction equipment in Northeast India',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: 'https://www.lotustradersmachinery.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Meta */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" />

        {/* SEO */}
        <meta name="description" content={metadata.description ?? ''} />
        <meta name="keywords" content={Array.isArray(metadata.keywords)
      ? metadata.keywords.join(', ')
      : metadata.keywords ?? ''} />
        <meta name="author" content="Lotus Traders" />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/title_logo.png" />

        {/* Preload critical assets */}
        <link rel="preload" href="/logo.png" as="image" />
        <link rel="preload" href="/fonts/some-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Structured Data (Organization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lotus Traders",
              url: "https://www.lotustradersmachinery.com",
              logo: "https://www.lotustradersmachinery.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 9435559130",
                contactType: "Customer Service",
              },
              sameAs: [
                "https://www.youtube.com/@LOTUSTRADERS"
              ],
            }),
          }}
        />

        {/* Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VVB6VMXKHK"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VVB6VMXKHK');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "rgsg1mqhrj");
            `,
          }}
        />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable} antialiased bg-white text-gray-900`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
