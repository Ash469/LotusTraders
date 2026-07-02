import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPhone, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaLocationPin, FaMessage } from 'react-icons/fa6';

const Footer = () => {
  const OrganizationSchema = () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Lotus Traders Machinery",
      "url": "https://www.lotustradersmachinery.com",
      "logo": "https://www.lotustradersmachinery.com/logo.png",
      "description": "Premium Manufacturer and supplier of construction equipment in Northeast India",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Zoo Tiniali",
        "addressLocality": "Guwahati",
        "addressRegion": "Assam",
        "postalCode": "781021",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+919435559130",
        "contactType": "sales",
        "email": "info@lotustraders.co.in",
        "availableLanguage": ["English", "Hindi", "Assamese"]
      },
      "sameAs": [
        "https://www.youtube.com/@LOTUSTRADERS"
      ]
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    );
  };

  return (
    <>
      <OrganizationSchema />
      <footer className="bg-theme-bg text-theme-text-muted py-10 md:py-12 border-t border-theme-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Column 1 - Brand (Spans 4) */}
            <div className="lg:col-span-4">
              <div className="relative w-[240px] h-[80px] mb-6 transform -translate-x-4">
                <Image
                  src="/logo.png"
                  alt="Lotus Traders Logo"
                  fill
                  sizes="240px"
                  className="object-cover"
                  priority
                />
              </div>
              <p className="text-theme-text-muted leading-relaxed mb-8 pr-4">
                Pioneering infrastructure development across India with premium, industrial-grade construction machinery since 1990. 
              </p>
              <div className="flex gap-4">
                <a href="https://wa.me/9435559130" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="w-12 h-12 rounded-full bg-theme-surface border border-theme-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-theme-text transition-all duration-300">
                  <FaWhatsapp size={20} />
                </a>
                <a href="https://www.youtube.com/@LOTUSTRADERS" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-12 h-12 rounded-full bg-theme-surface border border-theme-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-theme-text transition-all duration-300">
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>

            {/* Column 2 - Links (Spans 2) */}
            <div className="lg:col-span-2">
              <h3 className="text-theme-text font-bold font-heading text-lg mb-6 tracking-wide uppercase">Company</h3>
              <ul className="space-y-4">
                <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li><Link href="/#about" className="hover:text-accent transition-colors">About Us</Link></li>
                <li><Link href="/products" className="hover:text-accent transition-colors">Products</Link></li>
                <li><Link href="/projects" className="hover:text-accent transition-colors">Projects</Link></li>
                <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3 - Machinery (Spans 3) */}
            <div className="lg:col-span-3">
              <h3 className="text-theme-text font-bold font-heading text-lg mb-6 tracking-wide uppercase">Machinery</h3>
              <ul className="space-y-4">
                <li><Link href="/categories/brick_making_machine" className="hover:text-accent transition-colors">Brick Making Machines</Link></li>
                <li><Link href="/categories/concrete_mixer" className="hover:text-accent transition-colors">Concrete Mixers</Link></li>
                <li><Link href="/categories/bar_bending_and_cutting_machine" className="hover:text-accent transition-colors">Bar Bending & Cutting</Link></li>
                <li><Link href="/categories/moulds" className="hover:text-accent transition-colors">Industrial Moulds</Link></li>
                <li><Link href="/categories/trimix_system" className="hover:text-accent transition-colors">Trimix Systems</Link></li>
              </ul>
            </div>

            {/* Column 4 - Contact (Spans 3) */}
            <div className="lg:col-span-3">
              <h3 className="text-theme-text font-bold font-heading text-lg mb-6 tracking-wide uppercase">Contact</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 text-accent"><FaLocationPin size={20} /></div>
                  <a href="https://www.google.com/maps/place/Lotus+Traders" className="hover:text-theme-text transition-colors leading-relaxed">
                    Zoo Tiniali, Guwahati, Assam 781021, India
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="text-accent"><FaPhone size={20} /></div>
                  <a href="tel:+919435559130" className="hover:text-theme-text transition-colors">+91 9435559130</a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="text-accent"><FaMessage size={20} /></div>
                  <a href="mailto:info@lotustraders.co.in" className="hover:text-theme-text transition-colors">info@lotustraders.co.in</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-theme-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-theme-text-muted text-sm">
              © {new Date().getFullYear()} Lotus Traders Machinery. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-theme-text-muted">
              <Link href="/privacy" className="hover:text-theme-text transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-theme-text transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
