
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { 
  Users, Calendar, Image, LogOut, 
  Menu, ChevronLeft, Search, Mail, AlertCircle, CheckCircle, Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AdminDonorView } from '../types';
import gsap from 'gsap';

// Components for different Admin Views
const Overview: React.FC<{ users: AdminDonorView[] }> = ({ users }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".overview-card", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const unpaidCount = users.filter(u => u.current_month_status === 'Unpaid' && u.pledge_status === 'active').length;
  const totalActive = users.filter(u => u.pledge_status === 'active').length;
  
  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="overview-card bg-white p-6 rounded-xl shadow-sm border-l-4 border-hive-red">
        <div className="text-gray-500 text-sm font-bold uppercase mb-1">Unpaid Pledges (This Month)</div>
        <div className="text-3xl font-bold text-hive-red">{unpaidCount}</div>
        <div className="text-xs text-gray-500 mt-2">Needs reminder</div>
      </div>
      <div className="overview-card bg-white p-6 rounded-xl shadow-sm border-l-4 border-black">
        <div className="text-gray-500 text-sm font-bold uppercase mb-1">Active Hive Members</div>
        <div className="text-3xl font-bold">{totalActive}</div>
        <div className="text-xs text-green-500 mt-2 font-bold">Consistent Donors</div>
      </div>
      <div className="overview-card bg-white p-6 rounded-xl shadow-sm border-l-4 border-gray-400">
        <div className="text-gray-500 text-sm font-bold uppercase mb-1">Next Distribution</div>
        <div className="text-3xl font-bold">30th</div>
        <div className="text-xs text-gray-500 mt-2">Prepare Logistics</div>
      </div>
    </div>
  );
};

