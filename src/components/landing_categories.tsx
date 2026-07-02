'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Category {
  _id: string;
  id: string;
  name: string;
  description: string;
  heroImages: string[];
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories', {
          next: { revalidate: 3600 }
        });
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-24 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-pulse bg-gray-200 dark:bg-slate-800 h-12 w-64 mb-16 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-96 bg-gray-200 dark:bg-slate-800 rounded-[16px] animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 overflow-hidden transition-colors duration-300 border-b border-theme-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-4 transition-colors duration-300">Our Equipment Arsenal</h2>
          <p className="text-lg text-theme-text-muted max-w-2xl transition-colors duration-300">
            Explore our comprehensive range of high-performance construction machinery, engineered for reliability and precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <Link key={category._id} href={`/categories/${category.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative w-full h-[400px] md:h-[500px] rounded-[16px] overflow-hidden bg-theme-surface shadow-lg hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-500"
              >
                {/* Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden p-8">
                  <Image
                    src={category.heroImages?.[0] || '/assets/categories/brick_making_machine_1.png'}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-center scale-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                
                {/* Gradient Overlay for Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 dark:from-slate-900/90 via-primary/30 dark:via-slate-900/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold mb-2 font-heading">{category.name}</h3>
                    <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-gray-200 mt-2 line-clamp-2">
                        {category.description || "Discover our range of premium equipment designed for maximum efficiency."}
                      </p>
                      <div className="mt-4 flex items-center text-accent font-semibold uppercase tracking-wider text-sm">
                        <span>Explore Range</span>
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
