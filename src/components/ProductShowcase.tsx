'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const showcaseImages = [
  { src: '/assets/banner/banner1.jpg', aspect: 'aspect-[4/3]' },
  { src: '/assets/banner/banner2.jpg', aspect: 'aspect-[3/4]' },
  { src: '/assets/categories/categories-bg.png', aspect: 'aspect-[1/1]' },
  { src: '/assets/banner/banner3.jpg', aspect: 'aspect-[3/4]' },
  { src: '/assets/banner/banner4.jpg', aspect: 'aspect-[4/3]' },
  { src: '/assets/banner/banner5.jpg', aspect: 'aspect-[4/5]' },
];

const ProductShowcase = () => {
  return (
    <section className="py-24 overflow-hidden transition-colors duration-300 border-b border-theme-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-theme-text transition-colors duration-300">Machines in Action</h2>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto transition-colors duration-300">
            Witness the brute force and elegant engineering of Lotus Traders Machinery.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {showcaseImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
              className={`relative w-full rounded-[16px] overflow-hidden group ${image.aspect} break-inside-avoid shadow-sm hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-500 bg-theme-surface border border-theme-border`}
            >
              <Image 
                src={image.src}
                alt={`Showcase ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 dark:group-hover:bg-slate-900/40 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
