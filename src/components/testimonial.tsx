'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TestimonialProps {
    name: string;
    role: string;
    content: string;
}

const testimonials: TestimonialProps[] = [
    {
        name: "Tenzin Dorjee",
        role: "Interior Designer, Sikkim",
        content: "The attention to detail in their machinery is exceptional. Their team was professional, responsive, and delivered the exact heavy equipment we needed on time.",
    },
    {
        name: "Lalremsiami Singh",
        role: "Contractor, Mizoram",
        content: "Lotus Traders completely transformed our operations. Their concrete mixers balance modern aesthetics with rugged performance. Our projects finish faster now.",
    },
    {
        name: "Bimal Gurung",
        role: "Builder, Darjeeling",
        content: "Working with this team was a game-changer for my business. The brick-making machines are incredibly efficient and reliable. Output has increased significantly.",
    },
    {
        name: "Thanglian Zou",
        role: "Project Manager, Manipur",
        content: "The heavy equipment exceeded all expectations. Their engineering team understood our site challenges and delivered machinery that simply works. Professional and punctual throughout.",
    },
];

const TestimonialCard = ({ name, role, content}: TestimonialProps) => (
    <div className="bg-theme-surface p-8 md:p-10 rounded-[16px] border border-theme-border shadow-sm hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 h-full flex flex-col justify-between">
        <div className="mb-8">
            {/* Quote Icon */}
            <div className="text-accent text-6xl font-serif leading-none mb-4">"</div>
            <p className="text-theme-text-muted text-lg leading-relaxed transition-colors duration-300">{content}</p>
        </div>
        <div className="flex items-center gap-4 pt-6 border-t border-theme-border">
            <div className="w-12 h-12 rounded-[12px] border border-gray-100 dark:border-slate-700 flex items-center justify-center text-theme-text font-bold text-xl shadow-sm">
                {name.charAt(0)}
            </div>
            <div>
                <h3 className="font-bold text-lg text-theme-text transition-colors duration-300">{name}</h3>
                <p className="text-theme-text-muted text-sm tracking-wide uppercase font-semibold transition-colors duration-300">{role}</p>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    return (
        <section className="py-24 overflow-hidden transition-colors duration-300 border-b border-theme-border">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-4 transition-colors duration-300">
                        Trusted by Professionals
                    </h2>
                    <p className="text-lg text-theme-text-muted max-w-2xl mx-auto transition-colors duration-300">
                        Hear from industry leaders who have scaled their operations with our machinery.
                    </p>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={32}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000 }}
                        loop={true}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        className="pb-16"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index} className="h-auto">
                                <TestimonialCard {...testimonial} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;