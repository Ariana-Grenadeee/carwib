import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { 
      path: '/', 
      label: 'Home', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      path: '/cars', 
      label: 'Cars', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      path: '/about', 
      label: 'About', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      path: '/contact', 
      label: 'Contact', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
  ];

  const handleGetStarted = () => {
    navigate('/cars');
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: 100,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`hidden lg:block fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-lg'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to="/" 
                className="flex items-center space-x-3 group"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300 group-hover:scale-105">
                    <span className="text-white font-bold text-xl">CD</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900">
                    CarDealer
                  </span>
                  <span className="text-xs text-gray-600 font-medium">Premium Vehicles</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 font-semibold transition-all duration-300 group ${
                      location.pathname === link.path
                        ? 'text-cyan-600'
                        : 'text-gray-800 hover:text-cyan-600'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 ${
                      location.pathname === link.path ? 'w-full' : 'group-hover:w-full'
                    }`}></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="flex items-center space-x-4">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="px-6 py-2.5 text-White-800 font-semibold hover:text-cyan-600 transition-colors duration-300"
              >
                Sign In
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl"
        >
          <div className="flex items-center justify-around px-2 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-16 ${
                  location.pathname === link.path
                    ? 'text-cyan-600 bg-cyan-50'
                    : 'text-gray-600 hover:text-cyan-600'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  location.pathname === link.path ? 'bg-cyan-100' : ''
                }`}>
                  {link.icon}
                </div>
                <span className="text-xs font-medium mt-1">{link.label}</span>
              </Link>
            ))}
            
            {/* Get Started Button */}
            <button
              onClick={handleGetStarted}
              className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-16 text-cyan-600 hover:bg-cyan-50"
            >
              <div className="p-2 rounded-lg bg-cyan-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs font-medium mt-1">Get Started</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Add padding to prevent content from being hidden behind bottom nav */}
      <div className="lg:hidden pb-20"></div>
    </>
  );
};

export default Navbar;