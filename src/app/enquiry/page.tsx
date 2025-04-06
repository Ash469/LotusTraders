"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/components/nav_bar';
import Footer from '@/components/footer';
import { useSearchParams } from 'next/navigation';

const inputStyles = "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-sm";

interface ProductDetails {
    id: string;
    name: string;
    image: string;
    quantity?: number;
}

// Component that uses useSearchParams must be wrapped in Suspense
function EnquiryForm() {
    const searchParams = useSearchParams();
    
    // Add debugging logs
    console.log("Search params:", {
        productId: searchParams.get('productId'),
        productName: searchParams.get('productName'),
        productImage: searchParams.get('productImage'),
        quantity: searchParams.get('quantity')
    });
    
    // Initialize all state hooks at the top - before any conditional returns
    const [productDetails, setProductDetails] = useState<ProductDetails>({
        id: '',
        name: '',
        image: '',
        quantity: 1
    });

    // Initialize formData with default values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        quantity: 1
    });

    // Use effect to get product details - MUST be called before any conditional returns
    useEffect(() => {
        if (searchParams) {
            const productId = searchParams.get('productId');
            const quantityParam = searchParams.get('quantity');
            const parsedQuantity = quantityParam ? parseInt(quantityParam, 10) : 1;
            
            if (productId) {
                console.log("Setting product details from URL params:", productId, "quantity:", parsedQuantity);
                
                // Update product details
                setProductDetails({
                    id: productId,
                    name: searchParams.get('productName') || '',
                    image: searchParams.get('productImage') || '',
                    quantity: parsedQuantity
                });
                
                // Also update the form data with the quantity
                setFormData(prevFormData => ({
                    ...prevFormData,
                    quantity: parsedQuantity
                }));
            }
        }
    }, [searchParams]);

    // Fix the conditional check - only show "No product" if we're sure there's no product
    // Wait for one render cycle to ensure useEffect has a chance to run
    const [hasCheckedParams, setHasCheckedParams] = useState(false);
    
    useEffect(() => {
        // Mark that we've checked params after the first render
        setHasCheckedParams(true);
    }, []);

    // Only show the "no product" message if we've checked params and still don't have an ID
    if (hasCheckedParams && !productDetails.id && !searchParams.get('productId')) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        No Product Selected
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Please select a product first to make an enquiry.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    // Handle quantity change
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 1;
        setFormData({
            ...formData,
            quantity: Math.max(1, value) // Ensure quantity is at least 1
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!productDetails.id) {
            alert('No product selected. Please select a product first.');
            return;
        }

        try {
            // Show loading state
            const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<span>Submitting...</span>';
            }

            const enquiryData = {
                ...formData,
                product: {
                    id: productDetails.id,
                    name: productDetails.name,
                    image: productDetails.image,
                    quantity: formData.quantity
                }
            };

            const response = await fetch('/api/enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(enquiryData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || 'Failed to submit enquiry');
            }

            // Clear the form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                company: '',
                phone: '',
                message: '',
                quantity: 1
            });
            
            alert('Enquiry submitted successfully!');
            
        } catch (error) {
            console.error('Error submitting enquiry:', error);
            const errorMessage = error instanceof Error 
                ? error.message
                : 'Failed to submit enquiry. Please try again later.';
            alert(errorMessage);
        } finally {
            // Reset button state
            const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Submit Enquiry</span>';
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />

            {/* Enquiry Form Section */}
            <div className="bg-gradient-to-br mt-16 from-gray-50 to-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
                        Product Enquiry for {productDetails.name}
                    </h1>
                    
                    {/* Product form section */}
                    <div className="flex flex-col md:flex-row gap-6 items-stretch bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Product Details Section */}
                        <div className="w-full md:w-1/2 relative h-[250px] md:h-auto md:aspect-[16/12] overflow-hidden">
                            <div className="absolute inset-3 rounded-xl overflow-hidden">
                                {productDetails.image ? (
                                    <Image
                                        src={productDetails.image}
                                        alt={productDetails.name}
                                        fill
                                        className="object-contain hover:scale-105 transition-transform duration-300"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-100">
                                        <span className="text-gray-400">No image available</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="w-full md:w-3/5 p-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* ...existing code... */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter first name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={inputStyles}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={inputStyles}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={inputStyles}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={inputStyles}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                                            Quantity <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            min="1"
                                            value={formData.quantity}
                                            onChange={handleQuantityChange}
                                            className={inputStyles}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="company" className="text-sm font-medium text-gray-700">
                                        Company Name
                                    </label>
                                    <input
                                        id="company"
                                        type="text"
                                        name="company"
                                        placeholder="Enter company name (optional)"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className={inputStyles}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Enter your message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className={inputStyles}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200 text-sm flex items-center justify-center space-x-2"
                                >
                                    <span>Submit Enquiry</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

// Loading fallback for Suspense
function LoadingForm() {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading form...</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

// Main component with Suspense
const EnquiryPage = () => {
    return (
        <Suspense fallback={<LoadingForm />}>
            <EnquiryForm />
        </Suspense>
    );
};

export default EnquiryPage;