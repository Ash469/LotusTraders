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
import ProductNotFound from './NotFound';

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
                if (!res.ok) throw new Error(`Failed to fetch product data: ${res.statusText}`);
                const data = await res.json();
                setProduct(data);

                // Fetch related products with better error handling
                if (Array.isArray(data.relatedProducts) && data.relatedProducts.length > 0) {
                    console.log('Fetching related products:', data.relatedProducts);
                    const relatedProductPromises = data.relatedProducts.map(async (id: string) => {
                        try {
                            const relatedRes = await fetch(`/api/products/${id}`);
                            if (!relatedRes.ok) {
                                console.warn(`Failed to fetch related product ${id}: ${relatedRes.statusText}`);
                                return null;
                            }
                            const relatedData = await relatedRes.json();
                            return relatedData;
                        } catch (error) {
                            console.error(`Error fetching related product ${id}:`, error);
                            return null;
                        }
                    });
                    const relatedResults = await Promise.all(relatedProductPromises);
                    const validRelatedProducts = relatedResults.filter(Boolean);
                    console.log('Loaded related products:', validRelatedProducts.length);
                    setRelatedProducts(validRelatedProducts);
                } else {
                    console.log('No related products found in data');
                }

                // Fetch other products with better error handling
                if (Array.isArray(data.other_products) && data.other_products.length > 0) {
                    console.log('Fetching other products:', data.other_products);
                    const otherProductPromises = data.other_products.map(async (id: string) => {
                        try {
                            const otherRes = await fetch(`/api/products/${id}`);
                            if (!otherRes.ok) {
                                console.warn(`Failed to fetch other product ${id}: ${otherRes.statusText}`);
                                return null;
                            }
                            const otherData = await otherRes.json();
                            return otherData;
                        } catch (error) {
                            console.error(`Error fetching other product ${id}:`, error);
                            return null;
                        }
                    });
                    const otherResults = await Promise.all(otherProductPromises);
                    const validOtherProducts = otherResults.filter(Boolean);
                    console.log('Loaded other products:', validOtherProducts.length);
                    setOtherProducts(validOtherProducts);
                } else {
                    console.log('No other products found in data');
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

    if (loading) {
        return <LoadingState />;
    } else if (!product) {
        return (
            <ProductNotFound />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
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
                                href={`/products/${productId}`}
                                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all bg-blue-600 text-white"
                            >
                                Home
                            </Link>
                            <button
                                onClick={() => document.getElementById('specification')?.scrollIntoView({ behavior: 'smooth' })}
                                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
                            >
                                Specification
                            </button>
                            <button
                                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
                            >
                                Products
                            </button>
                            <button
                                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
                            >
                                Details
                            </button>
                            <button
                                onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
                                className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-800 hover:bg-gray-100"
                            >
                                How To Use
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
            <main className="container mx-auto px-4 pt-24">
                {/* Breadcrumb Navigation */}

                <div className="space-y-16">
                    {/* Main Product */}
                    <ProductCard
                        title={product.name}
                        description={product.description}
                        mainImage={product.heroImages?.[0]}
                        thumbnails={product.heroImages || []}
                        rating={product.rating}
                        id={product.id.toString()}
                    />


                    {/* Product Specifications Section */}
                    <section id="specification" className="bg-gray-50 py-12 md:py-16">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="px-6 py-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-gray-900">Product Specifications</h2>
                                    <div className="w-20 h-1 bg-red-500"></div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <tbody>
                                            {product.specification && Object.entries(product.specification).map(([key, value]) => (
                                                <tr key={key} className="border-b hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50 w-1/3">
                                                        {key}
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
                    </section>

                    <section id='products'>
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
                                                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 group relative">
                                                    <div className="relative h-64 w-full">
                                                        <Image
                                                            src={relatedProduct.heroImages?.[0]}
                                                            alt={relatedProduct.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        />

                                                    </div>
                                                    <div className="p-5 flex-grow">
                                                        <h3 className="text-lg font-semibold text-black line-clamp-2 mb-2">{relatedProduct.name}</h3>
                                                        <div className="flex items-center justify-between mt-4">
                                                            <div className="w-full space-y-4">
                                                                {/* Rating shown by default, hidden on hover */}
                                                                <div className="group-hover:hidden">
                                                                    {renderStarRating(relatedProduct.rating)}
                                                                </div>
                                                                {/* Buttons shown on hover */}
                                                                <div className="hidden group-hover:flex justify-between items-center w-full">
                                                                    <Link
                                                                        href={{
                                                                            pathname: '/enquiry',
                                                                            query: {
                                                                                productId: relatedProduct.id,
                                                                                productName: relatedProduct.name,
                                                                                productImage: relatedProduct.heroImages && relatedProduct.heroImages.length > 0
                                                                                    ? relatedProduct.heroImages[0]
                                                                                    : '',
                                                                                quantity: 1
                                                                            }
                                                                        }}
                                                                        className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                                                                    >
                                                                        Enquiry
                                                                    </Link>
                                                                    <Link href={`/products/${relatedProduct.id}`} className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-900 transition">
                                                                        details
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                    </section>


                    {/* Product details Tabs */}
                    <section id='details' className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="flex flex-wrap border-b border-gray-200">
                            {['Benefits', 'How to Use', 'reviews', 'FAQs'].map((tab) => (
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
                                        {product.details?.benefits ? (
                                            product.details.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start">
                                                    <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-gray-700">{benefit}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-500">No benefits information available</li>
                                        )}
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'How to Use' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-gray-900">How to Use</h3>
                                    <div className="prose max-w-none text-gray-700">
                                        <p>{product.details?.how_to_use || 'No usage information available'}</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-8">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <h3 className="text-2xl font-semibold text-gray-900">Customer reviews</h3>
                                        <div className="flex items-center mt-4 sm:mt-0">
                                            {renderStarRating(product.rating)}
                                            <span className="ml-2 text-gray-600">
                                                {product.details?.reviews?.length || 0} reviews
                                            </span>
                                        </div>
                                    </div>

                                    {product.details?.reviews?.length > 0 ? (
                                        <div className="space-y-6 divide-y divide-gray-200">
                                            {product.details.reviews.map((review, index) => (
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
                                    <div className="space-y-4">
                                        {product.details?.faqs?.length > 0 ? (
                                            product.details.faqs.map((faq, index) => (
                                                <details
                                                    key={index}
                                                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden"
                                                >
                                                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                                                        <h4 className="font-medium text-lg text-black">{faq.question}</h4>
                                                        <svg
                                                            className="w-5 h-5 text-gray-500 transition-transform duration-200 group-open:rotate-180"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 9l-7 7-7-7"
                                                            />
                                                        </svg>
                                                    </summary>
                                                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                                                        <p className="text-gray-700">{faq.answer}</p>
                                                    </div>
                                                </details>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No FAQs available</p>
                                        )}
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
                                                        src={otherProduct.heroImages?.[0]}
                                                        alt={otherProduct.name}
                                                        fill
                                                        className="object-contain"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />

                                                </div>
                                                <div className="p-5 flex-grow">
                                                    <h3 className="text-lg font-semibold text-black  mb-2 line-clamp-2">{otherProduct.name}</h3>
                                                    <p className=" text-sm text-gray-800 mb-4 line-clamp-3">{otherProduct.description}</p>
                                                    <div className="mt-auto flex justify-between items-center">
                                                        <span className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                                            View details →
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
                <div id='video' className="bg-gray-50 py-12">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">How to Use</h2>
                            <div className="w-20 h-1 bg-red-500 mx-auto mt-4"></div>
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                                <iframe
                                    width="800"
                                    height="450"
                                    src={`https://www.youtube.com/embed/${product.youtubeLink.split('v=')[1]}`}
                                    title="Product Demo Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
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