'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaBox, FaList, FaImage, FaComment, FaChartBar, FaEnvelope, FaPen } from 'react-icons/fa'
import { motion } from 'framer-motion'
import BlogsManager from './BlogsManager'
import AdminNavBar from '@/components/admin/AdminNavBar'

export default function AdminDashboard() {
  const { status } = useSession({ required: true })
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (status !== 'authenticated' && status !== 'loading') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-theme-text-muted">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-theme-bg flex flex-col pt-20">
      <AdminNavBar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-theme-surface border-r border-theme-border transform 
          ${isSidebarOpen ? 'translate-x-0 pt-20' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-200 ease-in-out h-[calc(100vh-5rem)] overflow-y-auto
        `}>
          <div className="mb-6 p-4 pt-6 lg:pt-6 flex flex-col">
            <h2 className="text-theme-text text-lg font-semibold tracking-wide">Admin Dashboard</h2>
            <div className="h-1 w-10 bg-accent mt-2 rounded-full"></div>
          </div>
          
          <nav className="space-y-1 px-3">
            <SidebarButton active={activeTab === 'dashboard'} icon={<FaChartBar />} onClick={() => handleTabChange('dashboard')}>
              Dashboard
            </SidebarButton>
            
            <SidebarButton active={activeTab === 'products'} icon={<FaBox />} onClick={() => handleTabChange('products')}>
              Products
            </SidebarButton>
            
            <SidebarButton active={activeTab === 'categories'} icon={<FaList />} onClick={() => handleTabChange('categories')}>
              Categories
            </SidebarButton>
            
            <SidebarButton active={activeTab === 'banners'} icon={<FaImage />} onClick={() => handleTabChange('banners')}>
              Banners
            </SidebarButton>
            
            <SidebarButton active={activeTab === 'reviews'} icon={<FaComment />} onClick={() => handleTabChange('reviews')}>
              Reviews
            </SidebarButton>
            
            <SidebarButton active={activeTab === 'enquiries'} icon={<FaEnvelope />} onClick={() => handleTabChange('enquiries')}>
              Enquiries
            </SidebarButton>

            <SidebarButton active={activeTab === 'blogs'} icon={<FaPen />} onClick={() => handleTabChange('blogs')}>
              Blogs
            </SidebarButton>
          </nav>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden mt-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 w-full lg:w-auto h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="p-4 lg:p-8">
            <div className="bg-theme-surface rounded-xl shadow-lg border border-theme-border p-4 lg:p-8 transition-colors duration-300">
              {activeTab === 'dashboard' && <DashboardOverview />}
              {activeTab === 'products' && <ProductsManager />}
              {activeTab === 'categories' && <CategoriesManager />}
              {activeTab === 'banners' && <BannersManager />}
              {activeTab === 'reviews' && <ReviewsManager />}
              {activeTab === 'enquiries' && <EnquiriesManager />}
              {activeTab === 'blogs' && <BlogsManager />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SidebarButtonProps {
  children: React.ReactNode;
  active: boolean;
  icon: React.ReactNode;
  onClick: () => void;
}

function SidebarButton({ children, active, icon, onClick }: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 w-full px-4 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-accent/10 text-accent dark:bg-accent/20 border border-accent/20' 
          : 'text-theme-text-muted hover:bg-theme-bg hover:text-theme-text'
      }`}
    >
      <span className={active ? 'text-accent' : ''}>{icon}</span>
      <span>{children}</span>
    </button>
  )
}

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  pendingEnquiries: number;
}

