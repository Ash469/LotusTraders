'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TestimonialProps {
    name: string;
    role: string;
    content: string;
    image: string;
}

interface VideoStoryProps {
    id: number;
    url: string;
    thumbnail: string;
}

const testimonials: TestimonialProps[] = [
    {
        name: "Sarah Johnson",
        role: "Interior Designer, New York",
        content: "The attention to detail in their work is exceptional. They perfectly captured the essence of what we wanted for our space. Their team was professional, responsive, and delivered on time.",
        image: "/testimonials/sarah-johnson.jpg"
    },
    {
        name: "Michael Chen",
        role: "Restaurant Owner, San Francisco",
        content: "Transformed our restaurant completely! The design perfectly balances modern aesthetics with comfort. Our customers constantly compliment the new look.",
        image: "/testimonials/michael-chen.jpg"
    },
    {
        name: "Emma Thompson",
        role: "Boutique Owner, London",
        content: "Working with this team was a game-changer for my boutique. They created an inviting atmosphere that truly resonates with our brand identity. Sales have increased significantly since the redesign.",
        image: "/testimonials/emma-thompson.jpg"
    },
    {
        name: "David Martinez",
        role: "Hotel Manager, Miami",
        content: "The renovation of our hotel lobby exceeded all expectations. Their team understood our vision and delivered a space that our guests absolutely love. Professional and punctual throughout.",
        image: "/testimonials/david-martinez.jpg"
    },
    {
        name: "Lisa Anderson",
        role: "Art Gallery Director, Chicago",
        content: "Their innovative approach to lighting and space utilization has transformed our gallery. They created the perfect environment for showcasing art while maintaining a welcoming atmosphere.",
        image: "/testimonials/lisa-anderson.jpg"
    },
    {
        name: "James Wilson",
        role: "Corporate Office Manager, Seattle",
        content: "The office redesign has significantly improved our team's productivity and morale. They created a perfect balance between functionality and aesthetic appeal.",
        image: "/testimonials/james-wilson.jpg"
    },
    // Add more testimonials as needed
];

const videos: VideoStoryProps[] = [
    {
        id: 1,
        url: "/videos/story1.mp4",
        thumbnail: "/thumbnails/story1.jpg"
    },
    {
        id: 2,
        url: "/videos/story2.mp4",
        thumbnail: "/thumbnails/story2.jpg"
    },
    // Add more videos as needed
];

const TestimonialCard = ({ name, role, content, image }: TestimonialProps) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
            <img 
                src={image} 
                alt={name} 
                className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div>
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-gray-600 text-sm">{role}</p>
            </div>
        </div>
        <p className="text-gray-700">{content}</p>
    </div>
);

const Testimonials = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Testimonials Section */}
                <h2 className="text-3xl text-black font-bold text-center mb-12">
                    What Our Clients Say
                </h2>
                
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className="mb-16"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <TestimonialCard {...testimonial} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                {/* <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                >
                    {videos.map((video) => (
                        <SwiperSlide key={video.id}>
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                <video
                                    controls
                                    poster={video.thumbnail}
                                    className="w-full h-full object-cover"
                                >
                                    <source src={video.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper> */}
            </div>
        </section>
    );
};

export default Testimonials;