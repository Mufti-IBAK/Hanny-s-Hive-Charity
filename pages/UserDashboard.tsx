
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Calendar, History, User, LogOut, AlertCircle } from 'lucide-react';
import gsap from 'gsap';

interface Pledge {
  id: string;
  amount: number;
  tier_name: string;
  status: 'active' | 'paused' | 'cancelled';
  next_payment_date: string;
}

interface Donation {
  id: string;
  amount: number;
  created_at: string;
  status: string;
  reference_id: string;
}

const UserDashboard: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [pledge, setPledge] = useState<Pledge | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const { data: pledgeData } = await supabase
          .from('pledges')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (pledgeData) setPledge(pledgeData as Pledge);

        const { data: donationData } = await supabase
          .from('donations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (donationData) setDonations(donationData as Donation[]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Animation effect
  useEffect(() => {
    if (!fetchLoading) {
        const ctx = gsap.context(() => {
            gsap.from(".dash-card", {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }
  }, [fetchLoading]);

  const handleCancelPledge = async () => {
    if (!pledge) return;
    if (window.confirm('Are you sure you want to cancel your monthly pledge? You can always reactivate it later.')) {
      try {
        const { error } = await supabase
          .from('pledges')
          .update({ status: 'cancelled' })
          .eq('id', pledge.id);
        
        if (error) throw error;
        setPledge({ ...pledge, status: 'cancelled' });
      } catch (err) {
        console.error(err);
        alert('Failed to cancel pledge.');
      }
    }
  };

  if (loading || fetchLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading your Hive...</div>;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="dash-card">
            <h1 className="text-3xl font-bold text-gray-900">My Hive Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user?.full_name}</p>
          </div>
          <button 
            onClick={signOut}
            className="dash-card flex items-center px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100 hover:text-red-600 transition"
          >
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column: Pledge Status */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Pledge Card */}
            <div className="dash-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-zinc-900 text-white">
                <h2 className="font-bold flex items-center text-lg">
                  <Heart className="h-5 w-5 mr-2 text-hive-red fill-current" /> Monthly Commitment
                </h2>
                {pledge && pledge.status === 'active' && (
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold border border-green-500/50">ACTIVE</span>
                )}
                {pledge && pledge.status !== 'active' && (
                   <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-bold">{pledge.status.toUpperCase()}</span>
                )}
                {!pledge && (
                   <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-bold">NONE</span>
                )}
              </div>
              
              <div className="p-8 text-center md:text-left">
                {pledge ? (
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">Current Pledge</p>
                      <div className="text-4xl font-bold text-hive-red">₦{pledge.amount.toLocaleString()}</div>
                      <p className="text-gray-400 text-sm mt-1">{pledge.tier_name}</p>
                    </div>
                    
                    <div className="space-y-3 w-full md:w-auto">
                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        Next Donation: <span className="font-bold ml-2 text-black">{new Date(pledge.next_payment_date).toLocaleDateString()}</span>
                      </div>
                      
                      {pledge.status === 'active' ? (
                        <div className="flex gap-2">
                           <button onClick={() => navigate('/donate')} className="flex-1 px-4 py-2 bg-black text-white text-sm font-bold rounded hover:bg-gray-800">
                             Modify Amount
                           </button>
                           <button onClick={handleCancelPledge} className="px-4 py-2 border border-gray-300 text-gray-500 text-sm font-bold rounded hover:bg-gray-50 hover:text-red-600">
                             Pause/Cancel
                           </button>
                        </div>
                      ) : (
                        <button onClick={() => navigate('/donate')} className="w-full px-4 py-2 bg-hive-red text-white text-sm font-bold rounded hover:bg-red-700">
                          Reactivate Pledge
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-6">You don't have an active monthly pledge yet. Join the hive to support orphans consistently.</p>
                    <Link to="/donate" className="inline-block bg-hive-red text-white px-8 py-3 rounded font-bold shadow-lg hover:bg-red-700 transition">
                      Start a Pledge
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Donation History */}
            <div className="dash-card bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-bold text-lg flex items-center text-gray-800">
                  <History className="h-5 w-5 mr-2 text-gray-400" /> Donation History
                </h3>
              </div>
              <div className="overflow-x-auto">
                {donations.length > 0 ? (
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                      <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Reference</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {donations.map((d) => (
                        <tr key={d.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">{new Date(d.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4 font-bold">₦{d.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 font-mono text-xs text-gray-500">{d.reference_id}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Successful
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    No donation history found.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Column: Profile & Impact */}
          <div className="space-y-8">
            
            {/* User Profile */}
            <div className="dash-card bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <User className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <div className="font-bold">{user?.full_name}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-mono">{user?.phone_number || 'N/A'}</span>
                </div>
                <button className="text-xs text-gray-400 hover:text-black underline w-full text-center">
                  Update Contact Info
                </button>
              </div>
            </div>

            {/* Impact Widget */}
            <div className="dash-card bg-black text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2 text-hive-red">The Hive Effect</h3>
                <p className="text-sm text-gray-300 mb-4">Because of donors like you, we distributed 400 school kits last month.</p>
                <Link to="/impact" className="text-xs font-bold underline decoration-hive-red hover:text-hive-red transition">View Gallery</Link>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-hive-red rounded-full opacity-20"></div>
            </div>

            {/* Support */}
            <div className="dash-card bg-red-50 rounded-xl border border-red-100 p-6 text-center">
               <AlertCircle className="h-8 w-8 text-hive-red mx-auto mb-2" />
               <h3 className="font-bold text-gray-900 mb-1">Need Help?</h3>
               <p className="text-xs text-gray-600 mb-3">Having issues with your pledge?</p>
               <Link to="/contact" className="text-sm font-bold text-hive-red hover:underline">Contact Admin</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
