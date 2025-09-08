import React, { useState, useRef } from 'react';
import { Upload, X, Plus, Trash2, Edit3, Eye, Star, Package, DollarSign } from 'lucide-react';
import { ValidatedInput, ValidatedTextarea, ValidatedSelect } from './FormComponents.jsx';
import { useNotification } from './NotificationSystem.jsx';
import { LoadingButton, CardSkeleton } from './Loading.jsx';
import Modal, { ConfirmModal } from './Modal.jsx';

// Product Image Upload Component
export const ProductImageUpload = ({ images = [], onImagesChange, maxImages = 5 }) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (files) => {
    const newImages = Array.from(files).slice(0, maxImages - images.length);
    const imagePromises = newImages.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: Date.now() + Math.random(),
            file,
            url: e.target.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(newImageObjects => {
      onImagesChange([...images, ...newImageObjects]);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const removeImage = (imageId) => {
    onImagesChange(images.filter(img => img.id !== imageId));
  };

  const reorderImages = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [moved] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, moved);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Product Images ({images.length}/{maxImages})
      </label>
      
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragOver 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          PNG, JPG, GIF up to 10MB
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              />
              
              {/* Primary Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
              
              {/* Remove Button */}
              <button
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              
              {/* Reorder Handle */}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Product Form Component
export const ProductForm = ({ 
  product = null, 
  onSubmit, 
  onCancel, 
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || '',
    subcategory: product?.subcategory || '',
    price: product?.price || '',
    comparePrice: product?.comparePrice || '',
    cost: product?.cost || '',
    sku: product?.sku || '',
    barcode: product?.barcode || '',
    inventory: product?.inventory || '',
    weight: product?.weight || '',
    dimensions: product?.dimensions || { length: '', width: '', height: '' },
    tags: product?.tags?.join(', ') || '',
    seoTitle: product?.seoTitle || '',
    seoDescription: product?.seoDescription || '',
    status: product?.status || 'draft'
  });

  const [images, setImages] = useState(product?.images || []);
  const [variants, setVariants] = useState(product?.variants || []);
  const [errors, setErrors] = useState({});
  
  const { showError } = useNotification();

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'books', label: 'Books' },
    { value: 'toys', label: 'Toys & Games' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'archived', label: 'Archived' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showError('Validation Error', 'Please fix the errors below');
      return;
    }

    const productData = {
      ...formData,
      images,
      variants,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      dimensions: formData.dimensions,
      price: parseFloat(formData.price),
      comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
      cost: formData.cost ? parseFloat(formData.cost) : null,
      inventory: parseInt(formData.inventory) || 0,
      weight: formData.weight ? parseFloat(formData.weight) : null
    };

    onSubmit(productData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <ValidatedInput
              label="Product Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
              required
            />
          </div>
          
          <ValidatedSelect
            label="Category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            options={categories}
            error={errors.category}
            required
          />
          
          <ValidatedSelect
            label="Status"
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            options={statusOptions}
            required
          />
          
          <div className="md:col-span-2">
            <ValidatedTextarea
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              maxLength={1000}
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Product Images
        </h3>
        
        <ProductImageUpload
          images={images}
          onImagesChange={setImages}
          maxImages={5}
        />
        
        {errors.images && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.images}</p>
        )}
      </div>

      {/* Pricing */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Pricing & Inventory
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValidatedInput
            label="Price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            error={errors.price}
            required
          />
          
          <ValidatedInput
            label="Compare at Price"
            type="number"
            step="0.01"
            value={formData.comparePrice}
            onChange={(e) => handleInputChange('comparePrice', e.target.value)}
            helperText="Optional - for showing discounts"
          />
          
          <ValidatedInput
            label="Cost per Item"
            type="number"
            step="0.01"
            value={formData.cost}
            onChange={(e) => handleInputChange('cost', e.target.value)}
            helperText="For profit tracking"
          />
          
          <ValidatedInput
            label="SKU"
            value={formData.sku}
            onChange={(e) => handleInputChange('sku', e.target.value)}
            helperText="Stock Keeping Unit"
          />
          
          <ValidatedInput
            label="Barcode"
            value={formData.barcode}
            onChange={(e) => handleInputChange('barcode', e.target.value)}
          />
          
          <ValidatedInput
            label="Inventory Quantity"
            type="number"
            value={formData.inventory}
            onChange={(e) => handleInputChange('inventory', e.target.value)}
          />
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Search Engine Optimization
        </h3>
        
        <div className="space-y-4">
          <ValidatedInput
            label="SEO Title"
            value={formData.seoTitle}
            onChange={(e) => handleInputChange('seoTitle', e.target.value)}
            maxLength={60}
            helperText="Recommended: 50-60 characters"
          />
          
          <ValidatedTextarea
            label="SEO Description"
            value={formData.seoDescription}
            onChange={(e) => handleInputChange('seoDescription', e.target.value)}
            maxLength={160}
            rows={3}
            helperText="Recommended: 120-160 characters"
          />
          
          <ValidatedInput
            label="Tags"
            value={formData.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            helperText="Separate tags with commas"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        
        <LoadingButton
          type="submit"
          loading={loading}
          className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          {product ? 'Update Product' : 'Create Product'}
        </LoadingButton>
      </div>
    </form>
  );
};

// Product List Component
export const ProductList = ({ 
  products = [], 
  loading = false, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const { showSuccess } = useNotification();

  const handleDeleteConfirm = () => {
    onDelete(productToDelete.id);
    setShowDeleteModal(false);
    setProductToDelete(null);
    showSuccess('Success', 'Product deleted successfully');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          No products yet
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Start by creating your first product.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={product.images?.[0]?.url || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-2">
                  {product.name}
                </h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                </div>
                
                {product.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.rating}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div>SKU: {product.sku || 'N/A'}</div>
                <div>Inventory: {product.inventory || 0}</div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => {
                      setProductToDelete(product);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-600 hover:text-red-900 dark:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => onToggleStatus(product.id, product.status === 'active' ? 'inactive' : 'active')}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    product.status === 'active'
                      ? 'bg-red-100 text-red-800 hover:bg-red-200'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {product.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
      />
    </>
  );
};

export default {
  ProductImageUpload,
  ProductForm,
  ProductList
};