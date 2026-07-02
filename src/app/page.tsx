"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { SpeedInsights } from "@vercel/speed-insights/next";

// Components
import Hero from '@/components/Hero';
import TrustedCompanies from '@/components/TrustedCompanies';
import About from '@/components/About';
import Categories from '@/components/landing_categories';
import DealsOfTheDay from '@/components/DoD';
import Products from '@/components/landing_products';
import WhyChooseUs from '@/components/WhyChooseUs';
import IndustriesServed from '@/components/IndustriesServed';
import Blogs from '@/components/Blogs';
import Testimonials from '@/components/testimonial';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/footer';
import ContactPopup from '@/components/ContactPopup';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 8500); // Delayed popup to let user experience the site first
    return () => clearTimeout(timer);
  }, []);

  // JSON-LD structured data for homepage
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lotus Traders Machinery",
    "url": "https://www.lotustradersmachinery.com",
    "logo": "https://www.lotustradersmachinery.com/logo.png",
    "description": "Premium Manufacturer and supplier of construction equipment in Northeast India",
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
    "name": "Lotus Traders Machinery",
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
    "priceRange": "$$$",
    "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-18:00",
    "sameAs": [
      "https://www.youtube.com/@LOTUSTRADERS"
    ]
  };

  return (
    <>
      <Head>
        <title>Premium Construction Equipment | Lotus Traders Machinery Assam</title>
        <meta name="description" content="Lotus Traders Machinery is the trusted industrial brand for premium construction equipment in Northeast India. Buy brick making machines, concrete mixers with EMI." />
        <meta name="keywords" content="premium construction equipment, heavy machinery assam, industrial brick machine, reliable concrete mixer Guwahati, Lotus Traders Machinery" />
        
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
        <meta property="og:title" content="Lotus Traders Machinery | Premium Construction Equipment" />
        <meta property="og:description" content="Industrial-grade construction machinery trusted by professionals across Northeast India. Engineering excellence since 1990." />
        <meta property="og:image" content="https://www.lotustradersmachinery.com/og-image.jpg" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lotus Traders Machinery" />
        <meta name="twitter:description" content="Industrial-grade construction machinery trusted by professionals across Northeast India." />
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

      <main className="bg-theme-bg min-h-screen transition-colors duration-300 relative">
        {/* Global Subtle Background Effects */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20rem] -right-[20rem] w-[50rem] h-[50rem] rounded-full bg-accent/15 dark:bg-accent/5 blur-[100px]"></div>
          <div className="absolute -bottom-[20rem] -left-[20rem] w-[50rem] h-[50rem] rounded-full bg-blue-500/15 dark:bg-blue-500/5 blur-[100px]"></div>
        </div>
        
        <div className="relative z-10">
          <Hero />
          <TrustedCompanies />
          <section id="about">
            <About />
          </section>
          <section id="categories">
            <Categories />
          </section>
          <section id="dod">
            <DealsOfTheDay />
          </section>
          <section id="products">
            <Products />
          </section>
          <WhyChooseUs />
          <IndustriesServed />
          <Blogs />
          <Testimonials />
          <CtaSection />
          <Footer />
        </div>
      </main>

      <ContactPopup
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
}
