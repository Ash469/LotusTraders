'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const deals = [
  {
    id: 1,
    name: 'One Bag Concrete Mixer',
    image: '/assets/DoD/landing_dod_1.jpg',
    link: '/products/1_bag_concrete_mixer',
  },
  {
    id: 2,
    name: 'Lift Cement Mixer',
    image: '/assets/DoD/landing_dod_2.png',
    link: '/products/lift_concrete_mixer',
  },
  {
    id: 3,
    name: 'Hydraulic Semi Automatic Brick Machine',
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

    const initialTimers = deals.reduce((acc, deal) => {
      acc[deal.id] = calculateTimeUntilMidnight();
      return acc;
    }, {} as { [key: number]: number });

    setTimers(initialTimers);

    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers };
        Object.keys(newTimers).forEach((key) => {
          if (newTimers[Number(key)] > 0) {
            newTimers[Number(key)] -= 1;
          }
          if (newTimers[Number(key)] === 0) {
            newTimers[Number(key)] = 86400; // Reset to 24 hours
          }
        });
        return newTimers;
      });
    }, 1000);

    const midnightCheck = setInterval(() => {
      const timeUntilMidnight = calculateTimeUntilMidnight();
      if (timeUntilMidnight === 86400) {
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
    <section className="py-24 relative overflow-hidden border-b border-theme-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-4">
              Deals of the Day
            </h2>
            <p className="text-lg text-theme-text-muted max-w-2xl">
              Limited-time industrial offers on our premium machinery. Secure your equipment today before the timer runs out.
            </p>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white dark:bg-slate-800 rounded-[12px] border border-theme-border overflow-hidden hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 group"
            >
              <div className="relative h-[300px] w-full bg-light dark:bg-slate-900/50 p-6">
                <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-[4px] z-10 shadow-sm">
                  Special Offer
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={deal.image}
                    alt={deal.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold mb-6 text-theme-text font-heading h-14 line-clamp-2">
                  {deal.name}
                </h3>

                {/* Timer Display */}
                <div className="flex items-center justify-between mb-8">
                  {(() => {
                    const time = formatTime(timers[deal.id] || 0).split(':');
                    return (
                      <>
                        <div className="flex flex-col items-center flex-1 bg-light dark:bg-slate-900 py-3 rounded-[8px] border border-theme-border">
                          <span className="text-2xl font-bold text-theme-text font-heading">{time[0]}</span>
                          <span className="text-[10px] text-theme-text-muted uppercase tracking-wider mt-1">Hours</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-300 dark:text-slate-700 px-2">:</span>
                        <div className="flex flex-col items-center flex-1 bg-light dark:bg-slate-900 py-3 rounded-[8px] border border-theme-border">
                          <span className="text-2xl font-bold text-theme-text font-heading">{time[1]}</span>
                          <span className="text-[10px] text-theme-text-muted uppercase tracking-wider mt-1">Mins</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-300 dark:text-slate-700 px-2">:</span>
                        <div className="flex flex-col items-center flex-1 bg-light dark:bg-slate-900 py-3 rounded-[8px] border border-theme-border">
                          <span className="text-2xl font-bold text-theme-text font-heading">{time[2]}</span>
                          <span className="text-[10px] text-theme-text-muted uppercase tracking-wider mt-1">Secs</span>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-theme-text">Available Stock</span>
                    <span className="text-sm font-bold text-accent">25% Left</span>
                  </div>
                  <div className="bg-light dark:bg-slate-900 h-2 rounded-full overflow-hidden border border-theme-border">
                    <div className="bg-accent h-full w-[75%] rounded-full"></div>
                  </div>
                </div>

                <Link
                  href={deal.link}
                  className="block w-full bg-primary dark:bg-slate-700 text-white text-center px-6 py-4 rounded-[8px] font-bold hover:bg-accent dark:hover:bg-accent transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Secure This Deal
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;