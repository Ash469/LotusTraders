'use client';

import { useState } from 'react';
import Head from 'next/head';
import Footer from '@/components/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Implement form submission logic here
      // For now, let's simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setSubmitError('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // JSON-LD for local business
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lotus Traders",
    "image": "https://www.lotustradersmachinery.com/logo.png",
    "url": "https://www.lotustradersmachinery.com/contact",
    "telephone": "+919435559130",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Zoo Tiniali",
      "addressLocality": "Guwahati",
      "addressRegion": "Assam",
      "postalCode": "781021",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.175182",
      "longitude": "91.776836"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Lotus Traders - Construction Equipment</title>
        <meta name="description" content="Contact Lotus Traders for high-quality construction equipment in Northeast India. Get in touch with our team for inquiries, quotes, and support." />
        <meta name="keywords" content="contact, lotus traders, construction equipment, guwahati, assam, northeast india, inquiry" />
        <meta property="og:title" content="Contact Us | Lotus Traders - Construction Equipment" />
        <meta property="og:description" content="Contact Lotus Traders for high-quality construction equipment in Northeast India. Get in touch with our team for inquiries, quotes, and support." />
        <meta property="og:url" content="https://www.lotustradersmachinery.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.lotustradersmachinery.com/contact-og-image.jpg" />
        <link rel="canonical" href="https://www.lotustradersmachinery.com/contact" />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              
              {submitSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  <p>Thank you for your message! We&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {submitError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      <p>{submitError}</p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Address</h3>
                  <p className="mt-2 text-gray-600">
                    Lotus Traders<br />
                    Zoo Tiniali, Guwahati<br />
                    Assam 781021<br />
                    India
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                  <p className="mt-2 text-gray-600">
                    <a href="tel:+919435559130" className="hover:text-blue-600">+91 9435559130</a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Email</h3>
                  <p className="mt-2 text-gray-600">
                    <a href="mailto:info@lotustraders.co.in" className="hover:text-blue-600">info@lotustraders.co.in</a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Business Hours</h3>
                  <p className="mt-2 text-gray-600">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-8 h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.683259945561!2d91.77427527536754!3d26.175181976345233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59a0dd4459ad%3A0x1622d50b645999ad!2sLotus%20Traders!5e0!3m2!1sen!2sin!4v1712305184315!5i0"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}