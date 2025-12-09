
import React, { useState, useEffect, useRef } from 'react';
import { DonationTier } from '../types';
import { Check, Heart, Shield, Lock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Donate: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form State
  const [donorDetails, setDonorDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isAnonymous: false
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const names = user.full_name?.split(' ') || ['', ''];
      setDonorDetails(prev => ({
        ...prev,
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  useEffect(() => {
      const ctx = gsap.context(() => {
          gsap.from(".donate-header > *", { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" });
          gsap.from(".tier-card", { y: 50, opacity: 0, stagger: 0.15, duration: 0.6, delay: 0.2, ease: "back.out(1.5)" });
          gsap.from(".donate-form", { y: 50, opacity: 0, duration: 0.8, delay: 0.5, ease: "power2.out" });
      }, containerRef);
      return () => ctx.revert();
  }, []);

  const tiers: DonationTier[] = [
    {
      amount: 5000,
      label: 'Seed Plan',
      description: 'Feeds 2 orphans monthly',
      theme: 'red'
    },
    {
      amount: 10000,
      label: 'Hive Plan',
      description: 'Supports 1 widow + 2 children',
      theme: 'black'
    },
    {
      amount: 25000,
      label: 'Queen Plan',
      description: 'Transforms an entire family situation',
      theme: 'white'
    }
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setDonorDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const amount = selectedAmount || Number(customAmount);
    if (amount <= 0) {
      setError('Please select or enter a valid donation amount.');
      setLoading(false);
      return;
    }
    if (!donorDetails.firstName.trim() || !donorDetails.lastName.trim()) {
      setError('Please provide your full name.');
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorDetails.email)) {
      setError('Please provide a valid email address.');
      setLoading(false);
      return;
    }

    try {
      if (frequency === 'monthly') {
        if (!user) {
          alert("To set up a monthly pledge, please create an account or sign in first.");
          navigate('/auth');
          return;
        }

        const { data: existingPledge } = await supabase
          .from('pledges')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();

        if (existingPledge) {
          const confirmUpdate = window.confirm("You already have an active pledge. Do you want to update it?");
          if (!confirmUpdate) {
            setLoading(false);
            return;
          }
          const { error: updateError } = await supabase
            .from('pledges')
            .update({ 
              amount: amount, 
              tier_name: tiers.find(t => t.amount === amount)?.label || 'Custom' 
            })
            .eq('id', existingPledge.id);
          
          if (updateError) throw updateError;
        } else {
          const { error: insertError } = await supabase
            .from('pledges')
            .insert([{
              user_id: user.id,
              amount: amount,
              tier_name: tiers.find(t => t.amount === amount)?.label || 'Custom',
              status: 'active',
              next_payment_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
            }]);
            
          if (insertError) throw insertError;
        }
      } else {
        const { error: donationError } = await supabase
          .from('donations')
          .insert([{
            user_id: user?.id || null,
            amount: amount,
            status: 'successful',
            reference_id: `REF-${Date.now()}`,
            is_anonymous: donorDetails.isAnonymous,
            message: `Donation by ${donorDetails.firstName}`
          }]);
          
        if (donationError) throw donationError;
      }

      setSuccess(true);
      if(user) setTimeout(() => navigate('/dashboard'), 2000);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full border-t-4 border-green-500 animate-fade-up">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank You, {donorDetails.firstName}!</h2>
          <p className="text-gray-600 mb-6">
            {frequency === 'monthly' 
              ? 'Your monthly pledge has been set up successfully. Welcome to the Hive family.' 
              : 'Your donation has been received. You are making a real difference.'}
          </p>
          <button 
            onClick={() => navigate(user ? '/dashboard' : '/')}
            className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="donate-header text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Join The Hive</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your support method. 100% of donations go directly to the project fund.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm inline-flex">
            <button
              onClick={() => setFrequency('one-time')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                frequency === 'one-time' 
                  ? 'bg-black text-white shadow-md' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              One-Time Gift
            </button>
            <button
              onClick={() => setFrequency('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center ${
                frequency === 'monthly' 
                  ? 'bg-hive-red text-white shadow-md' 
                  : 'text-gray-500 hover:text-hive-red'
              }`}
            >
              Monthly Pledge <Heart className="ml-2 h-3 w-3 fill-current" />
            </button>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.amount}
              onClick={() => handleAmountSelect(tier.amount)}
              className={`tier-card cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 transform hover:-translate-y-1 ${
                selectedAmount === tier.amount 
                  ? 'border-hive-red ring-2 ring-hive-red ring-opacity-20 shadow-xl scale-105' 
                  : 'border-transparent bg-white shadow-md hover:shadow-lg'
              } ${tier.theme === 'black' && selectedAmount !== tier.amount ? 'bg-zinc-900 text-white hover:bg-black' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className={`font-bold text-lg ${tier.theme === 'black' && selectedAmount !== tier.amount ? 'text-white' : 'text-black'}`}>
                    {tier.label}
                </h3>
                {selectedAmount === tier.amount && <div className="bg-hive-red text-white rounded-full p-1"><Check className="h-4 w-4" /></div>}
              </div>
              <div className={`text-3xl font-bold mb-2 ${tier.theme === 'black' && selectedAmount !== tier.amount ? 'text-white' : 'text-hive-red'}`}>
                ₦{tier.amount.toLocaleString()}
              </div>
              <p className={`text-sm ${tier.theme === 'black' && selectedAmount !== tier.amount ? 'text-gray-400' : 'text-gray-500'}`}>
                {tier.description}
              </p>
            </div>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="donate-form bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-12">
            <label className="block text-sm font-medium text-gray-700 mb-2">Or enter a custom amount (₦)</label>
            <input
              type="number"
              min="100"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="e.g. 50000"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-hive-red focus:border-hive-red"
            />
        </div>

        {/* Donor Form */}
        <div className="donate-form bg-white p-8 rounded-xl shadow-lg border-t-4 border-hive-red">
          <h3 className="text-2xl font-bold mb-6 flex items-center justify-between">
            <span>Complete Donation</span>
            {!user && frequency === 'monthly' && <span className="text-xs font-normal text-hive-red bg-red-50 px-2 py-1 rounded"><Lock className="inline h-3 w-3 mr-1"/> Login Required for Monthly</span>}
          </h3>
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleDonation} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={donorDetails.firstName}
                  onChange={handleInputChange}
                  readOnly={!!user}
                  className={`w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-hive-red focus:border-hive-red outline-none transition ${user ? 'bg-gray-100' : ''}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={donorDetails.lastName}
                  onChange={handleInputChange}
                  readOnly={!!user}
                  className={`w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-hive-red focus:border-hive-red outline-none transition ${user ? 'bg-gray-100' : ''}`} 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={donorDetails.email}
                onChange={handleInputChange}
                readOnly={!!user}
                className={`w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-hive-red focus:border-hive-red outline-none transition ${user ? 'bg-gray-100' : ''}`} 
              />
            </div>

            <div className="flex items-start">
               <div className="flex items-center h-5">
                 <input 
                    id="isAnonymous" 
                    name="isAnonymous"
                    type="checkbox" 
                    checked={donorDetails.isAnonymous}
                    onChange={handleInputChange}
                    className="focus:ring-hive-red h-4 w-4 text-hive-red border-gray-300 rounded" 
                  />
               </div>
               <div className="ml-3 text-sm">
                 <label htmlFor="isAnonymous" className="font-medium text-gray-700">Make this donation anonymous</label>
               </div>
             </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-hive-red text-white font-bold py-4 rounded-md hover:bg-red-700 transition-all flex items-center justify-center text-lg shadow-lg disabled:opacity-50"
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <Heart className="mr-2 h-5 w-5 fill-white" />
                  {frequency === 'monthly' ? 'Start Monthly Pledge' : 'Donate Now'} of ₦{(selectedAmount || Number(customAmount) || 0).toLocaleString()}
                </>
              )}
            </button>
            
            <div className="flex items-center justify-center text-xs text-gray-400 mt-4">
               <Shield className="h-3 w-3 mr-1" /> Secured by Flutterwave/Paystack. 256-bit SSL Encrypted.
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Donate;
