'use client';

import { use, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaSave, FaTimes, FaPlus, FaTrash, FaUpload, FaSpinner, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  discount?: string; // Added discount property as optional
}

interface Category {
  id: string;
  name: string;
  description: string;
  heroImages: string[];
  products: Product[];
  deals: Product[];
  trendingProducts: Product[];
  newReleases: Product[];
}

const gradients = {
  primary: "bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-700",
  secondary: "bg-gradient-to-r from-rose-500 via-red-500 to-red-600",
  success: "bg-gradient-to-r from-emerald-500 to-green-600",
  info: "bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800",
  warning: "bg-gradient-to-r from-amber-500 via-orange-600 to-red-500",
};

function CategoryEditForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('Products');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const updateCategory = (updates: Partial<Category>) => {
    if (!category) return;
    setCategory({
      ...category,
      ...updates,
      id: updates.id ?? category.id ?? '',
      name: updates.name ?? category.name ?? '',
      description: updates.description ?? category.description ?? '',
      heroImages: updates.heroImages ?? category.heroImages ?? [],
      products: updates.products ?? category.products ?? [],
      deals: updates.deals ?? category.deals ?? [],
      trendingProducts: updates.trendingProducts ?? category.trendingProducts ?? [],
      newReleases: updates.newReleases ?? category.newReleases ?? []
    });
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/admin/categories/${id}`);
      if (!response.ok) throw new Error('Failed to fetch category');
      const data = await response.json();
      setCategory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id !== 'new') {
      fetchCategory();
    } else {
      setCategory({
        id: '',
        name: '',
        description: '',
        heroImages: [],
        products: [],
        deals: [],
        trendingProducts: [],
        newReleases: []
      });
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    try {
      const url = id === 'new' ? '/api/admin/categories' : `/api/admin/categories/${id}`;
      const method = id === 'new' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      });

      if (!response.ok) throw new Error('Failed to save category');

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index?: number, productType?: string, productIndex?: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploadingImage(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }
      
      const data = await response.json();
      
      if (productType && productIndex !== undefined) {
        // Handle product image updates
        if (!category) return;
        
        if (productType === 'products') {
          const newProducts = [...category.products];
          newProducts[productIndex] = { ...newProducts[productIndex], image: data.filePath };
          updateCategory({ products: newProducts });
        } else if (productType === 'deals') {
          const newDeals = [...category.deals];
          newDeals[productIndex] = { ...newDeals[productIndex], image: data.filePath };
          updateCategory({ deals: newDeals });
        } else if (productType === 'trendingProducts') {
          const newTrending = [...category.trendingProducts];
          newTrending[productIndex] = { ...newTrending[productIndex], image: data.filePath };
          updateCategory({ trendingProducts: newTrending });
        } else if (productType === 'newReleases') {
          const newReleases = [...category.newReleases];
          newReleases[productIndex] = { ...newReleases[productIndex], image: data.filePath };
          updateCategory({ newReleases: newReleases });
        }
      } else if (index !== undefined) {
        const newImages = [...(category?.heroImages || [])];
        newImages[index] = data.filePath;
        updateCategory({ heroImages: newImages });
      } else {
        updateCategory({ heroImages: [...(category?.heroImages || []), data.filePath] });
      }
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const triggerFileInput = (index?: number, productType?: string, productIndex?: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.index = index !== undefined ? index.toString() : '';
      fileInputRef.current.dataset.productType = productType || '';
      fileInputRef.current.dataset.productIndex = productIndex !== undefined ? productIndex.toString() : '';
      fileInputRef.current.click();
    }
  };

  const searchProducts = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`/api/admin/products/search?term=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to search products');
      }
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    while (stars.length < 5) {
      stars.push(
        <svg key={`empty-${stars.length}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return (
      <div className="flex items-center space-x-1">
        {stars}
        <span className="ml-2 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const index = fileInputRef.current?.dataset.index;
          const productType = fileInputRef.current?.dataset.productType;
          const productIndex = fileInputRef.current?.dataset.productIndex;
          
          handleImageUpload(
            e, 
            index ? parseInt(index, 10) : undefined, 
            productType || undefined, 
            productIndex ? parseInt(productIndex, 10) : undefined
          );
        }}
      />

      <div className="sticky top-0 z-30 backdrop-blur-md bg-white/90 shadow-md border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="relative h-14 w-72">
              <Link href="/admin/dashboard">
                <Image src="/logo.png" alt="Logo" fill priority className="object-cover" />
              </Link>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="inline-flex items-center px-4 py-2.5 border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-200"
              >
                <FaSave className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {success && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-lg shadow-2xl z-50 animate-fade-in-down">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <p className="font-bold">Success! Category has been saved.</p>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Basic Information Section */}
          <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-lg">
            <div className={`px-8 py-5 ${gradients.primary}`}>
              <h2 className="text-xl font-bold text-white">Basic Information</h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category ID</label>
                  <input
                    type="text"
                    value={category?.id || ''}
                    onChange={(e) => updateCategory({ id: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={category?.name || ''}
                    onChange={(e) => updateCategory({ name: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    value={category?.description || ''}
                    onChange={(e) => updateCategory({ description: e.target.value })}
                    rows={5}
                    className="w-full border border-slate-200 rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Hero Images</label>
                <div className="grid grid-cols-2 gap-4">
                  {(category?.heroImages || []).map((image, index) => (
                    <div key={index} className="relative group border rounded-xl overflow-hidden bg-slate-50 aspect-square shadow-sm transition-all duration-300 hover:shadow-md">
                      {image ? (
                        <Image 
                          src={image} 
                          alt={`Hero image ${index + 1}`} 
                          fill 
                          className="object-contain p-2" 
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full text-slate-400">
                          No image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-3 transition-opacity duration-300">
                        <button
                          type="button"
                          onClick={() => triggerFileInput(index)}
                          className="p-2 bg-white/90 rounded-full text-blue-600 hover:text-blue-800 hover:bg-white transition-all duration-200 shadow-lg"
                        >
                          <FaUpload size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = (category?.heroImages || []).filter((_, i) => i !== index);
                            updateCategory({ heroImages: newImages });
                          }}
                          className="p-2 bg-white/90 rounded-full text-red-600 hover:text-red-800 hover:bg-white transition-all duration-200 shadow-lg"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => triggerFileInput()}
                    className={`border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-8 hover:bg-slate-50 hover:border-blue-300 transition-all duration-300 aspect-square ${
                      uploadingImage ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <>
                        <FaSpinner className="animate-spin h-8 w-8 text-blue-600 mb-2" />
                        <span className="text-sm text-slate-500">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                          <FaPlus className="h-6 w-6 text-blue-500" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">Add Image</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2 italic">
                  Click on an image to replace it or delete it. These images will be used in the category&apos;s hero section.
                </p>
              </div>
            </div>
          </section>

          {/* Product Collections Section with Tabs */}
          <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-lg">
            <div className={`px-8 py-5 ${gradients.primary}`}>
              <h2 className="text-xl font-bold text-white">Product Collections</h2>
            </div>
            
            <div className="flex flex-wrap border-b border-slate-200">
              {['Products', 'Trending Products', 'New Releases', 'Deals'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 font-medium text-sm transition-all duration-200 ${activeTab === tab
                    ? 'text-blue-700 border-b-2 border-blue-600 font-semibold bg-blue-50'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'Products' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-slate-800">Regular Products</h3>
                    <div className="flex space-x-3">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="w-64 border border-slate-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && searchProducts()}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      </div>
                      <button
                        onClick={searchProducts}
                        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors flex items-center"
                      >
                        {isSearching ? <FaSpinner className="animate-spin mr-2" /> : "Search"}
                      </button>
                    </div>
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="bg-slate-50 border rounded-xl p-6 space-y-4 shadow-inner mt-6">
                      <h4 className="text-sm font-medium text-slate-700">
                        Search Results ({searchResults.length} products)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.map(product => (
                          <div 
                            key={product.id} 
                            className="bg-white rounded-xl shadow-md p-4 flex items-center border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                          >
                            <div className="relative h-14 w-14 flex-shrink-0 mr-4 bg-slate-100 rounded-lg overflow-hidden">
                              <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                className="object-contain p-1" 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                              <div className="mt-1">{renderStarRating(product.rating)}</div>
                            </div>
                            <button
                              onClick={() => {
                                if (category?.products.some(p => p.id === product.id)) {
                                  return; // Already added
                                }
                                updateCategory({ 
                                  products: [...(category?.products || []), product]
                                });
                              }}
                              className="ml-2 p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-4">
                    <h4 className="text-lg font-medium text-slate-800">Added Products</h4>
                    {category?.products?.map((product, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:shadow-md transition-all duration-200">
                        <div className="relative w-20 h-20 border rounded-lg overflow-hidden bg-white group">
                          <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <button
                              type="button"
                              onClick={() => triggerFileInput(undefined, 'products', index)}
                              className="p-2 bg-white/90 rounded-full text-blue-600 hover:text-blue-800 hover:bg-white transition-all duration-200 shadow-lg"
                            >
                              <FaUpload size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={product.id}
                            onChange={(e) => {
                              if (!category) return;
                              const newProducts = [...category.products];
                              newProducts[index] = { ...product, id: e.target.value };
                              updateCategory({ products: newProducts });
                            }}
                            className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            placeholder="Product ID"
                          />
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => {
                              if (!category) return;
                              const newProducts = [...category.products];
                              newProducts[index] = { ...product, name: e.target.value };
                              updateCategory({ products: newProducts });
                            }}
                            className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            placeholder="Product Name"
                          />
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={product.image}
                                onChange={(e) => {
                                  if (!category) return;
                                  const newProducts = [...category.products];
                                  newProducts[index] = { ...product, image: e.target.value };
                                  updateCategory({ products: newProducts });
                                }}
                                className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                placeholder="Image URL"
                              />
                            </div>
                            <div className="w-32">
                              <input
                                type="number"
                                value={product.rating}
                                onChange={(e) => {
                                  if (!category) return;
                                  const newProducts = [...category.products];
                                  newProducts[index] = { ...product, rating: parseFloat(e.target.value) };
                                  updateCategory({ products: newProducts });
                                }}
                                className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                placeholder="Rating"
                                step="0.1"
                                min="0"
                                max="5"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (!category) return;
                            const newProducts = category.products.filter((_, i) => i !== index);
                            updateCategory({ products: newProducts });
                          }}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    {category?.products?.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <svg className="w-16 h-16 text-slate-300 mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path>
                        </svg>
                        <p className="text-slate-500">No products added to this category yet. Search and add products above.</p>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        if (!category) return;
                        updateCategory({
                          products: [...(category.products || []), {
                            id: '',
                            name: '',
                            image: '',
                            rating: 0
                          }]
                        });
                      }}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-5 py-3 rounded-lg transition-all duration-200 font-medium shadow-sm mt-4 mx-auto"
                    >
                      <FaPlus className="text-blue-500" /> Add Product Manually
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'Trending Products' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-slate-800">Trending Products</h3>
                    <div className="flex space-x-3">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="w-64 border border-slate-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && searchProducts()}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      </div>
                      <button
                        onClick={searchProducts}
                        className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition-colors flex items-center"
                      >
                        {isSearching ? <FaSpinner className="animate-spin mr-2" /> : "Search"}
                      </button>
                    </div>
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-6 space-y-4 shadow-inner mt-6">
                      <h4 className="text-sm font-medium text-red-700">
                        Search Results ({searchResults.length} products)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.map(product => (
                          <div 
                            key={product.id} 
                            className="bg-white rounded-xl shadow-md p-4 flex items-center border border-slate-100 hover:border-red-300 hover:shadow-lg transition-all duration-200"
                          >
                            <div className="relative h-14 w-14 flex-shrink-0 mr-4 bg-slate-100 rounded-lg overflow-hidden">
                              <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                className="object-contain p-1" 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                              <div className="mt-1">{renderStarRating(product.rating)}</div>
                            </div>
                            <button
                              onClick={() => {
                                if (category?.trendingProducts.some(p => p.id === product.id)) {
                                  return; // Already added
                                }
                                updateCategory({ 
                                  trendingProducts: [...(category?.trendingProducts || []), product]
                                });
                              }}
                              className="ml-2 p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-4">
                    <h4 className="text-lg font-medium text-slate-800">Added Trending Products</h4>
                    {category?.trendingProducts?.map((product, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-red-50 rounded-lg hover:shadow-md transition-all duration-200">
                        <div className="relative w-20 h-20 border rounded-lg overflow-hidden bg-white group">
                          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 z-10">TRENDING</div>
                          <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <button
                              type="button"
                              onClick={() => triggerFileInput(undefined, 'trendingProducts', index)}
                              className="p-2 bg-white/90 rounded-full text-blue-600 hover:text-blue-800 hover:bg-white transition-all duration-200 shadow-lg"
                            >
                              <FaUpload size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={product.id}
                            onChange={(e) => {
                              if (!category) return;
                              const newProducts = [...category.trendingProducts];
                              newProducts[index] = { ...product, id: e.target.value };
                              updateCategory({ trendingProducts: newProducts });
                            }}
                            className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                            placeholder="Product ID"
                          />
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => {
                              if (!category) return;
                              const newProducts = [...category.trendingProducts];
                              newProducts[index] = { ...product, name: e.target.value };
                              updateCategory({ trendingProducts: newProducts });
                            }}
                            className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                            placeholder="Product Name"
                          />
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={product.image}
                                onChange={(e) => {
                                  if (!category) return;
                                  const newProducts = [...category.trendingProducts];
                                  newProducts[index] = { ...product, image: e.target.value };
                                  updateCategory({ trendingProducts: newProducts });
                                }}
                                className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                                placeholder="Image URL"
                              />
                            </div>
                            <div className="w-32">
                              <input
                                type="number"
                                value={product.rating}
                                onChange={(e) => {
                                  if (!category) return;
                                  const newProducts = [...category.trendingProducts];
                                  newProducts[index] = { ...product, rating: parseFloat(e.target.value) };
                                  updateCategory({ trendingProducts: newProducts });
                                }}
                                className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                                placeholder="Rating"
                                step="0.1"
                                min="0"
                                max="5"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (!category) return;
                            const newProducts = category.trendingProducts.filter((_, i) => i !== index);
                            updateCategory({ trendingProducts: newProducts });
                          }}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    {category?.trendingProducts?.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center bg-red-50 rounded-xl border border-dashed border-red-200">
                        <svg className="w-16 h-16 text-red-200 mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                        </svg>
                        <p className="text-red-500">No trending products added to this category yet. Search and add products above.</p>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        if (!category) return;
                        updateCategory({
                          trendingProducts: [...(category.trendingProducts || []), {
                            id: '',
                            name: '',
                            image: '',
                            rating: 0
                          }]
                        });
                      }}
                      className="flex items-center gap-2 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-5 py-3 rounded-lg transition-all duration-200 font-medium shadow-sm mt-4 mx-auto"
                    >
                      <FaPlus className="text-red-500" /> Add Trending Product
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'New Releases' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-slate-800">New Release Products</h3>
                    <div className="flex space-x-3">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="w-64 border border-slate-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && searchProducts()}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      </div>
                      <button
                        onClick={searchProducts}
                        className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition-colors flex items-center"
                      >
                        {isSearching ? <FaSpinner className="animate-spin mr-2" /> : "Search"}
                      </button>
                    </div>
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="bg-green-50 border border-green-100 rounded-xl p-6 space-y-4 shadow-inner mt-6">
                      <h4 className="text-sm font-medium text-green-700">
                        Search Results ({searchResults.length} products)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.map(product => (
                          <div 
                            key={product.id} 
                            className="bg-white rounded-xl shadow-md p-4 flex items-center border border-slate-100 hover:border-green-300 hover:shadow-lg transition-all duration-200"
                          >
                            <div className="relative h-14 w-14 flex-shrink-0 mr-4 bg-slate-100 rounded-lg overflow-hidden">
                              <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                className="object-contain p-1" 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                              <div className="mt-1">{renderStarRating(product.rating)}</div>
                            </div>
                            <button
                              onClick={() => {
                                if (category?.newReleases.some(p => p.id === product.id)) {
                                  return; // Already added
                                }
                                updateCategory({ 
                                  newReleases: [...(category?.newReleases || []), product]
                                });
                              }}
                              className="ml-2 p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-4">
                    <h4 className="text-lg font-medium text-slate-800">Added New Release Products</h4>
                    {category?.newReleases?.map((product, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:shadow-md transition-all duration-200">
                        <div className="relative w-20 h-20 border rounded-lg overflow-hidden bg-white group">
                          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 z-10">NEW</div>
                          <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <button
                              type="button"
                              onClick={() => triggerFileInput(undefined, 'newReleases', index)}
                              className="p-2 bg-white/90 rounded-full text-blue-600 hover:text-blue-800 hover:bg-white transition-all duration-200 shadow-lg"
                            >
                              <FaUpload size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={product.id}
                            onChange={(e) => {
                              if (!category) return;
                              const newProducts = [...category.newReleases];
                              newProducts[index] = { ...product, id: e.target.value };
                              updateCategory({ newReleases: newProducts });
                            }}
                            className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                            placeholder="Product ID"
                          />
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => {
                              if (!category) return;
                              const newProducts = [...category.newReleases];
                              newProducts[index] = { ...product, name: e.target.value };
                              updateCategory({ newReleases: newProducts });
                            }}
                            className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                            placeholder="Product Name"
                          />
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={product.image}
                                onChange={(e) => {
                                  if (!category) return;
                                  const newProducts = [...category.newReleases];
                                  newProducts[index] = { ...product, image: e.target.value };
                                  updateCategory({ newReleases: newProducts });
                                }}
                                className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                                placeholder="Image URL"
                              />
                            </div>
                            <div className="w-32">
                              <input
                                type="number"
                                value={product.rating}
                                onChange={(e) => {
                                  if (!category) return;
                                  const newProducts = [...category.newReleases];
                                  newProducts[index] = { ...product, rating: parseFloat(e.target.value) };
                                  updateCategory({ newReleases: newProducts });
                                }}
                                className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                                placeholder="Rating"
                                step="0.1"
                                min="0"
                                max="5"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (!category) return;
                            const newProducts = category.newReleases.filter((_, i) => i !== index);
                            updateCategory({ newReleases: newProducts });
                          }}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    {category?.newReleases?.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center bg-green-50 rounded-xl border border-dashed border-green-200">
                        <svg className="w-16 h-16 text-green-200 mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <p className="text-green-600">No new release products added to this category yet. Search and add products above.</p>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        if (!category) return;
                        updateCategory({
                          newReleases: [...(category.newReleases || []), {
                            id: '',
                            name: '',
                            image: '',
                            rating: 0
                          }]
                        });
                      }}
                      className="flex items-center gap-2 text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 px-5 py-3 rounded-lg transition-all duration-200 font-medium shadow-sm mt-4 mx-auto"
                    >
                      <FaPlus className="text-green-500" /> Add New Release
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'Deals' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-slate-800">Deal of the Day Products</h3>
                    <div className="flex space-x-3">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="w-64 border border-slate-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && searchProducts()}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      </div>
                      <button
                        onClick={searchProducts}
                        className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors flex items-center"
                      >
                        {isSearching ? <FaSpinner className="animate-spin mr-2" /> : "Search"}
                      </button>
                    </div>
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 space-y-4 shadow-inner mt-6">
                      <h4 className="text-sm font-medium text-purple-700">
                        Search Results ({searchResults.length} products)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.map(product => (
                          <div 
                            key={product.id} 
                            className="bg-white rounded-xl shadow-md p-4 flex items-center border border-slate-100 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
                          >
                            <div className="relative h-14 w-14 flex-shrink-0 mr-4 bg-slate-100 rounded-lg overflow-hidden">
                              <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                className="object-contain p-1" 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                              <div className="mt-1">{renderStarRating(product.rating)}</div>
                            </div>
                            <button
                              onClick={() => {
                                if (category?.deals.some(p => p.id === product.id)) {
                                  return; // Already added
                                }
                                updateCategory({ 
                                  deals: [...(category?.deals || []), { ...product, discount: '20% OFF' }]
                                });
                              }}
                              className="ml-2 p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-4">
                    <h4 className="text-lg font-medium text-slate-800">Added Deal Products</h4>
                    {category?.deals?.map((product, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg hover:shadow-md transition-all duration-200">
                        <div className="relative w-20 h-20 border rounded-lg overflow-hidden bg-white group">
                          <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 z-10">
                            {product.discount || 'DEAL'}
                          </div>
                          <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <button
                              type="button"
                              onClick={() => triggerFileInput(undefined, 'deals', index)}
                              className="p-2 bg-white/90 rounded-full text-blue-600 hover:text-blue-800 hover:bg-white transition-all duration-200 shadow-lg"
                            >
                              <FaUpload size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={product.id}
                            onChange={(e) => {
                              if (!category) return;
                              const newProducts = [...category.deals];
                              newProducts[index] = { ...product, id: e.target.value };
                              updateCategory({ deals: newProducts });
                            }}
                            className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                            placeholder="Product ID"
                          />
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => {
                              if (!category) return;
                              const newProducts = [...category.deals];
                              newProducts[index] = { ...product, name: e.target.value };
                              updateCategory({ deals: newProducts });
                            }}
                            className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                            placeholder="Product Name"
                          />
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={product.image}
                                onChange={(e) => {
                                  if (!category) return;
                                  const newProducts = [...category.deals];
                                  newProducts[index] = { ...product, image: e.target.value };
                                  updateCategory({ deals: newProducts });
                                }}
                                className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                placeholder="Image URL"
                              />
                            </div>
                            <div className="w-32">
                              <input
                                type="text"
                                value={product.discount || ''}
                                onChange={(e) => {
                                  if (!category) return;
                                  const newProducts = [...category.deals];
                                  newProducts[index] = { ...product, discount: e.target.value };
                                  updateCategory({ deals: newProducts });
                                }}
                                className="w-full border rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                placeholder="Discount (e.g. 20% OFF)"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (!category) return;
                            const newProducts = category.deals.filter((_, i) => i !== index);
                            updateCategory({ deals: newProducts });
                          }}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    {category?.deals?.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-dashed border-purple-200">
                        <svg className="w-16 h-16 text-purple-200 mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                        </svg>
                        <p className="text-purple-600">No deal products added to this category yet. Search and add products above.</p>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        if (!category) return;
                        updateCategory({
                          deals: [...(category.deals || []), {
                            id: '',
                            name: '',
                            image: '',
                            rating: 0,
                            discount: '20% OFF'
                          }]
                        });
                      }}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-5 py-3 rounded-lg transition-all duration-200 font-medium shadow-sm mt-4 mx-auto"
                    >
                      <FaPlus className="text-purple-500" /> Add Deal Product
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
          
          <div className="flex justify-end mt-10">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 text-base font-medium transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaSave className="mr-2" />
              Save Category
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CategoryEditPage({ params }: { params: Promise<{ id: string }> }) {
  return <CategoryEditForm params={params} />;
}
