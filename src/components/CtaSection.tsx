'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CtaSection = () => {
  return (
    <section className="py-24 text-theme-text relative overflow-hidden border-t border-theme-border">

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-heading leading-tight text-theme-text">
            Ready to Build Better?
          </h2>
          <p className="text-xl text-theme-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            Partner with Lotus Traders Machinery for premium construction equipment that delivers uncompromising performance and reliability.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link 
              href="tel:+919435559130"
              className="w-full sm:w-auto px-10 py-5 bg-accent text-white font-bold rounded-[8px] hover:bg-amber-600 transition-all shadow-lg hover:shadow-accent/40 text-lg hover:-translate-y-1"
            >
              Call Now
            </Link>
            <Link 
              href="https://wa.me/919435559130"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-[#25D366] text-white font-bold rounded-[8px] hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-[#25D366]/40 text-lg hover:-translate-y-1"
            >
              WhatsApp
            </Link>
            <Link 
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-theme-surface border-2 border-theme-border text-theme-text font-bold rounded-[8px] hover:border-accent hover:text-accent transition-all shadow-sm text-lg hover:-translate-y-1"
            >
              Request Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
