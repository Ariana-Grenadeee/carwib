import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import CarCard from '../components/CarCard';
import Pagination from '../components/Pagination';
import { mockCars } from '../data/mockCars';

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    year: '',
    fuelType: '',
    transmission: '',
    make: ''
  });
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);
  const carsPerPage = 9;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCars(mockCars);
      setFilteredCars(mockCars);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...cars];

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter(car => car.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.price <= parseInt(filters.maxPrice));
    }

    // Year filter
    if (filters.year) {
      filtered = filtered.filter(car => car.year === parseInt(filters.year));
    }

    // Fuel type filter
    if (filters.fuelType) {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }

    // Transmission filter
    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    // Make filter
    if (filters.make) {
      filtered = filtered.filter(car => car.make === filters.make);
    }

    // Sort logic
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year-new':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'year-old':
        filtered.sort((a, b) => a.year - b.year);
        break;
      case 'mileage-low':
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        // Featured (default order)
        break;
    }

    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [searchTerm, filters, sortBy, cars]);

  const handleSearch = (term, filterData) => {
    setSearchTerm(term);
    setFilters(filterData);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({
      minPrice: '',
      maxPrice: '',
      year: '',
      fuelType: '',
      transmission: '',
      make: ''
    });
    setSortBy('featured');
  };

  // Calculate pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  // Get unique values for filters
  const uniqueMakes = [...new Set(cars.map(car => car.make))];
  const uniqueYears = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);
  const uniqueFuelTypes = [...new Set(cars.map(car => car.fuelType))];
  const uniqueTransmissions = [...new Set(cars.map(car => car.transmission))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Skeleton Header */}
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          {/* Skeleton Search */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-pulse">
            <div className="h-16 bg-gray-200 rounded-xl mb-4"></div>
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Car Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your perfect vehicle from our curated selection of luxury and performance cars
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SearchBar 
            onSearch={handleSearch} 
            filters={filters}
            uniqueMakes={uniqueMakes}
            uniqueYears={uniqueYears}
            uniqueFuelTypes={uniqueFuelTypes}
            uniqueTransmissions={uniqueTransmissions}
          />
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
        >
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <div className="text-lg text-gray-700">
              Showing <span className="font-semibold">{filteredCars.length}</span> cars
              {Object.values(filters).some(val => val) && (
                <button
                  onClick={clearAllFilters}
                  className="ml-3 text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
              <option value="mileage-low">Mileage: Low to High</option>
            </select>
          </div>
        </motion.div>

        {/* Active Filters */}
        {Object.values(filters).some(val => val) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {filters.minPrice && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cyan-100 text-cyan-800">
                Min: ${filters.minPrice}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, minPrice: '' }))}
                  className="ml-2 hover:text-cyan-900"
                >
                  ×
                </button>
              </span>
            )}
            {filters.maxPrice && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cyan-100 text-cyan-800">
                Max: ${filters.maxPrice}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, maxPrice: '' }))}
                  className="ml-2 hover:text-cyan-900"
                >
                  ×
                </button>
              </span>
            )}
            {filters.year && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Year: {filters.year}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, year: '' }))}
                  className="ml-2 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
            {filters.fuelType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Fuel: {filters.fuelType}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, fuelType: '' }))}
                  className="ml-2 hover:text-green-900"
                >
                  ×
                </button>
              </span>
            )}
            {filters.make && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                Make: {filters.make}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, make: '' }))}
                  className="ml-2 hover:text-purple-900"
                >
                  ×
                </button>
              </span>
            )}
          </motion.div>
        )}

        {/* Cars Grid */}
        <AnimatePresence mode="wait">
          {currentCars.length > 0 ? (
            <motion.div
              key="cars-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {currentCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No cars found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any cars matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">{cars.length}+</div>
              <div className="text-cyan-100">Premium Vehicles</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{uniqueMakes.length}+</div>
              <div className="text-cyan-100">Trusted Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-cyan-100">Customer Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarListing;