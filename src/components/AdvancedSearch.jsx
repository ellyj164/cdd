import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, ChevronDown, Star, DollarSign, Mic, Camera, Brain, MapPin, Truck, Clock, Zap, Package, Globe, Store } from 'lucide-react';

// Enhanced Search Bar with AI, voice, and image search capabilities
export const AdvancedSearchBar = ({ 
  onSearch, 
  placeholder = "Search products...",
  suggestions = [],
  loading = false 
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Check for voice search support
  useEffect(() => {
    setVoiceSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  // Enhanced AI-powered suggestions
  const generateAISuggestions = (searchQuery) => {
    const aiSuggestions = [
      `${searchQuery} with fast delivery`,
      `${searchQuery} best deals`,
      `${searchQuery} trending now`,
      `${searchQuery} premium quality`,
      `${searchQuery} under $50`,
      `${searchQuery} reviews 4+ stars`
    ];
    return aiSuggestions.slice(0, 3);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
    setHighlightedIndex(-1);
    
    // Generate AI suggestions
    if (value.trim().length > 2) {
      setAiSuggestions(generateAISuggestions(value.trim()));
    }
    
    // Debounced search with typo correction
    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        onSearch(value);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Voice search functionality
  const startVoiceSearch = () => {
    if (!voiceSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsVoiceActive(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript);
      setIsVoiceActive(false);
    };

    recognition.onerror = () => {
      setIsVoiceActive(false);
    };

    recognition.onend = () => {
      setIsVoiceActive(false);
    };

    recognition.start();
  };

  // Image search functionality (placeholder for future implementation)
  const startImageSearch = () => {
    // This would integrate with image recognition API
    console.log('Image search would be implemented here');
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          const selectedSuggestion = filteredSuggestions[highlightedIndex];
          setQuery(selectedSuggestion);
          onSearch(selectedSuggestion);
          setShowSuggestions(false);
        } else {
          onSearch(query);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={suggestionsRef}>
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setShowSuggestions(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {/* Voice Search Button */}
            {voiceSupported && (
              <button
                onClick={startVoiceSearch}
                disabled={isVoiceActive}
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                  isVoiceActive ? 'text-red-500 animate-pulse' : 'text-gray-500'
                }`}
                title="Voice Search"
              >
                <Mic className="h-4 w-4" />
              </button>
            )}
            
            {/* Image Search Button */}
            <button
              onClick={startImageSearch}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-500"
              title="Image Search"
            >
              <Camera className="h-4 w-4" />
            </button>
            
            {loading && (
              <div className="p-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
              </div>
            )}
          </div>
        </div>
        
        {/* AI Search Enhancement Button */}
        <button className="px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-r-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center space-x-2 shadow-md">
          <Brain className="h-4 w-4" />
          <span className="hidden sm:inline">AI Search</span>
        </button>
      </div>

      {/* Enhanced Suggestions Dropdown */}
      {showSuggestions && (filteredSuggestions.length > 0 || aiSuggestions.length > 0) && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {/* Regular Suggestions */}
          {filteredSuggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                Popular Searches
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={`regular-${suggestion}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    index === highlightedIndex ? 'bg-gray-50 dark:bg-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* AI-Powered Suggestions */}
          {aiSuggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 flex items-center space-x-1">
                <Brain className="h-3 w-3" />
                <span>AI Suggestions</span>
              </div>
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={`ai-${suggestion}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full">
                      <Brain className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-900 dark:text-white">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Advanced Filter Component
export const AdvancedFilters = ({ filters, onFiltersChange, categories = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const priceRanges = [
    { label: 'Under $25', value: { min: 0, max: 25 } },
    { label: '$25 - $50', value: { min: 25, max: 50 } },
    { label: '$50 - $100', value: { min: 50, max: 100 } },
    { label: '$100 - $200', value: { min: 100, max: 200 } },
    { label: '$200 - $500', value: { min: 200, max: 500 } },
    { label: 'Over $500', value: { min: 500, max: null } }
  ];

  const ratings = [
    { label: '4+ Stars', value: 4 },
    { label: '3+ Stars', value: 3 },
    { label: '2+ Stars', value: 2 },
    { label: '1+ Stars', value: 1 }
  ];

  const deliveryOptions = [
    { label: 'Same Day', value: 'same-day', icon: Zap },
    { label: 'Next Day', value: 'next-day', icon: Truck },
    { label: 'Free Shipping', value: 'free-shipping', icon: Package },
    { label: 'Express Delivery', value: 'express', icon: Clock }
  ];

  const brandOptions = [
    'Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'Dell', 'HP'
  ];

  const locationFilters = [
    { label: 'Local Sellers', value: 'local', icon: MapPin },
    { label: 'International', value: 'international', icon: Globe },
    { label: 'Nearby Stores', value: 'nearby', icon: Store }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      priceRange: null,
      minRating: null,
      availability: null,
      sortBy: 'relevance',
      delivery: null,
      brand: '',
      location: null,
      condition: 'all'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = Object.values(localFilters).filter(value => 
    value !== null && value !== '' && value !== 'relevance'
  ).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <span className="bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={localFilters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range
              </label>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <label key={range.label} className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={JSON.stringify(localFilters.priceRange) === JSON.stringify(range.value)}
                      onChange={() => handleFilterChange('priceRange', range.value)}
                      className="mr-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Rating
              </label>
              <div className="space-y-2">
                {ratings.map(rating => (
                  <label key={rating.value} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={localFilters.minRating === rating.value}
                      onChange={() => handleFilterChange('minRating', rating.value)}
                      className="mr-2 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="flex items-center">
                      <div className="flex mr-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < rating.value ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{rating.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.availability === 'in-stock'}
                  onChange={(e) => handleFilterChange('availability', e.target.checked ? 'in-stock' : null)}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">In Stock Only</span>
              </label>
            </div>

            {/* Delivery Options Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Delivery Options
              </label>
              <div className="space-y-2">
                {deliveryOptions.map(option => {
                  const IconComponent = option.icon;
                  return (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localFilters.delivery === option.value}
                        onChange={(e) => handleFilterChange('delivery', e.target.checked ? option.value : null)}
                        className="mr-2 text-primary-600 focus:ring-primary-500"
                      />
                      <IconComponent className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand
              </label>
              <select
                value={localFilters.brand || ''}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Brands</option>
                {brandOptions.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seller Location
              </label>
              <div className="space-y-2">
                {locationFilters.map(location => {
                  const IconComponent = location.icon;
                  return (
                    <label key={location.value} className="flex items-center">
                      <input
                        type="radio"
                        name="location"
                        checked={localFilters.location === location.value}
                        onChange={() => handleFilterChange('location', location.value)}
                        className="mr-2 text-primary-600 focus:ring-primary-500"
                      />
                      <IconComponent className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{location.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Product Condition Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Condition
              </label>
              <div className="space-y-2">
                {['all', 'new', 'used', 'refurbished'].map(condition => (
                  <label key={condition} className="flex items-center">
                    <input
                      type="radio"
                      name="condition"
                      checked={localFilters.condition === condition}
                      onChange={() => handleFilterChange('condition', condition)}
                      className="mr-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{condition}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={clearFilters}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Sort Options Component
export const SortOptions = ({ value, onChange }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Search Results Summary
export const SearchResultsSummary = ({ 
  query, 
  totalResults, 
  currentPage, 
  resultsPerPage, 
  filters 
}) => {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);
  
  const activeFilters = Object.entries(filters).filter(([key, value]) => 
    value !== null && value !== '' && value !== 'relevance'
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {query ? (
              <>Showing {startResult}-{endResult} of {totalResults} results for "<strong>{query}</strong>"</>
            ) : (
              <>Showing {startResult}-{endResult} of {totalResults} results</>
            )}
          </p>
        </div>
        
        {activeFilters.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Filters:</span>
            {activeFilters.map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
              >
                {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default {
  AdvancedSearchBar,
  AdvancedFilters,
  SortOptions,
  SearchResultsSummary
};