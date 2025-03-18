'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { categories } from '../../../components/Categories';
import Link from 'next/link';

const CategoryPage = () => {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;

  const categoryData = categories.find(cat => 
    cat.name.toLowerCase().replace(/\s+/g, '_') === category
  );

  if (!categoryData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
        <div className="mb-8">
          <Image 
            src="/not-found.png" 
            alt="Category not found" 
            width={250} 
            height={250}
            className="mx-auto opacity-80"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Oops! Category Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          We couldn&apos;t find the category you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => router.back()} 
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
          >
            Go Back
          </button>
          <Link href="/" 
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>{categoryData.name}</h1>
      <p>{categoryData.description}</p>
      <Image 
        src={categoryData.image} 
        alt={categoryData.name} 
        width={500} 
        height={300} 
      />
    </div>
  );
};

export default CategoryPage;
