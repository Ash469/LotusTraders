'use client';
import { CategoryData } from '@/types/type';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCube } from 'swiper/modules';
import { FaStar, FaChevronRight, FaClock, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import Footer from '@/components/footer';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import LoadingState from './LoadingState';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cube';
import CategoryNotFound from './NotFound';

// Star rating component
const renderStarRating = (rating: number) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        if (star <= Math.floor(rating)) {
          return <FaStar key={star} className="text-yellow-400" size={14} />;
        } else if (star === Math.ceil(rating) && !Number.isInteger(rating)) {
          const percentage = (rating % 1) * 100;
          return (
            <div key={star} className="relative">
              <FaStar className="text-gray-300" size={14} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${percentage}%` }}>
                <FaStar className="text-yellow-400" size={14} />
              </div>
            </div>
          );
        } else {
          return <FaStar key={star} className="text-gray-300" size={14} />;
        }
      })}
      <span className="ml-1 text-gray-600 text-sm">{rating}</span>
    </div>
  );
};

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.category as string || '';

  const [category, setCategory] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dealTimeLeft, setDealTimeLeft] = useState<number>(0);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/categories/${categoryId}`);
        if (!res.ok) throw new Error('Failed to fetch category data');
        const data = await res.json();
        setCategory(data);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [categoryId]); // Only re-fetch when category ID changes

  useEffect(() => {
    // Calculate time until midnight for deals timer
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      return Math.floor((midnight.getTime() - now.getTime()) / 1000);
    };
    
    // Initialize timer
    setDealTimeLeft(calculateTimeUntilMidnight());
    
    // Update timer every second
    const timerInterval = setInterval(() => {
      setDealTimeLeft(prev => {
        if (prev <= 1) {
          return calculateTimeUntilMidnight(); // Reset at midnight
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, []);
  
  // Format the time from seconds to HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return {
      hours,
      minutes,
      seconds
    };
  };
  
  const formattedTime = formatTime(dealTimeLeft);

  if (loading) {
    return <LoadingState />;
  } else if (!category) {
    return <CategoryNotFound />;
  }


  return (
    <div className="min-h-screen">
      {/* Section Navigation */}
      <div className="sticky top-0 z-30 bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Logo Image */}
            <div className="relative h-16 w-82">
              <Link href="/">
                <Image src="/logo.png" alt="Logo" fill priority className="object-cover" />
              </Link>
            </div>

            {/* Navigation Buttons - Desktop */}
            <div className="hidden md:flex space-x-4 lg:space-x-6 flex-grow justify-center">
              <Link
                href="/"
                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
              >
                Home
              </Link>
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
              >
                Our Products
              </button>
              <button
                onClick={() => document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' })}
                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
              >
                Trending
              </button>
              <button
                onClick={() => document.getElementById('new-releases')?.scrollIntoView({ behavior: 'smooth' })}
                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
              >
                New Releases
              </button>
              <button
                onClick={() => document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' })}
                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
              >
                Deals of the Day
              </button>
              <Link
                href="/contact"
                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all bg-red-600 text-white"
              >
                Connect with us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div id="hero" className="relative bg-gradient-to-b bg-[linear-gradient(135deg,#f6f8fa_0%,#e9ecef_100%)] py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              {category.name}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {category.name}
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              {category.description}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Explore Products
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all">
                Learn More
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            {category.heroImages && category.heroImages.length > 0 && (
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCube]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                effect="cube"
                cubeEffect={{
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }}
                className="w-full h-[400px] rounded-xl overflow-hidden shadow-2xl"
              >
                {category.heroImages.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <div
                        style={{
                          background: `rgb(232, 209, 209) url('/assets/categories/categories-bg.png')`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={image}
                          alt={`${category.name} hero image ${index + 1}`}
                          fill
                          priority
                          className="object-contain p-4"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div id="products" className="bg-[linear-gradient(135deg,#f6f8fa_0%,#e9ecef_100%)] py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">COLLECTION</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Products</h2>
              <div className="w-20 h-1 bg-blue-600 mt-4"></div>
            </div>
            {/* <Link href="/all-products" className="mt-4 md:mt-0 flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
              View all products <FaChevronRight className="ml-2" size={14} />
            </Link> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {category.products?.map((product) => (
              <div 
                key={product.id} 
                className="group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
              >
                <div 
                  className="relative h-64 w-full overflow-hidden"
                  style={{
                  background: `rgb(232, 209, 209) url('/assets/categories/categories-bg.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  padding: '12px',
                  border: '1px solid rgba(229, 231, 235, 1)',
                  borderRadius: '8px',
                  margin: '8px',
                  }}
                >
                  <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform group-hover:scale-105 p-2"
                  style={{ 
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                  }}
                  />
                </div>

                <div className="p-4 bg-gradient-to-b from-white to-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>
                  <div className="relative">
                    {renderStarRating(product.rating)}
                    <div className="absolute inset-0 bg-white bg-opacity-90 opacity-0 group-hover:opacity-100 flex items-center justify-between transition-all duration-300">
                      <Link
                        href={{
                          pathname: '/enquiry',
                          query: {
                            productId: product.id,
                            productName: product.name,
                            productImage: product.image,
                            quantity: 1
                          }
                        }}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center"
                      >
                        <span>Enquiry</span>
                        <FaChevronRight size={10} className="ml-1" />
                      </Link>
                      <Link 
                        href={`/products/${product.id}`} 
                        className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium hover:from-gray-900 hover:to-black transition-all shadow-md hover:shadow-lg flex items-center"
                      >
                        <span>Details</span>
                        <FaChevronRight size={10} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {category.trendingProducts && (
        <div id="trending" className="bg-[linear-gradient(135deg,#f6f8fa_0%,#e9ecef_100%)] py-16 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <span className="inline-block px-4 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-4">HOT & TRENDING</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trending Products</h2>
                <div className="w-20 h-1 bg-red-500 mt-4"></div>
              </div>
            </div>

            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              slidesPerView={1}
              spaceBetween={24}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="w-full"
            >
              {category.trendingProducts.map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <div 
                    className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                    style={{
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <div 
                      className="relative h-64 w-full overflow-hidden"
                      style={{
                        background: `rgb(232, 209, 209) url('/assets/categories/categories-bg.png')`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        padding: '12px',
                        border: '1px solid rgba(229, 231, 235, 1)',
                        borderRadius: '8px',
                        margin: '8px',
                      }}
                    >
                      <div className="absolute top-0 left-0 bg-red-500 text-white px-4 py-1 z-10 rounded-br-lg font-semibold">
                        TRENDING
                      </div>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform group-hover:scale-105 p-2"
                        style={{ 
                          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                        }}
                      />
                    </div>
                    <div className="p-4 bg-gradient-to-b from-white to-gray-50">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                      </h3>
                      <div className="relative">
                        {renderStarRating(product.rating)}
                        <div className="absolute inset-0 bg-white bg-opacity-90 opacity-0 group-hover:opacity-100 flex items-center justify-between transition-all duration-300">
                          <Link
                            href={{
                              pathname: '/enquiry',
                              query: {
                                productId: product.id,
                                productName: product.name,
                                productImage: product.image,
                                quantity: 1
                              }
                            }}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center"
                          >
                            <span>Enquiry</span>
                            <FaChevronRight size={10} className="ml-1" />
                          </Link>
                          <Link 
                            href={`/products/${product.id}`} 
                            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium hover:from-gray-900 hover:to-black transition-all shadow-md hover:shadow-lg flex items-center"
                          >
                            <span>Details</span>
                            <FaChevronRight size={10} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* New Release Products Section */}
      {category.newReleases && (
        <div id="new-releases" className="bg-[linear-gradient(135deg,#f6f8fa_0%,#e9ecef_100%)] py-16 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <span className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">JUST ARRIVED</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">New Releases</h2>
                <div className="w-20 h-1 bg-green-500 mt-4"></div>
              </div>
              {/* <Link href="/new-products" className="mt-4 md:mt-0 flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                View all new arrivals <FaChevronRight className="ml-2" size={14} />
              </Link> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {category.newReleases.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <div 
                    className="relative h-64 w-full overflow-hidden"
                    style={{
                      background: `rgb(232, 209, 209) url('/assets/categories/categories-bg.png')`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      padding: '12px',
                      border: '1px solid rgba(229, 231, 235, 1)',
                      borderRadius: '8px',
                      margin: '8px',
                    }}
                  >
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 z-10 rounded-bl-lg font-medium">
                      NEW
                    </div>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform group-hover:scale-105 p-2"
                      style={{ 
                        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                      }}
                    />
                  </div>

                  <div className="p-4 bg-gradient-to-b from-white to-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {product.name}
                    </h3>
                    <div className="relative">
                      {renderStarRating(product.rating)}
                      <div className="absolute inset-0 bg-white bg-opacity-90 opacity-0 group-hover:opacity-100 flex items-center justify-between transition-all duration-300">
                        <Link
                          href={{
                            pathname: '/enquiry',
                            query: {
                              productId: product.id,
                              productName: product.name,
                              productImage: product.image,
                              quantity: 1
                            }
                          }}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center"
                        >
                          <span>Enquiry</span>
                          <FaChevronRight size={10} className="ml-1" />
                        </Link>
                        <Link 
                          href={`/products/${product.id}`} 
                          className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium hover:from-gray-900 hover:to-black transition-all shadow-md hover:shadow-lg flex items-center"
                        >
                          <span>Details</span>
                          <FaChevronRight size={10} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Deal of the Day Section */}
      {category.deals && (
        <div id="deals" className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white opacity-10 rounded-full"></div>
          </div>

          <div className="container mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-semibold mb-4">LIMITED TIME OFFER</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Deals of the Day</h2>
              <p className="text-white max-w-2xl mx-auto">Don&apos;t miss out on these amazing offers. Limited stock available!</p>

              {/* Active countdown timer */}
              <div className="flex items-center justify-center mt-6 space-x-4">
                <div className="flex flex-col items-center bg-white bg-opacity-30 px-4 py-2 rounded-lg w-20">
                  <span className="text-2xl font-bold text-black">{formattedTime.hours.toString().padStart(2, '0')}</span>
                  <span className="text-xs text-black">Hours</span>
                </div>
                <span className="text-2xl text-white font-bold">:</span>
                <div className="flex flex-col items-center bg-white bg-opacity-90 px-4 py-2 rounded-lg w-20">
                  <span className="text-2xl font-bold text-black">{formattedTime.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-xs text-black">Minutes</span>
                </div>
                <span className="text-2xl text-white font-bold">:</span>
                <div className="flex flex-col items-center bg-white bg-opacity-90 px-4 py-2 rounded-lg w-20">
                  <span className="text-2xl font-bold text-black">{formattedTime.seconds.toString().padStart(2, '0')}</span>
                  <span className="text-xs text-black">Seconds</span>
                </div>
              </div>
            </div>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              slidesPerView={1}
              spaceBetween={24}
              breakpoints={{
                768: { slidesPerView: 2 },
                1280: { slidesPerView: 3 },
              }}
              className="w-full"
            >
              {category.deals.map((deal) => (
                <SwiperSlide key={deal.id}>
                  <div className="bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl">
                    <div className="relative h-64 w-full">
                      <Image
                        src={deal.image}
                        alt={deal.name}
                        fill
                        className="object-contain"
                      />
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-bl-lg font-bold">
                        {deal.discount}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <FaClock className="text-red-500 mr-2" />
                        <span className="text-sm text-red-500 font-medium">Limited time offer</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{deal.name}</h3>
                      <p className="mb-4 text-gray-600">{deal.description}</p>
                      <div className="flex justify-between items-center mb-4">
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="bg-gray-100 h-2 rounded-full flex-grow mr-4">
                          <div className="bg-red-500 h-2 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-sm font-medium text-red-600">75% sold</span>
                      </div>
                      <Link
                        href={{
                          pathname: '/enquiry',
                          query: {
                            productId: deal.id,
                            productName: deal.name,
                            productImage: deal.image,
                            quantity: 1
                          }
                        }}
                        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center"
                      >
                        <FaShoppingCart className="mr-2" />
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}