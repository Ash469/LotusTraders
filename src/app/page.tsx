"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Hero from '@/components/Hero';
import Categories from '@/components/landing_categories';
import Products from '@/components/landing_products';
import DealsOfTheDay from '@/components/DoD';
import Founder from '@/components/founder';
import Testimonials from '@/components/testimonial';
import Footer from '@/components/footer';
import ContactPopup from '@/components/ContactPopup';
import Script from 'next/script';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show the popup after 5-6 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5500); // 5.5 seconds

    // Cleanup the timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  // JSON-LD structured data for homepage
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lotus Traders",
    "url": "https://www.lotustradersmachinery.com",
    "logo": "https://www.lotustradersmachinery.com/logo.png",
    "description": "Manufacturer and supplier of construction equipment in Northeast India",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919435559130",
      "contactType": "sales"
    },
    "sameAs": [
      "https://www.youtube.com/@LOTUSTRADERS"
    ]
  };

  return (
    <>
      <Head>
        <title>Lotus Traders - Construction Equipment Manufacturer in Northeast India</title>
        <meta name="description" content="Lotus Traders - Your trusted partner in construction equipment. We manufacture and supply high-quality machinery across Northeast India including Assam, Meghalaya, Arunachal Pradesh." />
        <meta name="keywords" content="construction equipment, brick making machine, concrete mixer, trimix system, construction machinery, Assam, Northeast India, Guwahati" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lotustradersmachinery.com" />
        <meta property="og:title" content="Lotus Traders - Construction Equipment Manufacturer in Northeast India" />
        <meta property="og:description" content="Manufacturing and supplying high-quality construction equipment in Guwahati, Assam and across Northeast India since 1990." />
        <meta property="og:image" content="https://www.lotustradersmachinery.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lotus Traders - Construction Equipment" />
        <meta name="twitter:description" content="Manufacturing and supplying high-quality construction equipment in Northeast India" />
        <meta name="twitter:image" content="https://www.lotustradersmachinery.com/twitter-image.jpg" />
        <link rel="canonical" href="https://www.lotustradersmachinery.com" />
      </Head>
      
      {/* Google Analytics Tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-VVB6VMXKHK"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VVB6VMXKHK');
        `}
      </Script>

      {/* Schema.org structured data */}
      <Script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      
      <Hero />
      <div id="categories">
        <Categories />
      </div>
      <div id="dod">
        <DealsOfTheDay />
      </div>
      <div id="products">
        <Products />
      </div>
      <div id="about">
        <Founder />
      </div>
      <Testimonials />
      <Footer />
      
      <ContactPopup 
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
}
