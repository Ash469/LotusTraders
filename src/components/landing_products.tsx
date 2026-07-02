'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
}

interface Category {
  _id: string;
  id: string;
  name: string;
  products?: Product[];
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsFromCategories = async () => {
      try {
        const categoryResponse = await fetch('/api/categories');
        const categories: Category[] = await categoryResponse.json();

        let allProducts: Product[] = [];
        categories.forEach(category => {
          if (category.products && category.products.length > 0) {
            // Limit products per category to 3 to keep the homepage concise
            allProducts = [...allProducts, ...category.products.slice(0, 2)];
          }
        });
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromCategories();
  }, []);

  if (loading || !products.length) return null;

  return (
    <section className="py-24 overflow-hidden transition-colors duration-300 border-b border-theme-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col md:flex-row justify-between items-end"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-4 transition-colors duration-300">Featured Machinery</h2>
            <p className="text-lg text-theme-text-muted max-w-2xl transition-colors duration-300">
              Precision-engineered tools built for heavy-duty construction. Explore our full range of premium equipment.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group bg-theme-surface rounded-[16px] p-6 shadow-sm hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-500 border border-theme-border hover:border-gray-200 dark:hover:border-slate-600 transform hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="relative w-full aspect-[4/3] mb-6 rounded-[8px] p-4 flex items-center justify-center overflow-hidden border border-theme-border">
                  <Image 
                    src={product.image || '/assets/categories/brick_making_machine_1.png'} 
                    alt={product.name} 
                    fill
                    className="object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-theme-text font-heading mb-2 line-clamp-2 min-h-[56px] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted dark:text-gray-400 mb-6 uppercase tracking-wider font-semibold">Industrial Grade</p>
                  </div>
                  <div className="flex flex-col gap-3 mt-auto">
                    <Link 
                      href={`/products/${product.id}`}
                      className="w-full py-3 px-4 bg-transparent border-2 border-primary dark:border-slate-600 text-theme-text text-center font-bold rounded-[8px] hover:bg-primary dark:hover:bg-slate-700 hover:text-white transition-colors duration-300"
                    >
                      View Details
                    </Link>
                    <Link 
                      href="/contact"
                      className="w-full py-3 px-4 bg-accent text-white text-center font-bold rounded-[8px] hover:bg-amber-600 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
