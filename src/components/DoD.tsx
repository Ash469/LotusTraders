'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';


const deals = [
  {
    id: 1,
    name: 'One Bag Concrete Mixer',
    description: 'Durable and efficient concrete mixer with a capacity of 10 cft Unmixed and 7 cft Mixed, designed for professional construction projects.',
    image: '/assets/DoD/landing_dod_1.jpg',
    link: '/products/1_bag_concrete_mixer',
  },
  {
    id: 2,
    name: 'Lift Cement Mixer',
    description: 'Compact and portable lift cement mixer with advanced lifting mechanism, perfect for efficient mixing and pouring in construction tasks.',
    image: '/assets/DoD/landing_dod_2.jpg',
    link: '/products/lift_concrete_mixer',
  },
  {
    id: 3,
    name: 'Hydraulic Semi Automatic Brick Machine',
    description: 'Efficient and reliable hydraulic semi-automatic brick machine designed for high-quality brick production in construction projects.',
    image: '/assets/DoD/landing_dod_3.jpg',
    link: '/products/hydraulic_semi_automatic_brick_making_machine_dhokla',
  },
];

const DealsOfTheDay = () => {
  // Initialize timers for each deal independently
  const [timers, setTimers] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    // Load saved timers from localStorage or initialize with 24 hours
    const savedTimers = deals.reduce((acc, deal) => {
      const savedTime = localStorage.getItem(`deal-${deal.id}-end-time`);
      if (savedTime) {
        const remainingTime = Math.max(0, Math.floor((Number(savedTime) - Date.now()) / 1000));
        acc[deal.id] = remainingTime;
      } else {
        acc[deal.id] = 86400; // 24 hours in seconds
        localStorage.setItem(`deal-${deal.id}-end-time`, String(Date.now() + 86400 * 1000));
      }
      return acc;
    }, {} as { [key: number]: number });

    setTimers(savedTimers);

    // Start the countdown for each deal
    const intervals = deals.map((deal) =>
      setInterval(() => {
        setTimers((prevTimers) => {
          const newTime = prevTimers[deal.id] > 0 ? prevTimers[deal.id] - 1 : 0;
          if (newTime === 0) {
            clearInterval(intervals[deal.id - 1]); // Stop the timer when it reaches 0
          }
          return { ...prevTimers, [deal.id]: newTime };
        });
      }, 1000)
    );

    // Cleanup intervals on unmount
    return () => intervals.forEach((interval) => clearInterval(interval));
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-800">
          Deals of the Day
        </h2>
        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
                <div className="relative h-48 sm:h-56 lg:h-64 border border-gray-500 rounded">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  width={300}
                  height={200}
                  className="absolute inset-0 w-full h-full object-fill rounded"
                />
                </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#ff6b00]">
                    {deal.name}
                    </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {deal.description}
                  </p>
                </div>
                <div className="mt-auto">
                    <a
                    href={deal.link}
                    className="w-full bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 text-sm sm:text-base text-center block"
                    >
                    Grab the Deal
                    </a>
                  <div className="mt-3 text-red-500 font-semibold text-sm sm:text-base text-center">
                    Time left: {formatTime(timers[deal.id] || 0)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;