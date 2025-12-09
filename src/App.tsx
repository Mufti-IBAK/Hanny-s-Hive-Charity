
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Instagram, Twitter, ShieldCheck } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Home';
import About from './pages/About';
import Impact from './pages/Impact';
import Donate from './pages/Donate';
import Transparency from './pages/Transparency';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import UserDashboard from './pages/UserDashboard';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Impact', path: '/impact' },
    { name: 'Transparency', path: '/transparency' },
    { name: 'Donate', path: '/donate', isCta: true },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/assets/logo.jpg" 
              alt="Hanny's Hive Logo" 
              className="h-10 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden font-bold text-xl tracking-tight text-hive-red">Hanny's Hive</span> 
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    link.isCta 
                      ? 'bg-hive-red text-white hover:bg-red-700' 
                      : isActive(link.path) 
                        ? 'text-hive-red' 
                        : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  {isAdmin ? (
                     <Link to="/admin" className="text-white bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                       Admin Dashboard
                     </Link>
                  ) : (
                    <Link to="/dashboard" className="text-gray-400 hover:text-white px-3 py-2 text-xs">
                       My Hive
                    </Link>
                  )}
                </>
              ) : (
                <Link to="/auth" className="text-gray-500 hover:text-gray-300 px-3 py-2 text-xs">Login</Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-900 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                   link.isCta 
                      ? 'bg-hive-red text-white' 
                      : isActive(link.path) 
                        ? 'text-hive-red' 
                        : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
             {user ? (
               <div className="border-t border-gray-700 pt-2 mt-2">
                 <Link to={isAdmin ? "/admin" : "/dashboard"} className="block px-3 py-2 text-white font-bold">
                   {isAdmin ? 'Admin Dashboard' : 'My Hive Dashboard'}
                 </Link>
                 <button onClick={signOut} className="block w-full text-left px-3 py-2 text-gray-500 text-sm">Sign Out</button>
               </div>
             ) : (
               <Link to="/auth" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-500 text-sm">Login / Sign Up</Link>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-8 border-t border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/assets/logo.jpg" 
                alt="Logo" 
                className="h-8 w-auto grayscale opacity-80"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden font-bold text-lg text-hive-red">Hanny's Hive</span>
            </div>
            <p className="text-gray-400 text-sm">
              Uplifting orphans, widows, and the less privileged through sustainable support.
            </p>
          </div>
          
          <div>
            <h3 className="text-hive-red font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white">Our Story</Link></li>
              <li><Link to="/impact" className="hover:text-white">Impact Gallery</Link></li>
              <li><Link to="/donate" className="hover:text-white">Make a Pledge</Link></li>
              <li><Link to="/transparency" className="hover:text-white">Financial Reports</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-hive-red font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center"><Phone className="h-4 w-4 mr-2"/> +234 800 HIVE HELP</li>
              <li><a href="mailto:admin@hannyshive.org" className="hover:text-white">admin@hannyshive.org</a></li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>

          <div>
             <h3 className="text-hive-red font-semibold mb-4">Follow Us</h3>
             <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><Instagram className="h-6 w-6" /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Twitter className="h-6 w-6" /></a>
             </div>
             <div className="mt-6 flex items-center text-xs text-gray-500">
                <ShieldCheck className="h-4 w-4 mr-1 text-green-500" /> Verified Charity
             </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Hanny's Hive. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen bg-white flex flex-col font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
