'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Products.css'; // Import the CSS file

const products = [
  { id: 1, name: 'Concrete Mixer', image: 'assets/images/cat1.png', description: 'Efficiently blends and mixes cement, sand, and water to create uniform concrete.' },
  { id: 2, name: 'Brick Machines', image: 'path/to/toys.jpg', description: 'Combines manual and automated processes for enhanced efficiency and productivity' },
  { id: 3, name: 'Trimix Systems', image: 'path/to/beauty.jpg', description: 'Ensures precise material binding for perfect quality, consistency, and controlled preparation' },
  { id: 4, name: 'Lab Equipments', image: 'path/to/automotive.jpg', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 5, name: 'Concrete Mixer', image: 'path/to/books.jpg', description: 'Efficiently blends and mixes cement, sand, and water to create uniform concrete.' },
  { id: 6, name: 'Brick Machines', image: 'path/to/toys.jpg', description: 'Combines manual and automated processes for enhanced efficiency and productivity' },
  { id: 7, name: 'Trimix Systems', image: 'path/to/beauty.jpg', description: 'Ensures precise material binding for perfect quality, consistency, and controlled preparation' },
  { id: 8, name: 'Lab Equipments', image: 'path/to/automotive.jpg', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 9, name: 'Lab Equipments', image: 'path/to/automotive.jpg', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 10, name: 'Lab Equipments', image: 'path/to/automotive.jpg', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 11, name: 'Lab Equipments', image: 'path/to/automotive.jpg', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 12, name: 'Lab Equipments', image: 'path/to/automotive.jpg', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  // Add more products as needed
];

const Products = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (!card) return;

      const description = card.querySelector('.product-description');
      if (!description) return;

      // Reset initial state
      gsap.set(description, {
        y: '100%',
        opacity: 0
      });

      // Create hover animation
      card.addEventListener('mouseenter', () => {
        gsap.to(description, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(description, {
          y: '100%',
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        });
      });
    });
  }, []);

  return (
    <div>
      <h2 className="products-title">Products</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="product-card"
            ref={(el) => { cardRefs.current[index] = el }}
          >
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-description">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
