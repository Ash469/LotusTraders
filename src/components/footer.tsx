import Image from 'next/image';
import Link from 'next/link';
import { FaPhone, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaLocationPin, FaMessage } from 'react-icons/fa6';

const Footer = () => {
  // Add Organization Schema
  const OrganizationSchema = () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Lotus Traders",
      "url": "https://www.lotustradersmachinery.com",
      "logo": "https://www.lotustradersmachinery.com/logo.png",
      "description": "Lotus Traders - Manufacturer and supplier of construction equipment in Northeast India",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Zoo Tiniali",
        "addressLocality": "Guwahati",
        "addressRegion": "Assam",
        "postalCode": "781021",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+919435559130",
        "contactType": "sales",
        "email": "info@lotustraders.co.in",
        "availableLanguage": ["English", "Hindi", "Assamese"]
      },
      "sameAs": [
        "https://www.youtube.com/@LOTUSTRADERS"
      ]
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    );
  };

  return (
    <>
      <OrganizationSchema />
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {/* Column 1 - Logo and Motto */}
            <div className="lg:col-span-2">
              <div className="relative w-[250px] h-[140px] sm:w-[300px] sm:h-[160px] md:w-[320px] md:h-[120px]">
                <Image
                  src="/logo.png"
                  alt="Lotus Logo"
                  fill
                  sizes="(max-width: 740px) 400px, (max-width: 768px) 350px, 370px"
                  className="object-cover"
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
                <li><Link href="/#about" className="hover:text-blue-400">About Us</Link></li>
                <li><Link href="/#categories" className="hover:text-blue-400">Categories</Link></li>
                <li><Link href="/#products" className="hover:text-blue-400">Products</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400">Enquiry</Link></li>
              </ul>
            </div>

            {/* Column 3 - Categories */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link href="/categories/brick_making_machine" className="hover:text-blue-400">Brick Making Machine</Link></li>
                <li><Link href="/categories/concrete_mixer" className="hover:text-blue-400">Concrete Mixer Machine</Link></li>
                <li><Link href="/categories/bar_bending_and_cutting_machine" className="hover:text-blue-400">Bar Cutting and Bending</Link></li>
                <li><Link href="/categories/moulds" className="hover:text-blue-400">Moulds</Link></li>
                <li><Link href="/categories/trimix_system" className="hover:text-blue-400">Trimix System</Link></li>
                <li><Link href="/categories/other_machinery" className="hover:text-blue-400">Other Machinery</Link></li>
              </ul>
            </div>

            {/* Column 4 - Contact Details */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <FaPhone className="text-blue-400" />
                  <a href="tel:+919435559130" className="hover:text-blue-400">+91 9435559130</a>
                </li>
                <li className="flex items-center gap-2">
                  <FaMessage className="text-blue-400" />
                  <a href="mailto:info@lotustraders.co.in" className="hover:text-blue-400">info@lotustraders.co.in</a>
                </li>
                <li className="flex items-center gap-2">
                <FaLocationPin className="text-blue-400" />
                <a href="https://www.google.com/maps/place/Lotus+Traders/@26.175182,91.776836,15z/data=!4m6!3m5!1s0x375a59a0dd4459ad:0x1622d50b645999ad!8m2!3d26.175182!4d91.776836!16s%2Fg%2F1s0477r0c?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D" className="hover:text-blue-400">Zoo Tiniali, Guwahati, Assam 781021</a>
                </li>
                <li className="pt-4">
                  <div className="flex gap-4">
                    <a href="https://wa.me/9435559130" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="hover:text-blue-400"
                       aria-label="Chat with us on WhatsApp">
                      <FaWhatsapp size={24} />
                    </a>
                    <a href="https://www.youtube.com/@LOTUSTRADERS" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="hover:text-blue-400"
                       aria-label="Visit our YouTube channel">
                      <FaYoutube size={24} />
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
                  title="Lotus Traders Location Map"
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

          {/* Copyright Section */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Lotus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
