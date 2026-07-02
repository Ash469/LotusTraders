'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const industries = [
  {
    title: 'Infrastructure',
    image: '/assets/banner/banner2.jpg',
  },
  {
    title: 'Road Construction',
    image: '/assets/banner/banner3.jpg',
  },
  {
    title: 'Commercial Projects',
    image: '/assets/banner/banner4.jpg',
  },
  {
    title: 'Residential Projects',
    image: '/assets/banner/banner5.jpg',
  },
  {
    title: 'Government',
    image: '/assets/banner/banner1.jpg',
  },
  {
    title: 'Industrial Plants',
    image: '/assets/categories/categories-bg.png', // Fallback to bg image
  },
];

const IndustriesServed = () => {
  return (
    <section className="py-24 overflow-hidden transition-colors duration-300 border-b border-theme-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-theme-text transition-colors duration-300">Industries We Serve</h2>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto transition-colors duration-300">
            Delivering power and precision to diverse sectors across the nation.
          </p>
        </motion.div>
      </div>

      <div className="w-full flex flex-wrap">
        {industries.map((industry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
            className="w-full md:w-1/2 lg:w-1/3 h-[350px] relative group overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full bg-theme-surface">
              <Image 
                src={industry.image}
                alt={industry.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
            </div>
            {/* Using a dark gradient overlay regardless of theme so white text is always readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            
            <div className="absolute inset-0 p-8 flex items-end">
              <h3 className="text-2xl font-bold text-white font-heading transform group-hover:-translate-y-2 transition-transform duration-500 shadow-sm">
                {industry.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IndustriesServed;
