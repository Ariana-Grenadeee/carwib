import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleViewDetails = () => {
    navigate('/order', { state: { car } });
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=300&fit=crop';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 h-48 bg-gray-200">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={imageError ? fallbackImage : car.image} 
            alt={`${car.make} ${car.model}`}
            className={`w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>
        
        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            ${car.price.toLocaleString()}
          </span>
          {car.mileage < 20000 && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Low Mileage
            </span>
          )}
          {car.year >= 2023 && (
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              New Arrival
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
        >
          <svg 
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'
            }`} 
            fill={isFavorite ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title and Year */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
              {car.make} {car.model}
            </h3>
            <p className="text-gray-500 text-sm">{car.year} • {car.color}</p>
          </div>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm font-medium">
            {car.year}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm">
          {car.description}
        </p>
        
        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {car.mileage.toLocaleString()} mi
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {car.fuelType}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {car.transmission}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            {car.color}
          </div>
        </div>
        
        {/* CTA Button */}
        <button 
          onClick={handleViewDetails}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-200 group/btn"
        >
          <span className="flex items-center justify-center">
            View Details
            <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default CarCard;