const UserManagement: React.FC<{ users: AdminDonorView[] }> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'All' | 'Unpaid'>('All');
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(tableRef.current, { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" });
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' ? true : user.current_month_status === 'Unpaid' && user.pledge_status === 'active';
    return matchesSearch && matchesFilter;
  });

  const sendReminder = (email: string, name: string) => {
    const subject = "Gentle Reminder: Hanny's Hive Monthly Pledge";
    const body = `Dear ${name},%0D%0A%0D%0AHope this meets you well. We are preparing for the distribution on the 30th and noticed your pledge for this month is still pending.%0D%0A%0D%0AYour support means the world to our beneficiaries.%0D%0A%0D%0AWarm regards,%0D%0AHanny's Hive Team`;
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  return (
    <div ref={tableRef} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="font-bold text-lg">Hive Donors Database</h3>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search name or email..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-hive-red focus:border-hive-red w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setFilter(filter === 'All' ? 'Unpaid' : 'All')}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${filter === 'Unpaid' ? 'bg-hive-red text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {filter === 'Unpaid' ? 'Show All' : 'Show Unpaid Only'}
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Name / Contact</th>
              <th className="px-6 py-4">Pledge Tier</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Donation</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">{user.full_name || 'Anonymous'}</div>
                  <div className="text-gray-500 text-xs">{user.email}</div>
                  <div className="text-gray-500 text-xs">{user.phone_number}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">₦{user.pledge_amount?.toLocaleString() || 0}</div>
                  <div className="text-xs text-gray-400">{user.tier_name || 'Custom'}</div>
                </td>
                <td className="px-6 py-4">
                  {user.current_month_status === 'Paid' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" /> Paid
                    </span>
                  ) : user.pledge_status === 'active' ? (
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <AlertCircle className="h-3 w-3 mr-1" /> Unpaid
                    </span>
                  ) : (
                    <span className="text-gray-400">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {user.last_donation_date ? new Date(user.last_donation_date).toLocaleDateString() : 'Never'}
                </td>
                <td className="px-6 py-4">
                  {user.current_month_status === 'Unpaid' && user.pledge_status === 'active' && (
                    <button 
                      onClick={() => sendReminder(user.email, user.full_name)}
                      className="text-hive-red hover:text-red-800 font-bold text-xs flex items-center border border-hive-red px-3 py-1 rounded hover:bg-red-50"
                    >
                      <Mail className="h-3 w-3 mr-1" /> Remind
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GalleryUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Orphans',
    date: '',
    description: '',
    image_url: '' 
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(containerRef.current, { opacity: 0, scale: 0.95, duration: 0.5, ease: "back.out(1.7)" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i'); 

    if (!urlPattern.test(formData.image_url)) {
      setErrorMsg("Please enter a valid Image URL (must start with http/https).");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from('impact_stories').insert([{
        title: formData.title,
        category: formData.category,
        date_distributed: formData.date,
        description: formData.description,
        image_url: formData.image_url
      }]);

      if (error) throw error;
      alert('Story added successfully!');
      setFormData({ title: '', category: 'Orphans', date: '', description: '', image_url: '' });
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h3 className="font-bold text-xl mb-6 flex items-center">
        <Upload className="h-5 w-5 mr-2" /> Add New Impact Story
      </h3>
      {errorMsg && <div className="mb-4 bg-red-100 text-red-700 p-3 rounded text-sm">{errorMsg}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Story Title</label>
          <input 
            required
            type="text" 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-hive-red focus:border-hive-red"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-hive-red"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option>Orphans</option>
              <option>Widows</option>
              <option>Community</option>
              <option>Education</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Distributed</label>
            <input 
              required
              type="date" 
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-hive-red"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Direct Link)</label>
          <div className="flex gap-2">
            <input 
              required
              type="url" 
              placeholder="https://..." 
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-hive-red"
              value={formData.image_url}
              onChange={e => setFormData({...formData, image_url: e.target.value})}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Host images on Cloudinary or Imgur for now.</p>
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
           <textarea 
             required
             rows={4}
             className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-hive-red"
             value={formData.description}
             onChange={e => setFormData({...formData, description: e.target.value})}
           ></textarea>
        </div>

        <button 
          disabled={loading}
          className="w-full bg-black text-white font-bold py-3 rounded hover:bg-gray-800 transition flex justify-center items-center"
        >
          {loading ? 'Uploading...' : 'Publish to Gallery'}
        </button>
      </form>
    </div>
  );
};


// MAIN ADMIN LAYOUT
const Admin: React.FC = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'gallery'>('dashboard');
  const [donorData, setDonorData] = useState<AdminDonorView[]>([]);

  // Auth Protection
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth'); // Redirect to login if not admin
    }
  }, [user, isAdmin, loading, navigate]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      if (isAdmin) {
        // Fetch from our smart view
        const { data, error } = await supabase
          .from('admin_donor_overview')
          .select('*');
        if (!error && data) {
           // Mapping raw data to type safely
           setDonorData(data as any[]);
        }
      }
    };
    fetchData();
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Hive Access...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* Sidebar */}
      <div className={`bg-black text-white transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed h-full z-20`}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="font-bold text-xl">Hive Admin</span>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-gray-800 rounded">
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center w-full p-3 rounded transition-colors ${activeTab === 'dashboard' ? 'bg-hive-red text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
          >
            <Calendar className="h-5 w-5 mr-3" />
            {isSidebarOpen && <span>Dashboard</span>}
          </button>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center w-full p-3 rounded transition-colors ${activeTab === 'users' ? 'bg-hive-red text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
          >
            <Users className="h-5 w-5 mr-3" />
            {isSidebarOpen && <span>Donors & Pledges</span>}
          </button>

          <button 
             onClick={() => setActiveTab('gallery')}
             className={`flex items-center w-full p-3 rounded transition-colors ${activeTab === 'gallery' ? 'bg-hive-red text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
          >
            <Image className="h-5 w-5 mr-3" />
            {isSidebarOpen && <span>Gallery Upload</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button onClick={() => signOut()} className="flex items-center text-gray-400 hover:text-white w-full p-2">
            <LogOut className="h-5 w-5 mr-3" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'users' && 'Donor Management'}
              {activeTab === 'gallery' && 'Content Manager'}
            </h1>
            <p className="text-sm text-gray-500">Welcome back, {user?.full_name}</p>
          </div>
          <div className="flex items-center space-x-4">
             <span className="bg-black text-white text-xs px-3 py-1 rounded-full">Admin Access</span>
          </div>
        </div>

        {/* Dynamic Content */}
        {activeTab === 'dashboard' && <Overview users={donorData} />}
        {activeTab === 'users' && <UserManagement users={donorData} />}
        {activeTab === 'gallery' && <GalleryUpload />}

      </div>
    </div>
  );
};

export default Admin;
