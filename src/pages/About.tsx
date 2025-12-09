
import React, { useEffect, useRef } from 'react';
import { CheckCircle, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const admins = [
    { name: "Hanny Mustapha", role: "Founder & Lead", img: "https://picsum.photos/100/100?random=10" },
    { name: "Sarah Johnson", role: "Verification Officer", img: "https://picsum.photos/100/100?random=11" },
    { name: "David Owei", role: "Logistics", img: "https://picsum.photos/100/100?random=12" },
    { name: "Amina Yusuf", role: "Community Liaison", img: "https://picsum.photos/100/100?random=13" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Text
      gsap.from(".header-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // 2. Timeline Items
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out"
      });

      // 3. Team Cards
      gsap.from(".team-card", {
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
      });

      // 4. Progress Bar Animation
      gsap.from(barRef.current, {
        scrollTrigger: {
          trigger: ".promise-section",
          start: "top 80%",
        },
        width: "0%",
        duration: 1.5,
        ease: "power2.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white">
      {/* Header */}
      <div className="bg-zinc-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="header-anim text-4xl md:text-5xl font-bold mb-4">Our Hive Story</h1>
          <div className="header-anim h-1 w-20 bg-hive-red mb-6"></div>
          <p className="header-anim text-xl text-gray-300 max-w-2xl">
            Created for the sole purpose of supporting those in need. We are more than a charity; we are a community of consistent action.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* The 30th Model */}
        <div>
          <h2 className="text-3xl font-bold text-black mb-6">The "30th" Distribution Model</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Consistency breeds trust. We established a strict cycle to ensure our beneficiaries know exactly when help is arriving, and our donors know exactly when their impact is felt.
          </p>
          
          <div className="timeline-container space-y-8 border-l-2 border-black pl-8 ml-4">
            <div className="timeline-item relative">
              <span className="absolute -left-[41px] top-0 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</span>
              <h3 className="text-lg font-bold mb-2">Days 1-25: Collection & Pooling</h3>
              <p className="text-gray-500 text-sm">Donations are received, logged, and pooled into the central fund.</p>
            </div>
            <div className="timeline-item relative">
              <span className="absolute -left-[41px] top-0 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</span>
              <h3 className="text-lg font-bold mb-2">Days 26-29: Procurement & Verification</h3>
              <p className="text-gray-500 text-sm">Funds are converted to bulk food items, medical supplies, and cash envelopes. Beneficiary list is re-verified.</p>
            </div>
            <div className="timeline-item relative">
              <span className="absolute -left-[41px] top-0 bg-hive-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</span>
              <h3 className="text-lg font-bold mb-2 text-hive-red">Day 30: Distribution</h3>
              <p className="text-gray-500 text-sm">Teams deploy to orphanages and widow communities. Photos/Videos documented for transparency.</p>
            </div>
          </div>
        </div>

        {/* Admins */}
        <div>
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
             <h2 className="text-2xl font-bold mb-6 flex items-center">
                Meet The Hive Keepers
                <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> Verified
                </span>
             </h2>
             <div className="team-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
                {admins.map((admin, idx) => (
                    <div key={idx} className="team-card bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
                        <img src={admin.img} alt={admin.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <h4 className="font-bold text-sm">{admin.name}</h4>
                            <p className="text-xs text-gray-500">{admin.role}</p>
                            <button className="text-xs text-hive-red hover:underline mt-1">Verify ID</button>
                        </div>
                    </div>
                ))}
             </div>
             <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500 mb-3">Need to confirm a donation request?</p>
                <button className="flex items-center justify-center w-full border border-black py-2 rounded text-sm hover:bg-black hover:text-white transition-colors">
                    <Mail className="h-4 w-4 mr-2" /> Contact Admin Team
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Promise Bar */}
      <div className="promise-section bg-black text-white py-12">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-8">Our Transparency Promise</h2>
            <div className="relative pt-6 max-w-3xl mx-auto">
               <div className="flex mb-2 items-center justify-between text-xs uppercase font-bold tracking-widest text-gray-400">
                  <div className="w-[90%] text-center">Direct to Beneficiaries (90%)</div>
                  <div className="w-[10%] text-center">Logistics (10%)</div>
               </div>
               <div className="flex h-4 mb-4 overflow-hidden rounded bg-gray-700">
                  <div ref={barRef} className="w-[90%] bg-hive-red"></div>
                  <div className="w-[10%] bg-gray-500"></div>
               </div>
               <p className="text-sm text-gray-400 mt-4">We maintain minimal operational costs. The hive is built on volunteerism, not overhead.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default About;
