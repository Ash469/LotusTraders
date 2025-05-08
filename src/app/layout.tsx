import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lotustradersmachinery.com'),
  title: {
    default: "Lotus Traders - Construction Equipment Manufacturer in Northeast India",
    template: "%s | Lotus Traders"
  },
  description: "Lotus Traders - Your trusted partner in construction equipment. We manufacture and supply high-quality machinery across Northeast India including Assam, Meghalaya, Arunachal Pradesh.",
  keywords: ["construction equipment", "brick making machine", "concrete mixer", "trimix system", "construction machinery", "Assam", "Northeast India", "Guwahati"],
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
    title: "Lotus Traders - Construction Equipment Manufacturer in Northeast India",
    description: "Manufacturing and supplying high-quality construction equipment in Guwahati, Assam and across Northeast India since 1990.",
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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
