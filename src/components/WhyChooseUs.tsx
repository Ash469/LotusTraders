'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LuShieldCheck, LuWrench, LuTruck, LuBadgeCheck, LuThumbsUp, LuCoins } from 'react-icons/lu';

const features = [
  {
    icon: LuShieldCheck,
    title: 'Trusted Since 1990',
    description: 'Over three decades of unyielding commitment to quality and reliability in the construction industry.',
  },
  {
    icon: LuBadgeCheck,
    title: 'Quality Assurance',
    description: 'Every machine undergoes rigorous testing to meet the highest industrial standards.',
  },
  {
    icon: LuWrench,
    title: 'After Sales Support',
    description: 'Comprehensive maintenance and support to ensure your equipment never faces unexpected downtime.',
  },
  {
    icon: LuTruck,
    title: 'Fast Delivery',
    description: 'Optimized logistics network ensuring prompt delivery across all states in Northeast India.',
  },
  {
    icon: LuThumbsUp,
    title: 'Expert Guidance',
    description: 'Our engineering consultants help you select the exact machinery required for your specific project needs.',
  },
  {
    icon: LuCoins,
    title: 'Competitive Pricing',
    description: 'Premium quality machinery offered at the best value, ensuring maximum ROI for your business.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 overflow-hidden transition-colors duration-300 border-b border-theme-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-4 transition-colors duration-300">Why Choose Lotus Traders</h2>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto transition-colors duration-300">
            We don&apos;t just sell machinery; we build long-term partnerships based on trust, performance, and unmatched support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-theme-surface p-10 rounded-[16px] shadow-sm hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 border border-theme-border hover:border-gray-200 dark:hover:border-slate-600 group"
              >
                <div className="w-16 h-16 rounded-[12px] flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-300 text-theme-text shadow-sm border border-gray-100 dark:border-slate-700">
                  <Icon className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-theme-text mb-4 transition-colors duration-300">{feature.title}</h3>
                <p className="text-theme-text-muted leading-relaxed transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
