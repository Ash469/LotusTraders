"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import NavBar from '@/components/nav_bar';
import Footer from '@/components/footer';

const inputStyles = "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-sm";

const EnquiryPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />

            {/* Enquiry Form Section */}
            <div className="bg-gradient-to-br mt-16 from-gray-50 to-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4"> {/* reduced py-6 to py-4 */}
                    <div className="flex flex-col md:flex-row gap-4 items-stretch bg-white rounded-2xl shadow-xl overflow-hidden"> {/* reduced gap-6 to gap-4 */}
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 relative h-[250px] md:h-auto md:aspect-[16/12] overflow-hidden"> {/* reduced height and changed aspect ratio */}
                            <div className="absolute inset-3 rounded-xl overflow-hidden"> {/* reduced inset-4 to inset-3 */}
                                <Image
                                    src="/assets/cateogries/cat1.png"
                                    alt="Civil Engineering Equipment"
                                    fill
                                    className="object-contain hover:scale-105 transition-transform duration-300"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="w-full md:w-1/2 p-4 lg:p-5"> {/* reduced padding */}
                            <h2 className="text-lg font-bold text-gray-900 mb-3 text-center"> {/* reduced text size and margin */}
                                Product Enquiry
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label htmlFor="firstName" className="text-xs font-medium text-gray-700">First Name</label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter first name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={inputStyles}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="lastName" className="text-xs font-medium text-gray-700">Last Name</label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={inputStyles}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email, Phone, Company inputs with smaller spacing */}
                                {['email', 'phone', 'company'].map((field) => (
                                    <div key={field} className="space-y-1">
                                        <label htmlFor={field} className="text-xs font-medium text-gray-700">
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </label>
                                        <input
                                            id={field}
                                            type={field === 'email' ? 'email' : 'text'}
                                            name={field}
                                            placeholder={`Enter ${field}`}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            className={inputStyles}
                                            required={field !== 'company'}
                                        />
                                    </div>
                                ))}

                                <div className="space-y-1">
                                    <label htmlFor="message" className="text-xs font-medium text-gray-700">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Enter your message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={3}
                                        className={inputStyles}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200 text-sm"
                                >
                                    Submit Enquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1">
                {/* Other content goes here */}
            </main>

            <Footer />
        </div>
    );
};

export default EnquiryPage;