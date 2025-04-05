'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import './Hero.css';
import NavBar from './nav_bar';

const Hero = () => {


  const images = [
    '/assets/banner/banner1.jpg',
    '/assets/banner/banner2.jpg',
    '/assets/banner/banner3.jpg',
    '/assets/banner/banner4.jpg',
    '/assets/banner/banner5.jpg',

  ];

  return (
    <>
      <NavBar />
      <div className="w-full mt-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          speed={800}
          effect="fade"
          fadeEffect={{ crossFade: true }}
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
                  className="object-cover object-center"
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