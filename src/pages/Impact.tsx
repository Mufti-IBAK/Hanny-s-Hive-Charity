
import React, { useState, useEffect, useRef } from 'react';
import { ImpactStory } from '../types';
import { Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Impact: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Orphans', 'Widows', 'Community', 'Education'];

  // Mock Data
  const stories: ImpactStory[] = [
    { id: '1', title: 'School Fees for Lekki Orphanage', category: 'Education', date_distributed: '30th Sept 2023', image_url: 'https://picsum.photos/600/600?random=1', description: 'Covered tuition for 20 children for the term.' },
    { id: '2', title: 'Food Distribution at Yaba', category: 'Widows', date_distributed: '30th Oct 2023', image_url: 'https://picsum.photos/600/600?random=2', description: 'Distributed 50 bags of rice and oil.' },
    { id: '3', title: 'Medical Outreach', category: 'Community', date_distributed: '30th Aug 2023', image_url: 'https://picsum.photos/600/600?random=3', description: 'Free malaria testing and drugs.' },
    { id: '4', title: 'Baby Supplies', category: 'Orphans', date_distributed: '30th Nov 2023', image_url: 'https://picsum.photos/600/600?random=4', description: 'Diapers and formula for the infant ward.' },
    { id: '5', title: 'Skill Acquisition Workshop', category: 'Widows', date_distributed: '30th July 2023', image_url: 'https://picsum.photos/600/600?random=5', description: 'Soap making training for 15 women.' },
    { id: '6', title: 'Renovation of Dormitory', category: 'Orphans', date_distributed: '30th June 2023', image_url: 'https://picsum.photos/600/600?random=6', description: 'Fixed leaking roofs before rainy season.' },
  ];

  const filteredStories = filter === 'All' ? stories : stories.filter(s => s.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".gallery-card", {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all" 
        });
    }, containerRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">Impact Gallery</h1>
          <p className="text-gray-500">Visual proof of your kindness. Updated monthly.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1 rounded-full text-sm font-semibold transition-all border ${
                filter === cat 
                  ? 'bg-hive-red text-white border-hive-red' 
                  : 'bg-white text-gray-600 border-gray-300 hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div key={story.id} className="gallery-card group relative bg-white border border-gray-200 overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img src={story.image_url} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-hive-red uppercase tracking-wider">{story.category}</span>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Calendar className="h-3 w-3 mr-1" /> {story.date_distributed}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-hive-red transition-colors">{story.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{story.description}</p>
                <button className="mt-4 text-sm font-bold underline decoration-hive-red underline-offset-4 hover:text-hive-red">
                  View Full Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Impact;
