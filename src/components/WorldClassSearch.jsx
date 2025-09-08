import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  Star, 
  DollarSign, 
  MapPin, 
  Mic, 
  Camera, 
  TrendingUp,
  Clock,
  Hash,
  Tag
} from 'lucide-react';
import { enhancedProducts, categories, vendors } from '../data/enhancedProducts';

// Advanced Search component with world-class features
export const WorldClassSearch = ({ onSearch, onFiltersChange }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches] = useState([
    'iPhone 15', 'MacBook Pro', 'Nike Air Max', 'Smart TV', 'Wireless Earbuds'
  ]);
  
  // Advanced filters state
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    rating: '',
    category: '',
    vendor: '',
    location: '',
    availability: '',
    shipping: '',
    sortBy: 'relevance'
  });

  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleSearch(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Generate intelligent suggestions
  const generateSuggestions = useCallback((searchQuery) => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const suggestions = [];

    // Product name matches
    const productMatches = enhancedProducts
      .filter(p => p.name.toLowerCase().includes(query))
      .slice(0, 3)
      .map(p => ({
        type: 'product',
        value: p.name,
        icon: Hash,
        meta: `$${p.price} • ${p.rating}★`
      }));

    // Category matches
    const categoryMatches = categories
      .filter(c => c.name.toLowerCase().includes(query))
      .slice(0, 2)
      .map(c => ({
        type: 'category',
        value: c.name,
        icon: Tag,
        meta: 'Category'
      }));

    // Vendor matches
    const vendorMatches = vendors
      .filter(v => v.name.toLowerCase().includes(query))
      .slice(0, 2)
      .map(v => ({
        type: 'vendor',
        value: v.name,
        icon: MapPin,
        meta: `${v.rating}★ • ${v.location}`
      }));

    // Tag matches
    const tagMatches = [...new Set(enhancedProducts
      .flatMap(p => p.tags || [])
      .filter(tag => tag.toLowerCase().includes(query)))]
      .slice(0, 2)
      .map(tag => ({
        type: 'tag',
        value: tag,
        icon: Hash,
        meta: 'Tag'
      }));

    return [...productMatches, ...categoryMatches, ...vendorMatches, ...tagMatches].slice(0, 8);
  }, []);

  // Handle search input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      const newSuggestions = generateSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle search execution
  const handleSearch = useCallback((searchQuery = query) => {
    if (!searchQuery.trim()) return;

    // Add to recent searches
    const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));

    // Execute search
    onSearch(searchQuery, filters);
    setShowSuggestions(false);
  }, [query, filters, recentSearches, onSearch]);

  // Voice search
  const startVoiceSearch = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Visual search (placeholder for future implementation)
  const startVisualSearch = () => {
    // This would open camera/file picker for image search
    alert('Visual search feature coming soon! Upload an image to find similar products.');
  };

  // Handle filter changes
  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => query && setShowSuggestions(true)}
              placeholder="Search 50+ billion products worldwide..."
              className="w-full pl-12 pr-4 py-4 text-lg bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500"
            />
          </div>

          {/* Voice Search */}
          <button
            onClick={startVoiceSearch}
            disabled={!recognitionRef.current}
            className={`p-3 mx-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-100 text-red-600 animate-pulse' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title="Voice search"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Visual Search */}
          <button
            onClick={startVisualSearch}
            className="p-3 mx-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Visual search"
          >
            <Camera className="w-5 h-5" />
          </button>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-3 mx-2 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
            title="Advanced filters"
          >
            <Filter className="w-5 h-5" />
          </button>

          {/* Search Button */}
          <button
            onClick={() => handleSearch()}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-r-lg transition-colors font-medium"
          >
            Search
          </button>
        </div>

        {/* Auto-suggestions Dropdown */}
        {showSuggestions && (
          <div 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
          >
            {/* Current suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Suggestions</h3>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setQuery(suggestion.value);
                      handleSearch(suggestion.value);
                    }}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer group"
                  >
                    <suggestion.icon className="w-4 h-4 text-gray-400 mr-3" />
                    <div className="flex-1">
                      <div className="text-gray-900 dark:text-white">{suggestion.value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{suggestion.meta}</div>
                    </div>
                    <Search className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            )}

            {/* Recent searches */}
            {recentSearches.length > 0 && !query && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Recent Searches
                </h3>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      handleSearch(search);
                    }}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer group"
                  >
                    <Clock className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="flex-1 text-gray-900 dark:text-white">{search}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = recentSearches.filter((_, i) => i !== index);
                        setRecentSearches(updated);
                        localStorage.setItem('recentSearches', JSON.stringify(updated));
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <X className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Trending searches */}
            {!query && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Trending Searches
                </h3>
                {trendingSearches.map((search, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      handleSearch(search);
                    }}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4 text-orange-500 mr-3" />
                    <span className="text-gray-900 dark:text-white">{search}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-40 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, min: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, max: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest First</option>
                <option value="bestseller">Best Sellers</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                const resetFilters = {
                  priceRange: { min: '', max: '' },
                  rating: '',
                  category: '',
                  vendor: '',
                  location: '',
                  availability: '',
                  shipping: '',
                  sortBy: 'relevance'
                };
                setFilters(resetFilters);
                onFiltersChange?.(resetFilters);
              }}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldClassSearch;