import Image from 'next/image';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaWhatsapp, FaInstagram, FaFacebookF, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Column 1 - Logo and Motto */}
          <div className="lg:col-span-1">
            <div className="relative w-[180px] h-[100px] sm:w-[200px] sm:h-[120px] md:w-[220px] md:h-[80px]">
              <Image
                src="/assets/images/logo.png"
                alt="Lotus Logo"
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 220px"
                className="object-fill"
                priority
              />
            </div>
            <p className="text-gray-400 mt-4">
              Transforming spaces with innovative solutions and exceptional quality.
              Your trusted partner in industrial excellence.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
              <li><Link href="/products" className="hover:text-blue-400">Products</Link></li>
              <li><Link href="/enquiry" className="hover:text-blue-400">Enquiry</Link></li>
            </ul>
          </div>

          {/* Column 3 - Categories */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/products/safety-equipment" className="hover:text-blue-400">Safety Equipment</Link></li>
              <li><Link href="/products/industrial-tools" className="hover:text-blue-400">Industrial Tools</Link></li>
              <li><Link href="/products/cleaning-supplies" className="hover:text-blue-400">Cleaning Supplies</Link></li>
              <li><Link href="/products/power-tools" className="hover:text-blue-400">Power Tools</Link></li>
              <li><Link href="/products/maintenance" className="hover:text-blue-400">Maintenance</Link></li>
              <li><Link href="/products/workwear" className="hover:text-blue-400">Workwear</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact Details */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <FaPhone className="text-blue-400" />
                <a href="tel:+1234567890" className="hover:text-blue-400">+1 234 567 890</a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                <a href="mailto:info@lotus.com" className="hover:text-blue-400">info@lotus.com</a>
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>123 Business Street, City, Country</span>
              </li>
              <li className="pt-4">
                <div className="flex gap-4">
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" 
                     className="hover:text-blue-400">
                    <FaWhatsapp size={24} />
                  </a>
                  <a href="https://instagram.com/lotus" target="_blank" rel="noopener noreferrer"
                     className="hover:text-blue-400">
                    <FaInstagram size={24} />
                  </a>
                  <a href="https://facebook.com/lotus" target="_blank" rel="noopener noreferrer"
                     className="hover:text-blue-400">
                    <FaFacebookF size={24} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 5 - Google Map */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Find Us</h3>
            <div className="w-full h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_CODE"
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

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Lotus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
