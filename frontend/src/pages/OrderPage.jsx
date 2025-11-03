import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    
    // Additional Options
    tradeIn: 'no',
    financing: 'no',
    deliveryOption: 'pickup',
    preferredContact: 'email',
    additionalNotes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const paymentMethods = [
    { value: 'credit', label: 'Credit Card' },
    { value: 'debit', label: 'Debit Card' },
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'finance', label: 'Financing' }
  ];

  const deliveryOptions = [
    { value: 'pickup', label: 'Pickup from Dealership' },
    { value: 'delivery', label: 'Home Delivery (+$500)' },
    { value: 'express', label: 'Express Delivery (+$1,000)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    alert('Order placed successfully! Our team will contact you within 24 hours.');
    navigate('/');
  };

  const calculateTotal = () => {
    let total = car?.price || 0;
    if (formData.deliveryOption === 'delivery') total += 500;
    if (formData.deliveryOption === 'express') total += 1000;
    return total;
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center"
        >
          <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Car Selected</h2>
          <p className="text-gray-600 mb-6">
            Please select a car from our collection before placing an order.
          </p>
          <button
            onClick={() => navigate('/cars')}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
          >
            Browse Cars
          </button>
        </motion.div>
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
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Complete Your Order
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Just a few steps to drive home your dream car
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg border-2 transition-all duration-300 ${
                    step === currentStep
                      ? 'bg-cyan-600 border-cyan-600 text-white'
                      : step < currentStep
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {step < currentStep ? '✓' : step}
                  </div>
                  <span className={`text-sm mt-2 font-medium ${
                    step === currentStep ? 'text-cyan-600' : 'text-gray-500'
                  }`}>
                    {step === 1 && 'Personal Info'}
                    {step === 2 && 'Address'}
                    {step === 3 && 'Payment'}
                    {step === 4 && 'Review'}
                  </span>
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary - Always Visible */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                {/* Car Info */}
                <div className="flex items-start space-x-4 mb-6">
                  <img 
                    src={car.image} 
                    alt={`${car.make} ${car.model}`}
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-gray-600 text-sm">{car.color} • {car.fuelType}</p>
                    <p className="text-cyan-600 font-bold text-lg">${car.price.toLocaleString()}</p>
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Mileage:</span>
                    <span className="font-medium">{car.mileage.toLocaleString()} miles</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transmission:</span>
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fuel Type:</span>
                    <span className="font-medium">{car.fuelType}</span>
                  </div>
                  {formData.deliveryOption && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium">
                        {deliveryOptions.find(opt => opt.value === formData.deliveryOption)?.label.split('(+')[0]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-2xl text-cyan-600">${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <div className="space-y-2">
                    {car.features?.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
                      <p className="text-gray-600">Tell us a bit about yourself</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="text">Text Message</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Address Information */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Address Information</h3>
                      <p className="text-gray-600">Where should we deliver your vehicle?</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select State</option>
                          {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Option
                      </label>
                      <div className="space-y-3">
                        {deliveryOptions.map(option => (
                          <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name="deliveryOption"
                              value={option.value}
                              checked={formData.deliveryOption === option.value}
                              onChange={handleChange}
                              className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                            />
                            <span className="text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment Information */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Information</h3>
                      <p className="text-gray-600">Choose your preferred payment method</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Payment Method *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentMethods.map(method => (
                          <label key={method.value} className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl cursor-pointer hover:border-cyan-500 transition-colors duration-300">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.value}
                              checked={formData.paymentMethod === method.value}
                              onChange={handleChange}
                              className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                              required
                            />
                            <span className="font-medium text-gray-700">{method.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {['credit', 'debit'].includes(formData.paymentMethod) && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            name="cardholderName"
                            value={formData.cardholderName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                              placeholder="MM/YY"
                              maxLength="5"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                              placeholder="123"
                              maxLength="3"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {formData.paymentMethod === 'finance' && (
                      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                          <svg className="w-6 h-6 text-cyan-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <h4 className="font-semibold text-cyan-800 mb-2">Financing Application</h4>
                            <p className="text-cyan-700 text-sm">
                              Our financing team will contact you within 24 hours to discuss payment options and complete your application.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Trade-In Vehicle?
                        </label>
                        <select
                          name="tradeIn"
                          value={formData.tradeIn}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="no">No</option>
                          <option value="yes">Yes, I have a trade-in</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Order</h3>
                      <p className="text-gray-600">Please review all information before submitting</p>
                    </div>

                    <div className="space-y-6">
                      {/* Personal Info Review */}
                      <div className="border border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Personal Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span>
                            <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Email:</span>
                            <p className="font-medium">{formData.email}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Phone:</span>
                            <p className="font-medium">{formData.phone}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Contact Preference:</span>
                            <p className="font-medium capitalize">{formData.preferredContact}</p>
                          </div>
                        </div>
                      </div>

                      {/* Address Review */}
                      <div className="border border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Delivery Information</h4>
                        <div className="space-y-2 text-sm">
                          <p className="font-medium">{formData.address}</p>
                          <p className="text-gray-600">
                            {formData.city}, {formData.state} {formData.zipCode}
                          </p>
                          <p className="text-gray-600">
                            Delivery: {deliveryOptions.find(opt => opt.value === formData.deliveryOption)?.label}
                          </p>
                        </div>
                      </div>

                      {/* Payment Review */}
                      <div className="border border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Payment Information</h4>
                        <div className="text-sm">
                          <p className="font-medium capitalize">
                            {paymentMethods.find(method => method.value === formData.paymentMethod)?.label}
                          </p>
                          {formData.paymentMethod === 'finance' && (
                            <p className="text-gray-600 mt-1">Financing application required</p>
                          )}
                          {formData.tradeIn === 'yes' && (
                            <p className="text-green-600 mt-2">✓ Trade-in vehicle noted</p>
                          )}
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          name="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                          placeholder="Any special requests or additional information..."
                        />
                      </div>

                      {/* Terms and Conditions */}
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          required
                          className="w-4 h-4 text-cyan-600 focus:ring-cyan-500 rounded mt-1"
                        />
                        <label className="text-sm text-gray-600">
                          I agree to the{' '}
                          <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium">
                            Terms and Conditions
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Back
                  </button>

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Complete Order</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;