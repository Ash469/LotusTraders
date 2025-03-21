"use client"
import React, { useState } from 'react';
import NavBar from '@/components/nav_bar';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from '@/components/footer';

const ProductsPage = () => {
    const [activeTab, setActiveTab] = useState('Benefits');

    const sampleProduct = {
        title: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music enthusiasts and professionals.",
        mainImage: "/assets/categories/cat1.png",
        thumbnails: [
            '/assets/categories/cat1.png',
            '/assets/categories/cat2.png',
            '/assets/categories/cat3.png',
            '/assets/categories/cat3.png',
            '/assets/categories/cat3.png',
        ]
    };

    // Sample data for related products with ratings
    const relatedProducts = [
        {
            id: 1,
            title: "Bluetooth Earbuds",
            rating: 4.8,
            image: "/assets/categories/cat1.png",
        },
        {
            id: 2,
            title: "Noise-Cancelling Headphones",
            rating: 4.5,
            image: "/assets/categories/cat2.png",
        },
        {
            id: 3,
            title: "Studio Monitors",
            rating: 4.9,
            image: "/assets/categories/cat3.png",
        },
        {
            id: 4,
            title: "Gaming Headset",
            rating: 4.7,
            image: "/assets/categories/cat1.png",
        },
        {
            id: 5,
            title: "DJ Headphones",
            rating: 4.6,
            image: "/assets/categories/cat2.png",
        }
    ];

    // Function to render star ratings
    const renderStarRating = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={`star-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        // Add half star if needed
        if (hasHalfStar) {
            stars.push(
                <svg key="half-star" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="half-star-gradient">
                            <stop offset="50%" stopColor="#FBBF24" />
                            <stop offset="50%" stopColor="#D1D5DB" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        // Add empty stars
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        return (
            <div className="flex items-center">
                <div className="flex mr-1">{stars}</div>
                <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <main className="container mx-auto px-4 pt-24">
                <div className="space-y-16">
                    {/* Main Product */}
                    <ProductCard {...sampleProduct} />

                    {/* Product Specifications Section */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden my-8">
                        <div className="px-6 py-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Product Specifications</h2>
                            <div className="w-20 h-1 bg-red-500 mb-6"></div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 font-medium text-gray-900 bg-gray-50 w-1/3">Sound Quality</td>
                                            <td className="py-3 px-4 text-gray-700">Hi-Fi Sound with 40mm dynamic drivers</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 font-medium text-gray-900 bg-gray-50">Battery Life</td>
                                            <td className="py-3 px-4 text-gray-700">Up to 30 hours playtime, 3 hours charging time</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 font-medium text-gray-900 bg-gray-50">Connectivity</td>
                                            <td className="py-3 px-4 text-gray-700">Bluetooth 5.2, 10m range</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 font-medium text-gray-900 bg-gray-50">Noise Cancellation</td>
                                            <td className="py-3 px-4 text-gray-700">Active Noise Cancellation (ANC) with ambient mode</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 font-medium text-gray-900 bg-gray-50">Weight</td>
                                            <td className="py-3 px-4 text-gray-700">280g</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 font-medium text-gray-900 bg-gray-50">Materials</td>
                                            <td className="py-3 px-4 text-gray-700">Premium memory foam ear cushions, aluminum frame</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 font-medium text-gray-900 bg-gray-50">Water Resistance</td>
                                            <td className="py-3 px-4 text-gray-700">IPX4 - Sweat and splash resistant</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-medium text-gray-900 bg-gray-50">Warranty</td>
                                            <td className="py-3 px-4 text-gray-700">2-year limited warranty</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Related Products Section */}
                    <div id="related" className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 -mx-4 px-4 md:px-8 lg:px-16">
                        <div className="container mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Related Products</h2>
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
                                {relatedProducts.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform hover:-translate-y-2 transition-transform duration-300">
                                            <div className="relative h-64 w-full">
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-5">
                                                <h3 className="text-lg font-semibold text-black mb-2">{product.title}</h3>
                                                <div className="flex items-center mb-3">
                                                    {renderStarRating(product.rating)}
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                                                        View Details
                                                        <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </main>

            {/* Product Details Section with Tabs */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-16">
                <div className="mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Product Details</h2>
                    <div className="w-16 sm:w-20 h-1 bg-red-500 mb-6 sm:mb-10"></div>

                    {/* Tab Controls */}
                    <div className="flex flex-wrap border-b border-gray-200 mb-6 sm:mb-8">
                        {['Benefits', 'How to Use', 'Reviews', 'FAQs'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm focus:outline-none transition-colors duration-200 mr-2 sm:mr-4
            ${activeTab === tab
                                        ? 'text-red-600 border-b-2 border-red-600 font-semibold'
                                        : 'text-gray-600 hover:text-gray-800'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
                        {/* Left Content */}
                        <div className="w-full md:w-1/2">
                            {/* Benefits Tab Content */}
                            {activeTab === 'Benefits' && (
                                <div className="space-y-4">
                                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Key Benefits</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm sm:text-base text-gray-800">Premium sound quality with deep bass and crystal clear highs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm sm:text-base text-gray-800">Active noise cancellation blocks out ambient noise</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm sm:text-base text-gray-800">30-hour battery life for all-day listening</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm sm:text-base text-gray-800">Comfortable ergonomic design with premium materials</span>
                                        </li>
                                    </ul>
                                    <p className="mt-4 text-sm sm:text-base text-gray-700">
                                        Experience audio like never before with our premium wireless headphones,
                                        designed for audiophiles and casual listeners alike.
                                    </p>
                                </div>
                            )}

                            {/* How to Use Tab Content */}
                            {activeTab === 'How to Use' && (
                                <div className="space-y-4">
                                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Getting Started</h3>
                                    <ol className="list-decimal pl-5 space-y-3 text-sm sm:text-base text-gray-800">
                                        <li className="pl-2">Charge your headphones for at least 2 hours before first use</li>
                                        <li className="pl-2">Power on by pressing and holding the power button for 3 seconds</li>
                                        <li className="pl-2">
                                            Once connected, you can control volume and playback using the touch
                                            controls on the right earcup
                                        </li>
                                        <li className="pl-2">
                                            Double tap the right earcup to toggle noise cancellation on/off
                                        </li>
                                    </ol>
                                    <div className="bg-blue-50 p-4 rounded-lg mt-6 border border-blue-100">
                                        <h4 className="font-medium text-blue-800">Pro Tip</h4>
                                        <p className="text-blue-700 text-sm">
                                            For the best sound experience, make sure the earcups are properly positioned
                                            over your ears to create a good seal.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Reviews Tab Content */}
                            {activeTab === 'Reviews' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Customer Reviews</h3>
                                    <div className="flex items-center mb-4">
                                        <div className="flex mr-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg key={star} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-lg font-medium text-gray-700">4.8 out of 5</span>
                                        <span className="text-sm text-gray-500 ml-2">(128 reviews)</span>
                                    </div>

                                    {/* Sample Review */}
                                    <div className="border-b pb-5">
                                        <div className="flex items-center mb-2">
                                            <div className="flex mr-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <h4 className="font-medium text-gray-700">Amazing Sound Quality</h4>
                                        </div>
                                        <p className="text-gray-700 text-sm mb-1">
                                            These headphones exceeded my expectations. The sound is crisp and the noise
                                            cancellation works perfectly for my daily commute.
                                        </p>
                                        <p className="text-gray-500 text-xs">By Michael T. - March 10, 5</p>
                                    </div>

                                    {/* Another Sample Review */}
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <div className="flex mr-2">
                                                {[1, 2, 3, 4].map((star) => (
                                                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-medium text-gray-700">Amazing Sound Quality</h4>
                                            <h4 className="font-medium ">Great but Battery Could Be Better</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-1">
                                            The sound quality is excellent, but the battery life is closer to 25 hours
                                            rather than the advertised 30 hours.
                                        </p>
                                        <p className="text-gray-500 text-xs">By Sarah L. - February 28, 2025</p>
                                    </div>
                                </div>
                            )}

                            {/* FAQs Tab Content */}
                            {activeTab === 'FAQs' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Frequently Asked Questions</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium text-lg text-gray-900">Are these headphones water-resistant?</h4>
                                            <p className="text-gray-600 mt-1">
                                                These headphones have an IPX4 rating, making them resistant to splashes and
                                                sweat, but they should not be submerged in water.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-lg text-gray-900">How do I reset my headphones?</h4>
                                            <p className="text-gray-600 mt-1">
                                                To reset your headphones, press and hold both the power button and volume up
                                                button for 10 seconds until the LED indicator flashes blue three times.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-lg text-gray-900">Can I connect to multiple devices?</h4>
                                            <p className="text-gray-600 mt-1">
                                                Yes, these headphones support multipoint connection, allowing you to connect
                                                to two devices simultaneously and switch audio between them.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-lg text-gray-900">How long is the warranty?</h4>
                                            <p className="text-gray-600 mt-1">
                                                These headphones come with a 2-year limited warranty that covers manufacturing
                                                defects but not damage from misuse or accidents.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Image */}
                        <div className="w-full md:w-1/2">
                            <div className="rounded-xl overflow-hidden shadow relative h-64 sm:h-80 md:h-96">
                                <Image
                                    src={activeTab === 'How to Use' ? '/assets/categories/cat2.png' :
                                        activeTab === 'Reviews' ? '/assets/categories/cat3.png' :
                                            activeTab === 'FAQs' ? '/assets/categories/cat1.png' :
                                                '/assets/categories/cat1.png'}
                                    alt={`${activeTab} illustration`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Other Products Section */}
            <div className="bg-white py-12">
                <div className="container mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Other Products</h2>
                        <div className="w-20 h-1 bg-red-500 mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="relative h-48">
                                    <Image
                                        src={`/assets/categories/cat${item}.png`}
                                        alt={`Product ${item}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Product Name {item}</h3>
                                    <p className="text-gray-600 text-sm">Short product description goes here.</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
                            View All Products
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">How to Use</h2>
                        <div className="w-20 h-1 bg-red-500 mx-auto mt-4"></div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                        <iframe width="800" height="450" src="https://www.youtube.com/embed/URxcEKx6uuA" title="New &#39;High IQ&#39; AI Model From China Just Shocked The World - ERNIE 4.5" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Watch our detailed guide on how to get the most out of your product
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductsPage;