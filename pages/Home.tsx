
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Hero Animation (Fade In & Slide Up)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // 2. Stats Animation (Counter Effect would go here, simplified to Fade In for now)
      gsap.from(statsRef.current, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // 3. How It Works Cards (Staggered Reveal)
      gsap.from(".step-card", {
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      });

    }, heroRef); // Scope cleanup

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col overflow-hidden bg-hive-white">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[600px] w-full">
        <img 
          src="https://picsum.photos/1920/1080?grayscale" 
          alt="Community support" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hive-charcoal via-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="hero-content max-w-4xl w-full text-center transform will-change-transform">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Supporting Orphans, Widows & The Less Privileged
            </h1>
            <p className="text-xl text-hive-gray-200 mb-8 font-light">
              We operate on trust and timeliness. Distributions delivered every <span className="font-bold underline">30th of the month</span>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/donate" className="bg-hive-gold text-hive-charcoal px-8 py-4 font-bold text-lg rounded hover:bg-opacity-90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200">
                Donate Now
              </Link>
              <Link to="/impact" className="border-2 border-hive-white text-white px-8 py-4 font-bold text-lg rounded hover:bg-white/10 transition-colors hover:-translate-y-1 transform duration-200">
                See Our Impact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div ref={statsRef} className="bg-hive-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4 group cursor-default">
            <div className="text-4xl font-bold text-hive-red mb-2 group-hover:scale-110 transition-transform duration-300">₦2.1M+</div>
            <div className="text-hive-gray-500 uppercase tracking-wider text-sm">Distributed This Year</div>
          </div>
          <div className="p-4 border-l-0 md:border-l border-hive-gray-200 group cursor-default">
            <div className="text-4xl font-bold text-hive-red mb-2 group-hover:scale-110 transition-transform duration-300">487</div>
            <div className="text-hive-gray-500 uppercase tracking-wider text-sm">Lives Touched</div>
          </div>
          <div className="p-4 border-l-0 md:border-l border-hive-gray-200 group cursor-default">
            <div className="text-4xl font-bold text-hive-red mb-2 group-hover:scale-110 transition-transform duration-300">Every 30th</div>
            <div className="text-hive-gray-500 uppercase tracking-wider text-sm">Consistent Support</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div ref={stepsRef} className="py-20 bg-hive-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-hive-charcoal mb-4">The Digital Hive Model</h2>
            <div className="h-1 w-20 bg-hive-red mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="step-card bg-hive-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-hive-gold text-6xl font-black text-white opacity-20 -mr-4 -mt-4 rotate-12 group-hover:text-hive-red/20 transition-colors">1</div>
              <div className="bg-hive-red text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-hive-gold transition-colors relative z-10">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-hive-charcoal">Give</h3>
              <p className="text-hive-gray-600 relative z-10">Join as a Hive Supporter. Make a one-time donation or start a monthly pledge to ensure sustainability.</p>
            </div>

            <div className="step-card bg-hive-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-hive-gold text-6xl font-black text-white opacity-20 -mr-4 -mt-4 rotate-12 group-hover:text-hive-red/20 transition-colors">2</div>
              <div className="bg-hive-red text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-hive-gold transition-colors relative z-10">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-hive-charcoal">Pool</h3>
              <p className="text-hive-gray-600 relative z-10">We combine individual contributions into a powerful fund. Every Naira helps build bulk support kits.</p>
            </div>

            <div className="step-card bg-hive-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-hive-gold text-6xl font-black text-white opacity-20 -mr-4 -mt-4 rotate-12 group-hover:text-hive-red/20 transition-colors">3</div>
              <div className="bg-hive-red text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-hive-gold transition-colors relative z-10">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-hive-charcoal">Distribute</h3>
              <p className="text-hive-gray-600 relative z-10">On the 30th of every month, verification teams distribute cash and kindness to those in need.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Preview */}
      <div className="py-20 bg-hive-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
               <h2 className="text-3xl font-bold text-hive-charcoal mb-2">Recent Impact</h2>
               <p className="text-hive-gray-600">Real stories from our last distribution.</p>
            </div>
            <Link to="/impact" className="hidden md:flex items-center text-hive-red font-bold hover:underline">
              View Gallery <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden h-64 md:h-80 cursor-pointer rounded-lg shadow-lg">
              <img src="https://picsum.photos/600/800?random=1" alt="Impact 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="bg-hive-red text-white text-xs px-2 py-1 uppercase font-bold tracking-wider mb-2 inline-block">Education</span>
                <h3 className="text-white text-xl font-bold">School Fees Paid for 15 Orphans</h3>
              </div>
            </div>
            <div className="relative group overflow-hidden h-64 md:h-80 cursor-pointer rounded-lg shadow-lg">
              <img src="https://picsum.photos/600/800?random=2" alt="Impact 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="bg-hive-red text-white text-xs px-2 py-1 uppercase font-bold tracking-wider mb-2 inline-block">Widows</span>
                <h3 className="text-white text-xl font-bold">Food Kits for 30 Families</h3>
              </div>
            </div>
            <div className="relative group overflow-hidden h-64 md:h-80 cursor-pointer rounded-lg shadow-lg">
              <img src="https://picsum.photos/600/800?random=3" alt="Impact 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
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
      <div className="bg-gradient-to-r from-hive-red to-hive-gold text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Hive?</h2>
          <p className="text-xl mb-8 opacity-90">Your monthly pledge of ₦5,000 can feed two orphans for a month. Start making a difference today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/donate" className="bg-hive-charcoal text-white px-8 py-3 rounded font-bold hover:bg-opacity-90 transition-colors shadow-lg">Start Monthly Pledge</Link>
             <Link to="/contact" className="bg-transparent border-2 border-white px-8 py-3 rounded font-bold hover:bg-white hover:text-hive-charcoal transition-colors">Speak to an Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
