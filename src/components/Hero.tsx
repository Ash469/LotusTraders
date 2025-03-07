'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './Hero.css';

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const images = [
    '/assets/images/PAN INDIA WEBSITE WORK.jpg',
    '/assets/images/PAN INDIA WEBSITE WORK 2.jpg',
    '/assets/images/PAN INDIA WEBSITE WORK 3.jpg',
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-md z-50">
        <div className="flex items-center justify-between h-20 max-w-7xl mx-auto px-4">
          <div className="relative h-16 w-72">
            <Image src="/assets/images/logo.png" alt="Logo" fill priority className="object-contain" />
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-red-600 outline-none transition-all duration-300"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">🔍</button>
            </div>
          </div>

          <Link href="/enquiry" className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
            <span>Enquiry</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </Link>

          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="p-6 md:hidden bg-gray-50 border-t">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-red-600 outline-none mb-4 transition-all duration-300"
            />
            <Link href="/enquiry" className="block text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
              Enquiry
            </Link>
          </div>
        )}
      </nav>

      <div className="w-full mt-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="w-full aspect-[16/8] sm:aspect-[16/6]"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative w-full">
              <div className="relative w-full aspect-[16/8] sm:aspect-[16/6]">
                <Image
                  src={image}
                  alt={`Banner ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  quality={90}
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Hero;