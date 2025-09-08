import React from 'react';

// Generic Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    primary: 'border-primary-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 ${colorClasses[color]}`}></div>
  );
};

// Full Page Loading Component
export const PageLoader = ({ message = 'Loading...' }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
    <LoadingSpinner size="xl" />
    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{message}</p>
  </div>
);

// Card Loading Skeleton
export const CardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
    </div>
  </div>
);

// Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 12 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);

// List Item Skeleton
export const ListItemSkeleton = () => (
  <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 4 }) => (
  <tr className="animate-pulse">
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="px-6 py-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </td>
    ))}
  </tr>
);

// Button Loading State
export const LoadingButton = ({ loading, children, disabled, className = '', ...props }) => (
  <button
    disabled={disabled || loading}
    className={`flex items-center justify-center ${className} ${
      (disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    {...props}
  >
    {loading && <LoadingSpinner size="sm" color="white" className="mr-2" />}
    {children}
  </button>
);

// Inline Loading
export const InlineLoader = ({ message = 'Loading...' }) => (
  <div className="flex items-center justify-center space-x-2 py-4">
    <LoadingSpinner size="sm" />
    <span className="text-sm text-gray-600 dark:text-gray-400">{message}</span>
  </div>
);

export default {
  LoadingSpinner,
  PageLoader,
  CardSkeleton,
  ProductGridSkeleton,
  ListItemSkeleton,
  TableRowSkeleton,
  LoadingButton,
  InlineLoader
};