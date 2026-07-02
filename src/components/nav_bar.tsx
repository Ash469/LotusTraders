'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import productsData from '../data/Lotus.search.json';
import ThemeToggle from './ThemeToggle';

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node) &&
        document.activeElement !== inputRef.current 
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
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleInputFocus = () => {
    setShowSuggestions(searchQuery.length > 0);
  };

  const SearchInput = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div 
      ref={searchContainerRef}
      className={`relative w-full ${isMobile ? 'mb-4' : ''} prevent-zoom`}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search machinery..."
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        readOnly={false}
        inputMode="text"
        enterKeyHint="search"
        pattern=".*"
        onTouchStart={() => {
          inputRef.current?.focus();
        }}
        onBlur={(e) => {
          if (isMobile) {
            e.preventDefault();
            setTimeout(() => inputRef.current?.focus(), 10);
          }
        }} 
        className="w-full p-3 rounded-[8px] border border-theme-border bg-white dark:bg-slate-800 text-theme-text focus:border-accent outline-none transition-all duration-300 shadow-sm"
      />
      <button 
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform text-theme-text-muted"
        aria-label="Search"
        onClick={() => {
          inputRef.current?.focus();
          setShowSuggestions(true);
        }}
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
      {showSuggestions && searchQuery && (
        <div 
          className={`
            absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-[8px] shadow-xl 
            max-h-60 overflow-y-auto ${isMobile ? 'relative mt-2' : ''}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductClick(product.id);
                }}
                className="p-3 hover:bg-light dark:hover:bg-slate-700 cursor-pointer text-gray-700 dark:text-gray-200 border-b border-gray-50 dark:border-slate-700/50 last:border-0"
              >
                {product.name}
              </div>
            ))
          ) : (
            <div className="p-3 text-muted dark:text-gray-400 text-sm">No machinery found. Please try another term.</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-theme-bg/90 backdrop-blur-md text-theme-text shadow-sm border-b border-theme-border z-50 transition-colors duration-300">
        <div className="flex items-center justify-between h-20 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative h-14 w-[180px] md:h-16 md:w-[220px] scale-125 md:scale-150 origin-left">
            <Link href="/" passHref>
              <Image 
                src="/logo.png" 
                alt="Lotus Traders Machinery Logo" 
                fill 
                priority 
                className="object-cover"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <SearchInput />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-6 py-2.5 text-sm font-bold tracking-wide rounded-[8px] transition-all bg-accent text-white hover:bg-amber-600 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Get Quote
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button 
              className="p-2 hover:bg-light dark:hover:bg-slate-800 rounded-[8px] transition-colors" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 text-theme-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="p-6 md:hidden bg-theme-bg border-t border-theme-border shadow-xl absolute w-full">
            <SearchInput isMobile={true} />
            <Link
              href="/contact"
              className="block mt-6 px-4 py-3 text-center text-sm font-bold tracking-wide rounded-[8px] transition-all bg-accent text-white hover:bg-amber-600 shadow-md"
            >
              Request a Quote
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;