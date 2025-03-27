'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/models/Product';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import LoadingState from './LoadingState';

const ProductPage = () => {
    const params = useParams();
    const productId = params?.product as string || '';
    
    const [product, setProduct] = useState<Product | null>(null);
    const [activeTab, setActiveTab] = useState('Benefits');
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [otherProducts, setOtherProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch main product data
                const res = await fetch(`/api/products/${productId}`);
                if (!res.ok) throw new Error('Failed to fetch product data');
                const data = await res.json();
                setProduct(data);

                // Fetch related products
                if (data.RelatedProducts && data.RelatedProducts.length > 0) {
                    const relatedProductPromises = data.RelatedProducts.map(async (id: number) => {
                        const relatedRes = await fetch(`/api/products/${id}`);
                        if (relatedRes.ok) {
                            return await relatedRes.json();
                        }
                        return null;
                    });
                    const relatedResults = await Promise.all(relatedProductPromises);
                    setRelatedProducts(relatedResults.filter(Boolean));
                }

                // Fetch other products
                if (data.Other_products && data.Other_products.length > 0) {
                    const otherProductPromises = data.Other_products.map(async (id: number) => {
                        const otherRes = await fetch(`/api/products/${id}`);
                        if (otherRes.ok) {
                            return await otherRes.json();
                        }
                        return null;
                    });
                    const otherResults = await Promise.all(otherProductPromises);
                    setOtherProducts(otherResults.filter(Boolean));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchData();
        }
    }, [productId]);

    const renderStarRating = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        if (hasHalfStar) {
            stars.push(
                <svg key="half-star" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="half-gradient">
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="#D1D5DB" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        while (stars.length < 5) {
            stars.push(
                <svg key={`empty-${stars.length}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        return (
            <div className="flex items-center space-x-1">
                {stars}
                <span className="ml-2 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
            </div>
        );
    };

    if (loading || !product) {
        return <LoadingState />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="sticky top-0 z-30 bg-white shadow-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-3">
                        {/* Logo Image */}
                        <div className="flex-shrink-0">
                            <Image
                                src="/assets/images/logo.png"
                                alt="Lotus Logo"
                                width={200}
                                height={60}
                                className="object-contain h-8 md:h-12 w-auto"
                            />
                        </div>

                        {/* Navigation Buttons - Desktop */}
                        <div className="hidden md:flex space-x-4 lg:space-x-6 flex-grow justify-center">
                            <Link
                                href="/"
                                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all bg-blue-600 text-white"
                            >
                                Home
                            </Link>
                            <a
                                href="#products"
                                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
                            >
                                Our Products
                            </a>
                            <a
                                href="#trending"
                                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
                            >
                                Trending
                            </a>
                            <a
                                href="#new-releases"
                                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
                            >
                                New Releases
                            </a>
                            <a
                                href="#deals"
                                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
                            >
                                Deals of the Day
                            </a>
                            <Link
                                href="/enquiry"
                                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all bg-red-600 text-white"
                            >
                                Enquiry
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <main className="container mx-auto px-4 pt-24">
                {/* Breadcrumb Navigation */}

                <div className="space-y-16">
                    {/* Main Product */}
                    <ProductCard
                        title={product.name}
                        description={product.Description}
                        mainImage={product.HeroImages[0]}
                        thumbnails={product.HeroImages}
                        rating={product.rating}
                    />

                    {/* Product Specifications Section */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="px-6 py-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold text-gray-900">Product Specifications</h2>
                                <div className="w-20 h-1 bg-red-500"></div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <tbody>
                                        {Object.entries(product.Specification).map(([key, value]) => (
                                            <tr key={key} className="border-b hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50 w-1/3">
                                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                </td>
                                                <td className="py-4 px-6 text-gray-700">
                                                    {Array.isArray(value) ? value.join(', ') : value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Related Products Section */}
                    <div id="related" className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
                        <div className="container mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">Related Products</h2>
                                    <p className="text-gray-600 mt-2">Products you might also like</p>
                                </div>
                                <div className="w-20 h-1 bg-red-500 mt-4"></div>
                            </div>

                            {relatedProducts.length > 0 ? (
                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    navigation
                                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                                    loop={relatedProducts.length > 3}
                                    slidesPerView={1}
                                    spaceBetween={24}
                                    breakpoints={{
                                        640: { slidesPerView: 2 },
                                        768: { slidesPerView: 3 },
                                        1024: { slidesPerView: 4 },
                                    }}
                                    className="py-4"
                                >
                                    {relatedProducts.map((relatedProduct) => (
                                        <SwiperSlide key={relatedProduct.id}>
                                            <Link href={`/products/${relatedProduct.id}`} className="block h-full">
                                                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col transition-all hover:shadow-xl hover:-translate-y-1">
                                                    <div className="relative h-64 w-full">
                                                        <Image
                                                            src={relatedProduct.HeroImages[0]}
                                                            alt={relatedProduct.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        />
                                                        {relatedProduct.discount_price && (
                                                            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                                SALE
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="p-5 flex-grow">
                                                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                                                        {renderStarRating(relatedProduct.rating)}
                                                        <div className="mt-4 flex justify-between items-center">
                                                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                                                View Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No related products found</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <section className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="flex flex-wrap border-b border-gray-200">
                            {['Benefits', 'How to Use', 'Reviews', 'FAQs'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 font-medium text-sm sm:text-base transition-colors ${activeTab === tab
                                        ? 'text-red-600 border-b-2 border-red-600 font-semibold'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="p-6 md:p-8">
                            {activeTab === 'Benefits' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-gray-900">Key Benefits</h3>
                                    <ul className="space-y-4">
                                        {product.Details.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'How to Use' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-gray-900">How to Use</h3>
                                    <div className="prose max-w-none text-gray-700">
                                        <p>{product.Details.how_to_use}</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Reviews' && (
                                <div className="space-y-8">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <h3 className="text-2xl font-semibold text-gray-900">Customer Reviews</h3>
                                        <div className="flex items-center mt-4 sm:mt-0">
                                            {renderStarRating(product.rating)}
                                            <span className="ml-2 text-gray-600">{product.Details.Reviews.length} reviews</span>
                                        </div>
                                    </div>

                                    {product.Details.Reviews.length > 0 ? (
                                        <div className="space-y-6 divide-y divide-gray-200">
                                            {product.Details.Reviews.map((review, index) => (
                                                <div key={index} className="pt-6 first:pt-0">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center">
                                                            {renderStarRating(review.rating)}
                                                            <span className="ml-3 font-medium text-gray-900">{review.user}</span>
                                                        </div>
                                                        <span className="text-sm text-gray-500">{review.date}</span>
                                                    </div>
                                                    <p className="text-gray-700 mt-2">{review.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">No reviews yet</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'FAQs' && (
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h3>
                                    <div className="space-y-6 divide-y divide-gray-200">
                                        {product.Details.faqs.map((faq, index) => (
                                            <div key={index} className="pt-6 first:pt-0">
                                                <h4 className="font-medium text-lg text-gray-900">{faq.question}</h4>
                                                <p className="mt-2 text-gray-700">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Other Products Section */}
                    <div className="bg-white py-12">
                        <div className="container mx-auto">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900">You May Also Like</h2>
                                <div className="w-20 h-1 bg-red-500 mx-auto mt-4"></div>
                            </div>

                            {otherProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {otherProducts.map((otherProduct) => (
                                        <Link href={`/products/${otherProduct.id}`} key={otherProduct.id}>
                                            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                                                <div className="relative h-56 w-full">
                                                    <Image
                                                        src={otherProduct.HeroImages[0]}
                                                        alt={otherProduct.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                    {otherProduct.discount_price && (
                                                        <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                            SALE
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-5 flex-grow">
                                                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{otherProduct.name}</h3>
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{otherProduct.Description}</p>
                                                    <div className="mt-auto flex justify-between items-center">
                                                        <span className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                                            View Details →
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No other products to display</p>
                                </div>
                            )}
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
                                <iframe width="800" height="450" src={product.YoutubeLink} title="New &#39;High IQ&#39; AI Model From China Just Shocked The World - ERNIE 4.5" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Watch our detailed guide on how to get the most out of your product
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductPage;