import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-md z-50">
      <div className="flex items-center justify-between h-20 max-w-7xl mx-auto px-4">
        <div className="relative h-16 w-82">
            <Link href="/">
            <Image src="/logo.png" alt="Logo" fill priority className="object-cover" />
            </Link>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-red-600 outline-none transition-all duration-300"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">🔍</button>
          </div>
        </div>

        <Link
          href="/contact"
          className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all bg-red-600 text-white"
        >
          Connect with us
        </Link>

        <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="p-6 md:hidden bg-gray-50 border-t">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-red-600 outline-none mb-4 transition-all duration-300"
          />
          <Link
            href="/contact"
            className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all bg-red-600 text-white"
          >
            Connect with us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;