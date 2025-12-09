import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full">
        <img 
          src="https://picsum.photos/1920/1080?grayscale" 
          alt="Community support" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="bg-hive-red/90 p-8 md:p-12 max-w-4xl w-full text-center shadow-2xl backdrop-blur-sm">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Supporting Orphans, Widows & The Less Privileged
            </h1>
            <p className="text-xl text-white/90 mb-8 font-light">
              We operate on trust and timeliness. Distributions delivered every <span className="font-bold underline">30th of the month</span>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/donate" className="bg-white text-hive-red px-8 py-4 font-bold text-lg rounded hover:bg-gray-100 transition-colors">
                Donate Now
              </Link>
              <Link to="/impact" className="border-2 border-white text-white px-8 py-4 font-bold text-lg rounded hover:bg-white/10 transition-colors">
                See Our Impact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <div className="text-4xl font-bold text-hive-red mb-2">₦2.1M+</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Distributed This Year</div>
          </div>
          <div className="p-4 border-l-0 md:border-l border-gray-800">
            <div className="text-4xl font-bold text-hive-red mb-2">487</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Lives Touched</div>
          </div>
          <div className="p-4 border-l-0 md:border-l border-gray-800">
            <div className="text-4xl font-bold text-hive-red mb-2">Every 30th</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Consistent Support</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">The Digital Hive Model</h2>
            <div className="h-1 w-20 bg-hive-red mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 border-2 border-black hover:border-hive-red transition-colors group">
              <div className="bg-black text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-hive-red transition-colors">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Give</h3>
              <p className="text-gray-600">Join as a Hive Supporter. Make a one-time donation or start a monthly pledge to ensure sustainability.</p>
            </div>

            <div className="bg-white p-8 border-2 border-black hover:border-hive-red transition-colors group">
              <div className="bg-black text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-hive-red transition-colors">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Pool</h3>
              <p className="text-gray-600">We combine individual contributions into a powerful fund. Every Naira helps build bulk support kits.</p>
            </div>

            <div className="bg-white p-8 border-2 border-black hover:border-hive-red transition-colors group">
              <div className="bg-black text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-hive-red transition-colors">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Distribute</h3>
              <p className="text-gray-600">On the 30th of every month, verification teams distribute cash and kindness to those in need.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Preview */}
      <div className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
               <h2 className="text-3xl font-bold text-black mb-2">Recent Impact</h2>
               <p className="text-gray-600">Real stories from our last distribution.</p>
            </div>
            <Link to="/impact" className="hidden md:flex items-center text-hive-red font-bold hover:underline">
              View Gallery <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden h-64 md:h-80 cursor-pointer">
              <img src="https://picsum.photos/600/800?random=1" alt="Impact 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="bg-hive-red text-white text-xs px-2 py-1 uppercase font-bold tracking-wider mb-2 inline-block">Education</span>
                <h3 className="text-white text-xl font-bold">School Fees Paid for 15 Orphans</h3>
              </div>
            </div>
            <div className="relative group overflow-hidden h-64 md:h-80 cursor-pointer">
              <img src="https://picsum.photos/600/800?random=2" alt="Impact 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="bg-hive-red text-white text-xs px-2 py-1 uppercase font-bold tracking-wider mb-2 inline-block">Widows</span>
                <h3 className="text-white text-xl font-bold">Food Kits for 30 Families</h3>
              </div>
            </div>
            <div className="relative group overflow-hidden h-64 md:h-80 cursor-pointer">
              <img src="https://picsum.photos/600/800?random=3" alt="Impact 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="bg-hive-red text-white text-xs px-2 py-1 uppercase font-bold tracking-wider mb-2 inline-block">Health</span>
                <h3 className="text-white text-xl font-bold">Emergency Medical Aid</h3>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/impact" className="inline-flex items-center text-hive-red font-bold">
                View All Stories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-hive-red text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Hive?</h2>
          <p className="text-xl mb-8 opacity-90">Your monthly pledge of ₦5,000 can feed two orphans for a month. Start making a difference today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/donate" className="bg-black text-white px-8 py-3 rounded font-bold hover:bg-gray-900 transition-colors">Start Monthly Pledge</Link>
             <Link to="/contact" className="bg-transparent border-2 border-white px-8 py-3 rounded font-bold hover:bg-white hover:text-hive-red transition-colors">Speak to an Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;