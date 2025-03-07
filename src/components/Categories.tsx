'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Categories.css'; // Import the CSS file

const categories = [
  { id: 1, name: 'Concrete Mixer', image: 'assets/cateogries/cat1.png', description: 'Efficiently blends and mixes cement, sand, and water to create uniform concrete.' },
  { id: 2, name: 'Modules', image: 'assets/cateogries/cat2.png', description: 'Combines manual and automated processes for enhanced efficiency' },
  { id: 3, name: 'Testing Equipment', image: 'assets/cateogries/cat3.png', description: 'Ensures precise material binding for perfect quality, consistency, and controlled preparation' },
  { id: 4, name: 'Brick Maker', image: 'assets/cateogries/cat4.png', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 5, name: 'Bar Bender & Cutter', image: 'assets/cateogries/cat5.png', description: 'Efficiently blends and mixes cement, sand, and water to create uniform concrete.' },
  { id: 6, name: 'Vibrator', image: 'assets/cateogries/cat6.png', description: 'Combines manual and automated processes for enhanced efficiency' },
  { id: 7, name: 'Trimix', image: 'assets/cateogries/cat7.png', description: 'Ensures precise material binding for perfect quality, consistency, and controlled preparation' },
  { id: 8, name: 'Trolley', image: 'assets/cateogries/cat8.png', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  // Add more categories as needed
];

const Categories = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (!card) return;

      const description = card.querySelector('.category-description');
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
      <h2 className="categories-title">Categories</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="category-card"
            ref={(el) => { cardRefs.current[index] = el }}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <div className="category-content">
              <h3 className="category-name">{category.name}</h3>
              <div className="category-description">
                <p>{category.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;