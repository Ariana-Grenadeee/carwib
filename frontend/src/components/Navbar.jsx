import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    setIsDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/cars', label: 'Browse Cars' },
    { 
      label: 'Services',
      submenu: [
        { path: '/financing', label: 'Financing' },
        { path: '/trade-in', label: 'Trade-In' },
        { path: '/test-drive', label: 'Test Drive' },
        { path: '/maintenance', label: 'Maintenance' }
      ]
    },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleGetStarted = () => {
    navigate('/cars');
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
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
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path || link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => link.submenu && setIsDropdownOpen(true)}
                onMouseLeave={() => link.submenu && setIsDropdownOpen(false)}
              >
                {link.path ? (
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
                ) : (
                  <button
                    className={`px-4 py-2 font-semibold transition-all duration-300 group flex items-center space-x-1 ${
                      isDropdownOpen ? 'text-cyan-600' : 'text-white-800 hover:text-cyan-600'
                    }`}
                  >
                    <span>{link.label}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}

                {/* Dropdown Menu */}
                {link.submenu && (
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                      >
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="block px-6 py-3 text-gray-800 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 border-b border-gray-50 last:border-b-0"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="px-6 py-2.5 text-white-800 font-semibold hover:text-cyan-600 transition-colors duration-300"
            >
              Sign In
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:hidden p-3 rounded-2xl hover:bg-gray-100 transition-colors duration-300 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'group-hover:bg-cyan-600'
              }`}></span>
              <span className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'group-hover:bg-cyan-600'
              }`}></span>
              <span className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'group-hover:bg-cyan-600'
              }`}></span>
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.path || link.label}>
                    {link.path ? (
                      <Link
                        to={link.path}
                        className={`block py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                          location.pathname === link.path
                            ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 border-l-4 border-cyan-600'
                            : 'text-gray-800 hover:bg-gray-50 hover:text-cyan-600'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <div className="py-4 px-6 text-gray-800 font-semibold">
                        {link.label}
                        <div className="mt-2 space-y-1 pl-4">
                          {link.submenu?.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="block py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <button className="w-full py-3 text-gray-800 font-semibold hover:text-cyan-600 transition-colors text-left px-6">
                    Sign In
                  </button>
                  <button
                    onClick={handleGetStarted}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 mx-6"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;