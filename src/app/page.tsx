"use client";

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Categories from '@/components/landing_categories';
import Products from '@/components/landing_products';
import DealsOfTheDay from '@/components/DoD';
import Founder from '@/components/founder';
import Testimonials from '@/components/testimonial';
import Footer from '@/components/footer';
import ContactPopup from '@/components/ContactPopup';

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

  return (
    <div>
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
    </div>
  );
}
