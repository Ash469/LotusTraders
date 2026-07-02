'use client';

import Image from 'next/image';
import NavBar from './nav_bar';

const Hero = () => {
  return (
    <>
      <NavBar />
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-primary dark:bg-slate-900">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/banner/banner1.jpg"
            alt="Construction Machinery Hero"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;