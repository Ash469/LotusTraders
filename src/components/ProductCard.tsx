import React, { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  description: string;
  mainImage: string;
  thumbnails: string[];
  rating?: number;
  reviews?: number;
  enquiries?: number;
  estimatedDelivery?: string;
}

const ProductCard = ({ 
  title, 
  description, 
  mainImage, 
  thumbnails,
  rating = 4.5,
  reviews = 128,
  enquiries = 45,
  estimatedDelivery = "3-5 business days",
}: ProductCardProps) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 px-0 md:px-16">
      {/* Left side - Images */}
      <div className="flex gap-2 md:gap-4 w-full md:w-3/5">
        {/* Thumbnail column */}
        <div className="flex flex-col gap-2 md:gap-3">
          {thumbnails.map((thumb, index) => (
            <div 
              key={index} 
              className={`w-16 md:w-20 h-16 md:h-20 border-2 rounded cursor-pointer transition-all duration-200 ${
                selectedImage === thumb ? 'border-blue-500' : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedImage(thumb)}
            >
              <Image
                src={thumb}
                alt={`${title} thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="object-contain w-full h-full rounded"
              />
            </div>
          ))}
        </div>
        {/* Main image */}
        <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-lg p-2 md:p-4">
          <div className="relative w-full h-[250px] md:h-[400px]">
            <Image
              src={selectedImage}
              alt={title}
              fill
              className="object-contain transition-opacity duration-300"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right side - Product details */}
      <div className="w-full md:w-2/5 space-y-4 md:space-y-6">
        {/* Title and Description */}
        <div className="space-y-2 md:space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Reviews and Enquiries */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          {/* Rating */}
          <div className="bg-gray-100 px-3 md:px-4 py-1.5 md:py-2 rounded-lg">
            <div className="flex items-center gap-1 md:gap-2">
              <span className="text-yellow-400 text-lg md:text-xl">★</span>
              <span className="text-gray-900 font-semibold text-base md:text-lg">{rating}</span>
            </div>
            <span className="text-xs md:text-sm text-gray-600">Rating</span>
          </div>

          {/* Reviews */}
          <div className="bg-gray-100 px-3 md:px-4 py-1.5 md:py-2 rounded-lg">
            <div className="text-gray-900 font-semibold text-base md:text-lg">{reviews}</div>
            <span className="text-xs md:text-sm text-gray-600">Reviews</span>
          </div>

          {/* Enquiries */}
          <div className="bg-gray-100 px-3 md:px-4 py-1.5 md:py-2 rounded-lg">
            <div className="text-gray-900 font-semibold text-base md:text-lg">{enquiries}</div>
            <span className="text-xs md:text-sm text-gray-600">Enquiries</span>
          </div>
        </div>

        {/* Delivery and Warranty */}
        <div className="space-y-2 md:space-y-3 bg-gray-100 p-3 md:p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm md:text-base text-gray-900 font-medium">
              Estimated Delivery: <span className="text-gray-700">{estimatedDelivery}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm md:text-base text-gray-900 font-medium">Warranty & Support</span>
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="flex items-center gap-3 md:gap-4">
          <span className="text-sm md:text-base text-gray-900 font-medium">Quantity:</span>
          <div className="flex items-center border-2 border-gray-300 rounded-lg">
            <button 
              className="px-3 md:px-4 py-1.5 md:py-2 border-r-2 border-gray-300 hover:bg-gray-100 text-gray-600 text-base md:text-lg font-medium"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>
            <span className="px-4 md:px-6 py-1.5 md:py-2 text-gray-900 font-semibold text-base md:text-lg min-w-[2.5rem] md:min-w-[3rem] text-center">
              {quantity}
            </span>
            <button 
              className="px-3 md:px-4 py-1.5 md:py-2 border-l-2 border-gray-300 hover:bg-gray-100 text-gray-600 text-base md:text-lg font-medium"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <button 
            onClick={() => window.location.href = '/enquiry'}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
            text-white py-3 md:py-4 px-4 md:px-6 rounded-lg font-semibold text-base md:text-lg shadow-md 
            transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
          >
            Ask for Price
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;