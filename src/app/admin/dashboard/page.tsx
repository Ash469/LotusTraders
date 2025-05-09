'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaBox, FaList, FaImage, FaComment, FaChartBar, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    // When required:true is used, we should check for authentication errors differently
    if (status !== 'authenticated' && status !== 'loading') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' })
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on mobile when changing tabs
  };

  return (
    <div className="min-h-screen bg-slate-50 flex relative">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-200 ease-in-out
      `}>
        <div className="mb-8 p-4 pt-16 lg:pt-4 flex flex-col"> {/* Added pt-16 for mobile */}
          <h2 className="text-white text-lg font-semibold">Admin Panel</h2>
          {session?.user?.email && (
            <p className="text-gray-400 text-sm mt-1">{session.user.email}</p>
          )}
        </div>
        
        <nav className="space-y-2">
          <SidebarButton 
            active={activeTab === 'dashboard'} 
            icon={<FaChartBar />}
            onClick={() => handleTabChange('dashboard')}
          >
            Dashboard
          </SidebarButton>
          
          <SidebarButton 
            active={activeTab === 'products'} 
            icon={<FaBox />}
            onClick={() => handleTabChange('products')}
          >
            Products
          </SidebarButton>
          
          <SidebarButton 
            active={activeTab === 'categories'} 
            icon={<FaList />}
            onClick={() => handleTabChange('categories')}
          >
            Categories
          </SidebarButton>
          
          <SidebarButton 
            active={activeTab === 'banners'} 
            icon={<FaImage />}
            onClick={() => handleTabChange('banners')}
          >
            Banners
          </SidebarButton>
          
          <SidebarButton 
            active={activeTab === 'reviews'} 
            icon={<FaComment />}
            onClick={() => handleTabChange('reviews')}
          >
            Reviews
          </SidebarButton>
          
          <SidebarButton 
            active={activeTab === 'enquiries'} 
            icon={<FaEnvelope />}
            onClick={() => handleTabChange('enquiries')}
          >
            Enquiries
          </SidebarButton>

          <div className="pt-4 mt-4 border-t border-gray-700">
            <SidebarButton 
              active={false} 
              icon={<FaSignOutAlt />}
              onClick={handleSignOut}
            >
              Sign Out
            </SidebarButton>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 w-full lg:w-auto">
        <div className="p-4 lg:p-8 mt-14 lg:mt-0">
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            {activeTab === 'dashboard' && <DashboardOverview />}
            {activeTab === 'products' && <ProductsManager />}
            {activeTab === 'categories' && <CategoriesManager />}
            {activeTab === 'banners' && <BannersManager />}
            {activeTab === 'reviews' && <ReviewsManager />}
            {activeTab === 'enquiries' && <EnquiriesManager />}
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
          ? 'bg-blue-600 text-white' 
          : 'text-gray-300 hover:bg-gray-800'
      }`}
    >
      {icon}
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
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-lg border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
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
      <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard 
            title="Total Products" 
            value={stats?.totalProducts.toString() || '0'} 
            icon={<FaBox className="text-blue-500" size={24} />}
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
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h3 className="text-gray-600 font-medium">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-900">
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
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Products Management</h2>
        <button 
          onClick={handleAddNew} 
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Product
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.rating}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
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
        <h2 className="text-2xl font-semibold text-gray-800">Categories Management</h2>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products Count</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{category.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.products?.length || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="text-blue-600 hover:text-blue-900"
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
      <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Enquiries Management</h2>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="hover:bg-gray-50">
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
