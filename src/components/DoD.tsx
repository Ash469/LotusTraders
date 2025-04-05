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
    image: '/assets/DoD/landing_dod_2.png',
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
  const [timers, setTimers] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      return Math.floor((midnight.getTime() - now.getTime()) / 1000);
    };

    // Initialize timers for all deals with the same time until midnight
    const initialTimers = deals.reduce((acc, deal) => {
      acc[deal.id] = calculateTimeUntilMidnight();
      return acc;
    }, {} as { [key: number]: number });

    setTimers(initialTimers);

    // Update timers every second
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers };
        Object.keys(newTimers).forEach((key) => {
          if (newTimers[Number(key)] > 0) {
            newTimers[Number(key)] -= 1;
          }
          // Reset timer at midnight
          if (newTimers[Number(key)] === 0) {
            newTimers[Number(key)] = 86400; // Reset to 24 hours
          }
        });
        return newTimers;
      });
    }, 1000);

    // Check for midnight reset
    const midnightCheck = setInterval(() => {
      const timeUntilMidnight = calculateTimeUntilMidnight();
      if (timeUntilMidnight === 86400) {
        // Reset all timers at midnight
        setTimers((prevTimers) => {
          const newTimers = { ...prevTimers };
          Object.keys(newTimers).forEach((key) => {
            newTimers[Number(key)] = 86400;
          });
          return newTimers;
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(midnightCheck);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white opacity-10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            Deals of the Day
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto mb-8">
            Don&apos;t miss out on these amazing offers. Limited stock available!
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl"
            >
              <div className="relative h-72 sm:h-80 lg:h-96"> {/* Increased height */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-bl-lg font-bold z-10">
                  SPECIAL OFFER
                </div>
                <div 
                  className="relative h-full w-full"
                  style={{
                    background: `rgb(232, 209, 209) url('/assets/categories/categories-bg.png')`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    // padding: '12px',
                  }}
                >
                  <Image
                    src={deal.image}
                    alt={deal.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {deal.name}
                </h3>
                {/* <p className="text-gray-600 mb-4">
                  {deal.description}
                </p> */}

                {/* Updated Timer Display */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  {(() => {
                    const time = formatTime(timers[deal.id] || 0).split(':');
                    return (
                      <>
                        <div className="flex flex-col items-center bg-gray-100 px-3 py-2 rounded-lg w-20">
                          <span className="text-2xl font-bold text-gray-800">{time[0]}</span>
                          <span className="text-xs text-gray-600">Hours</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-800">:</span>
                        <div className="flex flex-col items-center bg-gray-100 px-3 py-2 rounded-lg w-20">
                          <span className="text-2xl font-bold text-gray-800">{time[1]}</span>
                          <span className="text-xs text-gray-600">Minutes</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-800">:</span>
                        <div className="flex flex-col items-center bg-gray-100 px-3 py-2 rounded-lg w-20">
                          <span className="text-2xl font-bold text-gray-800">{time[2]}</span>
                          <span className="text-xs text-gray-600">Seconds</span>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Progress bar */}
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-gray-100 h-2 rounded-full flex-grow mr-4">
                    <div className="bg-red-500 h-2 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-sm font-medium text-red-600">75% sold</span>
                </div>

                <a
                  href={deal.link}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center"
                >
                  Grab the Deal
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;