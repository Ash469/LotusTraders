'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

// Helper component for animating counters
const AnimatedCounter = ({ end, label }: { end: number, label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.max(1, Math.floor(duration / end)); // ensure at least 1ms step
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="flex flex-col items-start border-l-2 border-accent pl-4">
      <div className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-1 transition-colors duration-300">
        {count}+
      </div>
      <div className="text-sm uppercase tracking-wider text-theme-text-muted font-semibold transition-colors duration-300">
        {label}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section className="py-24 overflow-hidden transition-colors duration-300 border-b border-theme-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full max-w-[400px] mx-auto aspect-square rounded-full overflow-hidden shadow-2xl dark:shadow-black/40 bg-theme-surface border-4 border-theme-border">
              <Image 
                src="/assets/banner/founder.jpg" 
                alt="About Lotus Traders" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute bottom-0 right-0 md:-right-4 bg-primary dark:bg-slate-800 text-white p-5 md:p-6 rounded-[16px] shadow-xl z-10 hidden md:block border border-gray-800 dark:border-slate-700 transition-colors duration-300">
              <div className="text-4xl md:text-5xl font-bold font-heading text-accent mb-1">30</div>
              <div className="text-xs tracking-widest uppercase text-gray-300 dark:text-gray-400">Years of<br/>Excellence</div>
            </div>
          </motion.div>

          {/* Right: Content Container */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-theme-text mb-8 leading-tight transition-colors duration-300">
                Future of Construction
              </h2>
              <p className="text-lg text-theme-text-muted mb-6 leading-relaxed transition-colors duration-300">
                Since 1990, Lotus Traders Machinery has been at the forefront of the construction equipment industry in Northeast India. We provide robust, reliable, and premium machinery that empowers professionals to build infrastructure that lasts generations.
              </p>
              <p className="text-lg text-theme-text-muted mb-12 leading-relaxed transition-colors duration-300">
                Our vision is rooted in engineering excellence and uncompromising quality. We believe that top-tier machinery is the backbone of great architecture, and our dedicated team ensures you have the right tools to turn your blueprints into reality.
              </p>
            </motion.div>

            {/* Counters */}
            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
              <AnimatedCounter end={500} label="Projects Completed" />
              <AnimatedCounter end={1200} label="Machines Sold" />
              <AnimatedCounter end={300} label="Happy Clients" />
              <AnimatedCounter end={8} label="States Served" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;