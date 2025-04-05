import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import productsData from '../data/Lotus.search.json';

interface Product {
  id: string;
  name: string;
}

const products: Product[] = productsData;

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (productId: string) => {
    setSearchQuery('');
    setShowSuggestions(false);
    setIsMenuOpen(false);
    window.location.href = `/products/${productId}`;
  };

  // Improved click outside handler that doesn't interfere with keyboard
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close suggestions if clicking outside both the search container and the keyboard is not visible
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node) &&
        document.activeElement !== inputRef.current // Don't close if input is focused
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Use functional update to ensure we're working with the latest state
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
    
    // Don't use setTimeout - it can cause the keyboard to flicker
    // Instead, use requestAnimationFrame which is more stable
    requestAnimationFrame(() => {
      // Only focus if the element doesn't already have focus
      inputRef.current?.focus();
    });
  };

  const handleInputFocus = () => {
    setShowSuggestions(searchQuery.length > 0);
    // if (window.innerWidth < 768) { // Mobile devices
    //   setTimeout(() => {
    //     inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //   }, 100);
    // }
  };

  const SearchInput = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div 
      ref={searchContainerRef}
      className={`relative w-full ${isMobile ? 'mb-4' : ''} prevent-zoom`}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        // Enhanced mobile optimizations
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        readOnly={false}
        // These attributes help prevent keyboard flickering
        inputMode="text"
        enterKeyHint="search"
        // Prevent zoom on focus in iOS
        pattern=".*"
        onTouchStart={() => {
          // Prevent any default browser behavior
          inputRef.current?.focus();
        }}
        // Prevent default browser behaviors that might interfere with typing
        onBlur={(e) => {
          // Completely prevent blur on mobile
          if (isMobile) {
            e.preventDefault();
            setTimeout(() => inputRef.current?.focus(), 10);
          }
        }} 
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-red-600 outline-none transition-all duration-300"
      />
      <button 
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
        aria-label="Search"
        // Refocus the input when button is clicked
        onClick={() => {
          inputRef.current?.focus();
          setShowSuggestions(true);
        }}
        // Prevent button from stealing focus
        type="button"
      >
        🔍
      </button>
      
      {showSuggestions && searchQuery && (
        <div 
          className={`
            absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg 
            max-h-60 overflow-y-auto ${isMobile ? 'relative mt-2' : ''}
          `}
          // Prevent clicks inside dropdown from dismissing keyboard
          onClick={(e) => e.stopPropagation()}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={(e) => {
                  // Prevent the click from bubbling up and causing focus loss
                  e.stopPropagation();
                  handleProductClick(product.id);
                }}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {product.name}
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">No products found</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-md z-50">
      <div className="flex items-center justify-between h-20 max-w-7xl mx-auto px-4">
        <div className="relative h-16 w-82">
          <Link href="/" passHref>
            <Image 
              src="/logo.png" 
              alt="Logo" 
              fill 
              priority 
              className="object-cover"
              style={{ position: 'absolute' }}
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <SearchInput />
        </div>

        <Link
          href="/contact"
          className="whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all bg-red-600 text-white hover:bg-red-700"
        >
          Connect with us
        </Link>

        <button 
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
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
          <SearchInput isMobile={true} />
          <Link
            href="/contact"
            className="block mt-4 whitespace-nowrap px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all bg-red-600 text-white hover:bg-red-700 text-center"
          >
            Connect with us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;