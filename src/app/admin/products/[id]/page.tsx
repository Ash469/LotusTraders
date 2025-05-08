'use client';

import { use, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/models/Product';
import { FaSave, FaTimes, FaPlus, FaTrash, FaUpload, FaSpinner, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const gradients = {
  primary: "bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-700",
  secondary: "bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600",
  success: "bg-gradient-to-r from-emerald-600 to-green-700",
  info: "bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800",
  warning: "bg-gradient-to-r from-amber-500 via-orange-600 to-red-500",
};

function ProductEditForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('Benefits');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched product data:', data);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (id !== 'new') {
      fetchProduct();
    } else {
      setProduct({
        _id: '',
        id: crypto.randomUUID(),
        name: '',
        category_id: '',
        description: '',
        heroImages: [],
        rating: 0,
        specification: {},
        details: {
          benefits: [],
          reviews: [],
          faqs: [],
          information: []
        },
        youtubeLink: '',
        relatedProducts: [],
        other_products: []
      });
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      const url = id === 'new' ? '/api/admin/products' : `/api/admin/products/${id}`;
      const method = id === 'new' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSpecificationChange = (key: string, value: string) => {
    if (!product) return;
    
    setProduct({
      ...product,
      specification: {
        ...product.specification,
        [key]: value
      }
    });
  };

  const addSpecification = () => {
    if (!product) return;
    const newKey = `New Specification ${Object.keys(product.specification).length + 1}`;
    setProduct({
      ...product,
      specification: {
        ...product.specification,
        [newKey]: ''
      }
    });
  };

  const removeSpecification = (keyToRemove: string) => {
    if (!product) return;
    
    const newSpecification = { ...product.specification };
    delete newSpecification[keyToRemove];
    setProduct({
      ...product,
      specification: newSpecification
    });
  };

  const updateSpecificationKey = (oldKey: string, newKey: string) => {
    if (!product) return;
    
    const newSpecification = { ...product.specification };
    const value = newSpecification[oldKey];
    delete newSpecification[oldKey];
    newSpecification[newKey] = value;
    setProduct({
      ...product,
      specification: newSpecification
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
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
      
      if (index !== undefined) {
        const newImages = [...(product?.heroImages || [])];
        newImages[index] = data.filePath;
        setProduct({ ...product!, heroImages: newImages });
      } else {
        setProduct({ ...product!, heroImages: [...(product?.heroImages || []), data.filePath] });
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

  const triggerFileInput = (index?: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.index = index !== undefined ? index.toString() : '';
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
      // Filter out products that are already added as related or "you may like" products
      setSearchResults(data.filter((p: Product) => {
        // Don't show the current product
        if (p.id === id) return false;
        
        // Don't show products already in relatedProducts list
        if (product?.relatedProducts?.includes(String(p.id))) return false;
        
        // Don't show products already in other_products list
        if (product?.other_products?.includes(String(p.id))) return false;
        
        // Show all other products
        return true;
      }));
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const fetchProductsByCategory = async () => {
    if (!product?.category_id) {
      alert('This product has no category assigned. Please assign a category first.');
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await fetch(`/api/admin/products/search?term=${product.category_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products in the same category');
      }
      
      const data = await response.json();
      // Filter out products already added and current product
      setSearchResults(data.filter((p: Product) => {
        // Don't show the current product
        if (p.id === id) return false;
        
        // Don't show products already in relatedProducts list
        if (product?.relatedProducts?.includes(String(p.id))) return false;
        
        // Don't show products already in other_products list
        if (product?.other_products?.includes(String(p.id))) return false;
        
        // Show products in the same category
        return p.category_id === product.category_id;
      }));
    } catch (error) {
      console.error('Error fetching products by category:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const addRelatedProduct = (relatedProduct: Product) => {
    if (!product) return;
    
    if (product.relatedProducts?.includes(String(relatedProduct.id))) {
      return;
    }
    
    setProduct({
      ...product,
      relatedProducts: [...(product.relatedProducts || []), String(relatedProduct.id)]
    });
  };

  const removeRelatedProduct = (relatedProductId: string) => {
    if (!product) return;
    
    setProduct({
      ...product,
      relatedProducts: (product.relatedProducts || []).filter(id => id !== relatedProductId)
    });
  };

  const addOtherProduct = (otherProduct: Product) => {
    if (!product) return;
    
    if (product.other_products?.includes(String(otherProduct.id))) {
      return;
    }
    
    setProduct({
      ...product,
      other_products: [...(product.other_products || []), String(otherProduct.id)]
    });
  };

  const removeOtherProduct = (otherProductId: string) => {
    if (!product) return;
    
    setProduct({
      ...product,
      other_products: (product.other_products || []).filter(id => id !== otherProductId)
    });
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
  
  if (!product) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl font-semibold text-red-600">Product not found</div>
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
          handleImageUpload(e, index ? parseInt(index, 10) : undefined);
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
            <p className="font-bold">Success! Product has been saved.</p>
          </div>
        </div>
      )}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-lg">
            <div className={`px-8 py-5 ${gradients.primary}`}>
              <h2 className="text-xl font-bold text-white">Basic Information</h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={product?.name || ''}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category ID</label>
                  <input
                    type="text"
                    value={product?.category_id || ''}
                    onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={product?.rating || 0}
                      onChange={(e) => setProduct({ ...product, rating: parseFloat(e.target.value) })}
                      className="flex-1 h-2 bg-slate-200 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <div className="w-16 text-center">
                      {renderStarRating(product?.rating || 0)}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    value={product?.description || ''}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    rows={5}
                    className="w-full border border-slate-200 rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Product Images</label>
                <div className="grid grid-cols-2 gap-4">
                  {(product?.heroImages || []).map((image, index) => (
                    <div key={index} className="relative group border rounded-xl overflow-hidden bg-slate-50 aspect-square shadow-sm transition-all duration-300 hover:shadow-md">
                      {image ? (
                        <Image 
                          src={image} 
                          alt={`Product image ${index + 1}`} 
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
                            const newImages = (product?.heroImages || []).filter((_, i) => i !== index);
                            setProduct({ ...product, heroImages: newImages });
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
                  Click on an image to replace it or delete it. The first image will be used as main image.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-lg">
            <div className={`px-8 py-5 ${gradients.primary}`}>
              <h2 className="text-xl font-bold text-white">Specifications</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="overflow-x-auto bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-inner">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left px-4 py-3 w-1/3 text-slate-700 font-semibold">Specification</th>
                      <th className="text-left px-4 py-3 text-slate-700 font-semibold">Value</th>
                      <th className="px-4 py-3 w-16 text-slate-700 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product?.specification && Object.entries(product.specification).map(([key, value]) => (
                      <tr key={key} className="border-b border-slate-200 hover:bg-white">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={key}
                            onChange={(e) => updateSpecificationKey(key, e.target.value)}
                            className="w-full p-2.5 border border-slate-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            placeholder="Specification name"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleSpecificationChange(key, e.target.value)}
                            className="w-full p-2.5 border border-slate-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            placeholder="Specification value"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => removeSpecification(key)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={addSpecification}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-sm"
              >
                <FaPlus className="text-blue-500" /> Add Specification
              </button>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-lg">
            <div className={`px-8 py-5 ${gradients.primary}`}>
              <h2 className="text-xl font-bold text-white">Product Details</h2>
            </div>

            <div className="flex flex-wrap border-b border-slate-200">
              {['Benefits', 'Information', 'FAQs'].map((tab) => (
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

            <div className="p-8 space-y-6">
              {activeTab === 'Benefits' && (
                <div className="space-y-4">
                  {(product?.details?.benefits || []).map((benefit, index) => (
                    <div key={index} className="flex gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-2 shadow-sm">
                          <svg className="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => {
                          const newBenefits = [...(product?.details?.benefits || [])];
                          newBenefits[index] = e.target.value;
                          setProduct({
                            ...product,
                            details: { ...product?.details, benefits: newBenefits }
                          });
                        }}
                        className="flex-1 border rounded-lg shadow-sm p-3 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                        placeholder="Enter benefit"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newBenefits = (product?.details?.benefits || []).filter((_, i) => i !== index);
                          setProduct({
                            ...product,
                            details: { ...product?.details, benefits: newBenefits }
                          });
                        }}
                        className="p-3 text-red-500 hover:text-red-700 bg-white rounded-lg transition-all duration-200 shadow-sm hover:bg-red-50"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setProduct({
                      ...product,
                      details: { ...product?.details, benefits: [...(product?.details?.benefits || []), ''] }
                    })}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-5 py-3 rounded-lg transition-all duration-200 font-medium shadow-sm"
                  >
                    <FaPlus className="text-blue-500" /> Add Benefit
                  </button>
                </div>
              )}

              {activeTab === 'Information' && (
                <div className="space-y-4">
                  {(product?.details?.information || []).map((info, index) => (
                    <div key={index} className="flex gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 shadow-sm">
                          <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={info}
                        onChange={(e) => {
                          const newInfo = [...(product?.details?.information || [])];
                          newInfo[index] = e.target.value;
                          setProduct({
                            ...product,
                            details: { ...product?.details, information: newInfo }
                          });
                        }}
                        className="flex-1 border rounded-lg shadow-sm p-3 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="Enter information"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newInfo = (product?.details?.information || []).filter((_, i) => i !== index);
                          setProduct({
                            ...product,
                            details: { ...product?.details, information: newInfo }
                          });
                        }}
                        className="p-3 text-red-500 hover:text-red-700 bg-white rounded-lg transition-all duration-200 shadow-sm hover:bg-red-50"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setProduct({
                      ...product,
                      details: {
                        ...product?.details,
                        information: [...(product?.details?.information || []), '']
                      }
                    })}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-5 py-3 rounded-lg transition-all duration-200 font-medium shadow-sm"
                  >
                    <FaPlus className="text-blue-500" /> Add Information
                  </button>
                </div>
              )}

              {activeTab === 'FAQs' && (
                <div className="space-y-5">
                  {(product?.details?.faqs || []).map((faq, index) => (
                    <div key={index} className="space-y-3 p-5 border rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const newFaqs = [...(product?.details?.faqs || [])];
                            newFaqs[index] = { ...faq, question: e.target.value };
                            setProduct({
                              ...product,
                              details: { ...product?.details, faqs: newFaqs }
                            });
                          }}
                          className="flex-1 border rounded-lg shadow-sm p-3 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                          placeholder="Question"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newFaqs = (product?.details?.faqs || []).filter((_, i) => i !== index);
                            setProduct({
                              ...product,
                              details: { ...product?.details, faqs: newFaqs }
                            });
                          }}
                          className="p-3 text-red-500 hover:text-red-700 bg-white rounded-lg transition-all duration-200 shadow-sm hover:bg-red-50"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => {
                          const newFaqs = [...(product?.details?.faqs || [])];
                          newFaqs[index] = { ...faq, answer: e.target.value };
                          setProduct({
                            ...product,
                            details: { ...product?.details, faqs: newFaqs }
                          });
                        }}
                        rows={3}
                        className="w-full border rounded-lg shadow-sm p-3 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                        placeholder="Answer"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setProduct({
                      ...product,
                      details: {
                        ...product?.details,
                        faqs: [...(product?.details?.faqs || []), { question: '', answer: '' }]
                      }
                    })}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-5 py-3 rounded-lg transition-all duration-200 font-medium shadow-sm"
                  >
                    <FaPlus className="text-blue-500" /> Add FAQ
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-lg">
            <div className={`px-8 py-5 ${gradients.secondary}`}>
              <h2 className="text-xl font-bold text-white">Related Products</h2>
            </div>
            <div className="p-8 space-y-8">
              <div className="space-y-5">
                <h3 className="text-lg font-medium text-slate-800">Add Related Products</h3>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products by name or category..."
                      className="w-full border border-slate-300 rounded-l-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                      onKeyPress={(e) => e.key === 'Enter' && searchProducts()}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={searchProducts}
                    disabled={isSearching}
                    className={`px-5 py-3 border border-transparent rounded-r-lg shadow-sm text-sm font-medium ${
                      isSearching 
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                        : 'text-white bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSearching ? <FaSpinner className="animate-spin" /> : <FaSearch />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={fetchProductsByCategory}
                  disabled={isSearching || !product?.category_id}
                  className={`mt-3 w-full flex items-center justify-center gap-2 px-5 py-3 border rounded-lg shadow-sm text-sm font-medium ${
                    isSearching || !product?.category_id
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                      : 'text-white bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800'
                  }`}
                >
                  {isSearching ? <FaSpinner className="animate-spin mr-2" /> : null}
                  Find Products in Same Category
                </button>
                
                {!product?.category_id && (
                  <p className="text-xs text-amber-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                    Assign a category ID to this product to enable this feature
                  </p>
                )}

                {searchResults.length > 0 && (
                  <div className="bg-slate-50 border rounded-xl p-6 space-y-4 shadow-inner mt-6">
                    <h4 className="text-sm font-medium text-slate-700 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                      </svg>
                      Search Results ({searchResults.length} products)
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {searchResults.map(result => (
                        <div 
                          key={result.id} 
                          className="bg-white rounded-xl shadow-md p-4 flex items-center border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                        >
                          <div className="relative h-14 w-14 flex-shrink-0 mr-4 bg-slate-100 rounded-lg overflow-hidden">
                            {result.heroImages && result.heroImages[0] ? (
                              <Image 
                                src={result.heroImages[0]} 
                                alt={result.name} 
                                fill 
                                className="object-contain p-1" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-md">
                                <span className="text-slate-400 text-xs">No img</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{result.name}</p>
                            <p className="text-xs text-slate-500 truncate mt-1 flex items-center">
                              <svg className="w-3 h-3 mr-1 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                              </svg>
                              {result.category_id}
                            </p>
                          </div>
                          <div className="ml-3 flex-shrink-0 space-x-2 flex flex-col sm:flex-row gap-2">
                            <button
                              type="button"
                              onClick={() => addRelatedProduct(result)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                            >
                              Add as Related
                            </button>
                            <button
                              type="button"
                              onClick={() => addOtherProduct(result)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                            >
                              Add as &quot;You May Like&quot;
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                  </svg>
                  Selected Related Products
                </h3>
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-6 shadow-inner">
                  {product?.relatedProducts?.length > 0 ? (
                    <div className="space-y-3">
                      {product?.relatedProducts.map((productId, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                          <span className="text-slate-800 font-medium flex items-center">
                            <svg className="w-4 h-4 mr-2 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
                            </svg>
                            {String(productId)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeRelatedProduct(String(productId))}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <svg className="w-16 h-16 text-slate-300 mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path>
                      </svg>
                      <p className="text-slate-500">No related products selected yet. Search and add products above.</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                  Selected &quot;You May Also Like&quot; Products
                </h3>
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6 shadow-inner">
                  {product?.other_products?.length > 0 ? (
                    <div className="space-y-3">
                      {product?.other_products.map((productId, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                          <span className="text-slate-800 font-medium flex items-center">
                            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
                            </svg>
                            {String(productId)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeOtherProduct(String(productId))}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <svg className="w-16 h-16 text-slate-300 mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path>
                      </svg>
                      <p className="text-slate-500">No &quot;You May Also Like&quot; products selected yet. Search and add products above.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-lg">
            <div className={`px-8 py-5 ${gradients.info}`}>
              <h2 className="text-xl font-bold text-white">YouTube Link (How to Use)</h2>
            </div>
            <div className="p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 items-center">
                    <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    YouTube Video URL
                  </label>
                  <input
                    type="text"
                    value={product?.youtubeLink || ''}
                    onChange={(e) => setProduct({ ...product, youtubeLink: e.target.value })}
                    placeholder="Enter YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)"
                    className="w-full border border-slate-200 rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                
                {product?.youtubeLink && (
                  <div className="mt-5">
                    <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      Preview:
                    </h3>
                    <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden border border-slate-200 shadow-md">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${product.youtubeLink?.split('v=')[1] || ''}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          
          <div className="flex justify-end mt-10">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 text-base font-medium transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaSave className="mr-2" />
              Save Product
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  return <ProductEditForm params={params} />;
}
