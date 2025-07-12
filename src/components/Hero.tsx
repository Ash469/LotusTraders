'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import NavBar from './nav_bar';

const Hero = () => {
  const bannerContent = [
    {
      image: '/assets/banner/banner1.jpg',
      link: '/categories/bar_bending_and_cutting_machine',
      title: 'bar_bending_and_cutting_machine'
    },
    {
      image: '/assets/banner/banner2.jpg',
      link: '/categories/concrete_mixer',
      title: 'concrete_mixer'
    },
    {
      image: '/assets/banner/banner3.jpg',
      link: '/categories/moulds',
      title: 'moulds'
    },
    {
      image: '/assets/banner/banner4.jpg',
      link: '/categories/trimix_system',
      title: 'trimix_system'
    },
    {
      image: '/assets/banner/banner5.jpg',
      link: '/categories/trolley',
      title: 'trolley'
    },
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
          className="w-full"
          style={{ aspectRatio: '16/6' }}
        >
          {bannerContent.map((banner, index) => (
            <SwiperSlide key={index} className="relative w-full">
              <Link 
                href={banner.link} 
                className="block relative w-full"
                style={{ aspectRatio: '16/6' }}
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  quality={75}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover object-center"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Hero;