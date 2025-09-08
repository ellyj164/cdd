import React from 'react';
import { Filter, X } from 'lucide-react';

export default function Sidebar({ categories, filters, setFilters }) {
  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category });
  };

  const handlePriceChange = (event) => {
    setFilters({ ...filters, price: Number(event.target.value) });
  };

  const handleSortChange = (sortBy) => {
    setFilters({ ...filters, sortBy });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      price: 1500,
      sortBy: 'rating'
    });
  };

  const hasActiveFilters = filters.category !== '' || filters.price !== 1500;

  return (
    <aside className="w-64 mr-8 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Category</h4>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${
                filters.category === '' 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleCategoryChange('')}
            >
              All Categories
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer px-3 py-2 rounded-md transition-colors capitalize ${
                  filters.category === cat 
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Max Price: <span className="text-primary-600 dark:text-primary-400">${filters.price}</span>
          </h4>
          <input
            type="range"
            min="0"
            max="1500"
            value={filters.price}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span>$0</span>
            <span>$1500</span>
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Sort By</h4>
          <div className="space-y-2">
            {[
              { value: 'rating', label: 'Highest Rated' },
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' },
              { value: 'name-asc', label: 'Name: A to Z' }
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  value={option.value}
                  checked={filters.sortBy === option.value}
                  onChange={() => handleSortChange(option.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                />
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
