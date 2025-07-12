/* eslint-disable @next/next/next-script-for-ga */
import type { Metadata } from "next";
import { Geist} from "next/font/google";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Providers } from './providers';

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  weight: ["400", "500", "600", "700"], 
});


export const metadata: Metadata = {
  metadataBase: new URL('https://www.lotustradersmachinery.com'),
  title: {
    default: "Construction Equipment & Machinery in Assam | Brick Making Machines",
    template: "%s | Construction Equipment Supplier Guwahati"
  },
  description: "Buy construction equipment in Guwahati. Best brick making machines, concrete mixers & construction machinery. Top supplier in Assam. Call: 9435559130",
  keywords: ["construction equipment Assam", "brick making machine price", "concrete mixer Guwahati", "construction machinery dealer", "equipment supplier Northeast"],
  authors: [{ name: "Lotus Traders" }],
  creator: "Lotus Traders",
  publisher: "Lotus Traders",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/title_logo.png',
  },
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
  alternates: {
    canonical: 'https://www.lotustradersmachinery.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="preload" 
          href="/fonts/some-font.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="description" content="Lotus Traders - Your trusted partner in construction equipment. We manufacture and supply high-quality machinery across Northeast India including Assam, Meghalaya, Arunachal Pradesh." />
        <meta name="keywords" content="construction equipment, brick making machine, concrete mixer, trimix system, construction machinery, Assam, Northeast India, Guwahati" />
        <meta name="author" content="Lotus Traders" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Lotus Traders",
            "url": "https://www.lotustradersmachinery.com/",
            "logo": "https://www.lotustradersmachinery.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91 9435559130",
              "contactType": "Customer Service"
            }
          })}
        </script>
        {/* Microsoft Clarity Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "rgsg1mqhrj");
            `
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P3FTHN4T');`
          }}
        />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/logo.png"
          as="image"
          type="image/png"
        />
        
        {/* Defer non-critical scripts */}
        <script
          defer
          src="https://www.googletagmanager.com/gtag/js"
        />
      </head>
      <body className={`${geistSans.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P3FTHN4T"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
