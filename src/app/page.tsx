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
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5500); 
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

  // Additional structured data for LocalBusiness
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lotus Traders",
    "image": "https://www.lotustradersmachinery.com/logo.png",
    "telephone": "+919435559130",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "G.S. Road, Guwahati",
      "addressLocality": "Guwahati",
      "addressRegion": "Assam",
      "postalCode": "781005",
      "addressCountry": "IN"
    },
    "url": "https://www.lotustradersmachinery.com",
    "priceRange": "$$",
    "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-18:00",
    "sameAs": [
      "https://www.youtube.com/@LOTUSTRADERS"
    ]
  };

  return (
    <>
      <Head>
        <title>Construction Equipment Dealer in Guwahati | Brick Making Machines Assam</title>
        <meta name="description" content="Buy construction equipment in Guwahati at best price. Top dealer of brick making machines, concrete mixers in Assam. EMI available. Call: 9435559130" />
        <meta name="keywords" content="construction equipment dealer, brick machine price, concrete mixer Guwahati, construction machinery Assam, equipment price list, machinery supplier" />
        
        {/* Location and business specific meta tags */}
        <meta name="geo.region" content="IN-AS" />
        <meta name="geo.placename" content="Guwahati" />
        <meta name="geo.position" content="26.1445;91.7362" />
        
        {/* Business specific schema markup */}
        <meta name="business:contact_data:street_address" content="G.S. Road, Guwahati" />
        <meta name="business:contact_data:locality" content="Guwahati" />
        <meta name="business:contact_data:region" content="Assam" />
        <meta name="business:contact_data:postal_code" content="781005" />
        <meta name="business:contact_data:country_name" content="India" />
        <meta name="business:contact_data:phone_number" content="+919435559130" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Construction Equipment Dealer in Guwahati | Best Prices" />
        <meta property="og:description" content="Top construction equipment dealer in Guwahati. Best price on brick machines, concrete mixers. EMI available. Trusted supplier since 1990." />
        <meta property="og:image" content="https://www.lotustradersmachinery.com/og-image.jpg" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lotus Traders - Construction Equipment" />
        <meta name="twitter:description" content="Buy construction machines and mixers in Assam and Northeast India. Best prices. Fast delivery." />
        <meta name="twitter:image" content="https://www.lotustradersmachinery.com/twitter-image.jpg" />
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
      <Script
        id="localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* Vercel Speed Insights */}
      <SpeedInsights />

      <main>
        <Hero />
        <section id="categories" aria-label="Product Categories">
          <Categories />
        </section>
        <section id="dod" aria-label="Deals of the Day">
          <DealsOfTheDay />
        </section>
        <section id="products" aria-label="Featured Products">
          <Products />
        </section>
        <section id="about" aria-label="About Lotus Traders">
          <Founder />
        </section>
        <Testimonials />
        <Footer />
      </main>

      <ContactPopup
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
}
