import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Filter, Star, DollarSign } from 'lucide-react';
import { enhancedProducts } from '../data/enhancedProducts';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Generate search suggestions based on input
  useEffect(() => {
    if (searchTerm.length > 1) {
      const productNames = enhancedProducts
        .map(p => p.name)
        .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5);
      
      const categories = [...new Set(enhancedProducts
        .map(p => p.category)
        .filter(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())))]
        .slice(0, 3);
      
      const tags = [...new Set(enhancedProducts
        .flatMap(p => p.tags || [])
        .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))]
        .slice(0, 3);
      
      const combinedSuggestions = [
        ...productNames.map(name => ({ type: 'product', value: name })),
        ...categories.map(cat => ({ type: 'category', value: cat })),
        ...tags.map(tag => ({ type: 'tag', value: tag }))
      ].slice(0, 8);
      
      setSuggestions(combinedSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && suggestions[focusedIndex]) {
          handleSuggestionClick(suggestions[focusedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setFocusedIndex(-1);
        searchRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.value);
    setShowSuggestions(false);
    setFocusedIndex(-1);
    onSearch(suggestion.value);
  };

  const handleSearch = () => {
    setShowSuggestions(false);
    onSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    onSearch('');
    searchRef.current?.focus();
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'product':
        return <Search className="h-4 w-4 text-gray-400" />;
      case 'category':
        return <Filter className="h-4 w-4 text-blue-500" />;
      case 'tag':
        return <span className="h-4 w-4 text-green-500 text-xs">#</span>;
      default:
        return <Search className="h-4 w-4 text-gray-400" />;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={suggestionsRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={searchRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Search products, categories, or brands..."
        />
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.value}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 flex items-center space-x-3 ${
                index === focusedIndex ? 'bg-gray-50 dark:bg-gray-700' : ''
              }`}
            >
              {getSuggestionIcon(suggestion.type)}
              <div className="flex-1">
                <span className="text-gray-900 dark:text-white">
                  {suggestion.value}
                </span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 capitalize">
                  in {suggestion.type}s
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const AdvancedFilters = ({ filters, setFilters, categories }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const priceRanges = [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $500', min: 200, max: 500 },
    { label: 'Over $500', min: 500, max: Infinity }
  ];

  const ratings = [5, 4, 3, 2, 1];

  const handlePriceRangeChange = (range) => {
    setFilters({
      ...filters,
      priceRange: filters.priceRange?.min === range.min && filters.priceRange?.max === range.max
        ? null
        : range
    });
  };

  const handleRatingChange = (rating) => {
    setFilters({
      ...filters,
      minRating: filters.minRating === rating ? null : rating
    });
  };

  const handleAvailabilityChange = (availability) => {
    setFilters({
      ...filters,
      availability: filters.availability === availability ? null : availability
    });
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      priceRange: null,
      minRating: null,
      availability: null,
      sortBy: 'rating'
    });
  };

  const hasActiveFilters = filters.category || filters.priceRange || filters.minRating || filters.availability;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Category</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value=""
                checked={filters.category === ''}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">All Categories</span>
            </label>
            {categories.map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {category.replace('-', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
          <div className="space-y-2">
            {priceRanges.map(range => (
              <label key={range.label} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max}
                  onChange={() => handlePriceRangeChange(range)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Minimum Rating</h4>
          <div className="space-y-2">
            {ratings.map(rating => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <div className="ml-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Availability</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.availability === 'in-stock'}
                onChange={() => handleAvailabilityChange('in-stock')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">In Stock</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.availability === 'low-stock'}
                onChange={() => handleAvailabilityChange('low-stock')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Limited Stock</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const SortOptions = ({ sortBy, setSortBy }) => {
  const sortOptions = [
    { value: 'rating', label: 'Best Rating' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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

export { SearchBar, AdvancedFilters, SortOptions };