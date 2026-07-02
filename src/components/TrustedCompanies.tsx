'use client';

import React from 'react';
import { motion } from 'framer-motion';

const companies = [
  "L&T Construction",
  "Tata Projects",
  "Afcons Infrastructure",
  "Shapoorji Pallonji",
  "NCC Limited",
  "GMR Group",
  "Dilip Buildcon",
  "Hindustan Construction",
];

const TrustedCompanies = () => {
  return (
    <section className="py-12 overflow-hidden border-b border-theme-border">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm uppercase tracking-widest text-theme-text-muted font-semibold">
          Trusted by Industry Leaders Across India
        </p>
      </div>
      
      <div className="relative w-full flex overflow-hidden group">
        {/* We render the list twice to create a seamless infinite loop */}
        <div className="flex w-max animate-marquee space-x-16 md:space-x-24 px-8 md:px-12 items-center">
          {[...companies, ...companies].map((company, index) => (
            <div 
              key={index} 
              className="text-2xl md:text-3xl font-bold text-gray-400 dark:text-slate-600 whitespace-nowrap transition-colors duration-300 hover:text-theme-text dark:hover:text-theme-text cursor-default"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
