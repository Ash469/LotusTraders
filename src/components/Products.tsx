'use client';

import React from 'react';
import Image from 'next/image';
import './Products.css';

const products = [
  { id: 1, name: 'Concrete Mixer', image: '/assets/images/cat1.png', description: 'Efficiently blends and mixes cement, sand, and water to create uniform concrete.' },
  { id: 2, name: 'Brick Machines', image: '/assets/images/cat1.png', description: 'Combines manual and automated processes for enhanced efficiency and productivity' },
  { id: 3, name: 'Trimix Systems', image: '/assets/images/cat1.png', description: 'Ensures precise material binding for perfect quality, consistency, and controlled preparation' },
  { id: 4, name: 'Lab Equipments', image: '/assets/images/cat1.png', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 5, name: 'Concrete Mixer', image: '/assets/images/cat1.png', description: 'Efficiently blends and mixes cement, sand, and water to create uniform concrete.' },
  { id: 6, name: 'Brick Machines', image: '/assets/images/cat1.png', description: 'Combines manual and automated processes for enhanced efficiency and productivity' },
  { id: 7, name: 'Trimix Systems', image: '/assets/images/cat1.png', description: 'Ensures precise material binding for perfect quality, consistency, and controlled preparation' },
  { id: 8, name: 'Lab Equipments', image: '/assets/images/cat1.png', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 9, name: 'Lab Equipments', image: '/assets/images/cat1.png', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 10, name: 'Lab Equipments', image: '/assets/images/cat1.png', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 11, name: 'Lab Equipments', image: '/assets/images/cat1.png', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 12, name: 'Lab Equipments', image: '/assets/images/cat1.png', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  // Add more products as needed
];

const Products = () => {
  return (
    <div>
      <h2 className="products-title">Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="relative w-full h-[80%]">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16.66vw"
                className="product-image"
                priority
              />
            </div>
            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
