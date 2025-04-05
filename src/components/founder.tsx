/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';

const Founder = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Image Container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
            <img 
              src="/assets/banner/founder.png" 
              alt="Founder" 
              className="w-full h-full object-fill rounded-full"
            />
  
        </div>

        {/* Content Container */}
        <div className="flex-1 space-y-6 text-center md:text-left">
        <h2 className="text-4xl font-bold text-gray-800 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 md:after:left-0 after:w-20 after:h-1 after:bg-orange-500">
          <div>Our Founder&apos;s Vision</div>
        </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            My vision is to build a dedicated team that delivers the best client 
            experience by staying true to our core values and ethics. I believe 
            that human beings are in a continuous state of evolution—our current 
            stage is not the final one. Instead, we are moving toward higher 
            consciousness, striving to manifest divinity while living in this world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Founder;