function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/stats')
        if (!response.ok) throw new Error('Failed to fetch stats')
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError('Failed to load dashboard statistics')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-theme-text">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-theme-bg p-6 rounded-lg border border-theme-border animate-pulse">
              <div className="h-4 bg-theme-border rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-theme-border rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="text-blue-500 hover:text-blue-700"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-semibold text-theme-text">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard 
            title="Total Products" 
            value={stats?.totalProducts.toString() || '0'} 
             icon={<FaBox className="text-accent" size={24} />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard 
            title="Total Categories" 
            value={stats?.totalCategories.toString() || '0'} 
            icon={<FaList className="text-green-500" size={24} />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard 
            title="Pending Enquiries" 
            value={stats?.pendingEnquiries.toString() || '0'} 
            icon={<FaEnvelope className="text-yellow-500" size={24} />}
          />
        </motion.div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-theme-surface p-6 rounded-lg border border-theme-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h3 className="text-theme-text-muted font-medium">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-theme-text">
        {value.padStart(2, '0')}
      </p>
    </div>
  )
}

interface Product {
  id: number;
  name: string;
  category_id: string;
  rating: number;
}

function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/admin/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    router.push(`/admin/products/${product.id}`);
  };

  const handleAddNew = () => {
    router.push('/admin/products/new');
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl lg:text-2xl font-semibold text-theme-text">Products Management</h2>
        <button 
          onClick={handleAddNew} 
          className="w-full sm:w-auto bg-accent text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Add New Product
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-theme-border">
            <thead className="bg-theme-bg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-muted uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-muted uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-muted uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-theme-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-theme-surface divide-y divide-theme-border text-theme-text">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.rating}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-accent hover:text-amber-600 mr-4"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface Category {
  id: string;
  name: string;
  description: string;
  products?: Product[];
}

function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/admin/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleEdit = (categoryId: string) => {
    router.push(`/admin/categories/${categoryId}`);
  };

  const handleAddNew = () => {
    router.push('/admin/categories/new');
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-theme-text">Categories Management</h2>
        <button 
          onClick={handleAddNew}
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Add New Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-theme-border">
          <thead className="bg-theme-bg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-muted uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-muted uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-muted uppercase tracking-wider">Products Count</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-theme-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-theme-surface divide-y divide-theme-border text-theme-text">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-theme-bg">
                <td className="px-6 py-4 whitespace-nowrap">{category.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.products?.length || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="text-accent hover:text-amber-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BannersManager() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Banners Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add New Banner
        </button>
      </div>
      {/* Add banner management interface */}
    </div>
  )
}

function ReviewsManager() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Reviews Management</h2>
      {/* Add reviews management interface */}
    </div>
  )
}

interface Enquiry {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  product: {
    id: string;
    name: string;
    quantity: number;
  };
  createdAt: string;
  status: 'new' | 'resolved';
}

function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/admin/enquiries');
      if (!response.ok) throw new Error('Failed to fetch enquiries');
      const data = await response.json();
      setEnquiries(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'new' | 'resolved') => {
    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');
      
      // Update local state
      setEnquiries(enquiries.map(enquiry => 
        enquiry._id === id ? { ...enquiry, status: newStatus } : enquiry
      ));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Loading enquiries...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-semibold text-theme-text">Enquiries Management</h2>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-theme-border">
            <thead className="bg-theme-bg">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-theme-text-muted uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-theme-text-muted uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-theme-text-muted uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-theme-text-muted uppercase">Qty</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-theme-text-muted uppercase">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-theme-text-muted uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-theme-text-muted uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-theme-surface divide-y divide-theme-border text-theme-text">
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="hover:bg-theme-bg">
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    {enquiry.firstName} {enquiry.lastName}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    {enquiry.product.name}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    {enquiry.product.quantity}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 text-sm">
                    <div>{enquiry.email}</div>
                    <div>{enquiry.phone}</div>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${enquiry.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    <button
                      onClick={() => handleStatusChange(
                        enquiry._id,
                        enquiry.status === 'new' ? 'resolved' : 'new'
                      )}
                      className={`px-3 py-1 rounded text-white text-xs font-medium
                        ${enquiry.status === 'new' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-yellow-600 hover:bg-yellow-700'
                        }`}
                    >
                      {enquiry.status === 'new' ? 'Mark Resolved' : 'Mark as New'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
