import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, Save, Search, Filter, 
  Package, TrendingUp, Eye, Star, ShoppingBag
} from 'lucide-react';

/**
 * CategoryManager Component
 * Admin interface for managing product categories
 * Requirement: ≥50 categories to be data-driven and manageable
 */
const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState(null);

  // Generate comprehensive category list (50+ categories)
  const generateDefaultCategories = () => [
    // Electronics (8 categories)
    { id: 'electronics', name: 'Electronics', description: 'Latest tech and gadgets', count: 15420, status: 'active', featured: true, icon: '💻' },
    { id: 'smartphones', name: 'Smartphones', description: 'Mobile phones and accessories', count: 3240, status: 'active', parent: 'electronics', icon: '📱' },
    { id: 'laptops', name: 'Laptops & Computers', description: 'Computing devices', count: 2150, status: 'active', parent: 'electronics', icon: '💻' },
    { id: 'audio', name: 'Audio & Headphones', description: 'Sound equipment', count: 1890, status: 'active', parent: 'electronics', icon: '🎧' },
    { id: 'cameras', name: 'Cameras & Photography', description: 'Photo and video equipment', count: 1240, status: 'active', parent: 'electronics', icon: '📷' },
    { id: 'gaming', name: 'Gaming', description: 'Video games and consoles', count: 2890, status: 'active', parent: 'electronics', icon: '🎮' },
    { id: 'wearables', name: 'Wearable Technology', description: 'Smart watches and fitness trackers', count: 890, status: 'active', parent: 'electronics', icon: '⌚' },
    { id: 'accessories', name: 'Electronic Accessories', description: 'Cables, chargers, and more', count: 3110, status: 'active', parent: 'electronics', icon: '🔌' },

    // Fashion (12 categories)
    { id: 'fashion', name: 'Fashion', description: 'Trendy clothing & accessories', count: 28540, status: 'active', featured: true, icon: '👗' },
    { id: 'mens-clothing', name: "Men's Clothing", description: 'Fashion for men', count: 8920, status: 'active', parent: 'fashion', icon: '👔' },
    { id: 'womens-clothing', name: "Women's Clothing", description: 'Fashion for women', count: 12340, status: 'active', parent: 'fashion', icon: '👗' },
    { id: 'shoes', name: 'Shoes & Footwear', description: 'All types of footwear', count: 4560, status: 'active', parent: 'fashion', icon: '👟' },
    { id: 'bags-luggage', name: 'Bags & Luggage', description: 'Handbags, backpacks, and travel gear', count: 1890, status: 'active', parent: 'fashion', icon: '👜' },
    { id: 'jewelry', name: 'Jewelry & Watches', description: 'Accessories and timepieces', count: 2340, status: 'active', parent: 'fashion', icon: '💎' },
    { id: 'kids-clothing', name: "Kids' Clothing", description: 'Fashion for children', count: 3450, status: 'active', parent: 'fashion', icon: '👶' },
    { id: 'underwear', name: 'Underwear & Sleepwear', description: 'Intimate apparel', count: 1240, status: 'active', parent: 'fashion', icon: '👙' },
    { id: 'sportswear', name: 'Sportswear', description: 'Athletic clothing and gear', count: 2890, status: 'active', parent: 'fashion', icon: '🏃' },
    { id: 'formal-wear', name: 'Formal Wear', description: 'Suits, dresses, formal attire', count: 1450, status: 'active', parent: 'fashion', icon: '🤵' },
    { id: 'seasonal-fashion', name: 'Seasonal Fashion', description: 'Weather-specific clothing', count: 980, status: 'active', parent: 'fashion', icon: '🧥' },
    { id: 'vintage-fashion', name: 'Vintage & Retro', description: 'Classic and vintage styles', count: 670, status: 'active', parent: 'fashion', icon: '👘' },
    { id: 'fashion-accessories', name: 'Fashion Accessories', description: 'Belts, scarves, hats', count: 1560, status: 'active', parent: 'fashion', icon: '🧢' },

    // Home & Garden (10 categories)
    { id: 'home-garden', name: 'Home & Garden', description: 'Everything for your home', count: 18920, status: 'active', featured: true, icon: '🏠' },
    { id: 'furniture', name: 'Furniture', description: 'Indoor and outdoor furniture', count: 5670, status: 'active', parent: 'home-garden', icon: '🛋️' },
    { id: 'kitchen', name: 'Kitchen & Dining', description: 'Cookware and dining essentials', count: 4230, status: 'active', parent: 'home-garden', icon: '🍽️' },
    { id: 'home-decor', name: 'Home Decor', description: 'Decorative items and artwork', count: 3890, status: 'active', parent: 'home-garden', icon: '🎨' },
    { id: 'bedding-bath', name: 'Bedding & Bath', description: 'Bedroom and bathroom essentials', count: 2340, status: 'active', parent: 'home-garden', icon: '🛏️' },
    { id: 'lighting', name: 'Lighting', description: 'Lamps and lighting fixtures', count: 1560, status: 'active', parent: 'home-garden', icon: '💡' },
    { id: 'storage', name: 'Storage & Organization', description: 'Organize your space', count: 1230, status: 'active', parent: 'home-garden', icon: '📦' },
    { id: 'gardening', name: 'Gardening & Outdoor', description: 'Garden tools and outdoor living', count: 2890, status: 'active', parent: 'home-garden', icon: '🌱' },
    { id: 'appliances', name: 'Home Appliances', description: 'Large and small appliances', count: 1340, status: 'active', parent: 'home-garden', icon: '🔌' },
    { id: 'cleaning', name: 'Cleaning Supplies', description: 'Household cleaning products', count: 980, status: 'active', parent: 'home-garden', icon: '🧽' },

    // Health & Beauty (8 categories)
    { id: 'health-beauty', name: 'Health & Beauty', description: 'Personal care essentials', count: 9870, status: 'active', featured: true, icon: '💄' },
    { id: 'skincare', name: 'Skincare', description: 'Face and body care products', count: 2890, status: 'active', parent: 'health-beauty', icon: '🧴' },
    { id: 'makeup', name: 'Makeup & Cosmetics', description: 'Beauty products', count: 2340, status: 'active', parent: 'health-beauty', icon: '💄' },
    { id: 'haircare', name: 'Hair Care', description: 'Shampoo, styling products', count: 1560, status: 'active', parent: 'health-beauty', icon: '💇' },
    { id: 'fragrance', name: 'Fragrance', description: 'Perfumes and colognes', count: 890, status: 'active', parent: 'health-beauty', icon: '🌸' },
    { id: 'health-supplements', name: 'Health Supplements', description: 'Vitamins and wellness products', count: 1340, status: 'active', parent: 'health-beauty', icon: '💊' },
    { id: 'personal-care', name: 'Personal Care', description: 'Daily hygiene products', count: 1450, status: 'active', parent: 'health-beauty', icon: '🧼' },
    { id: 'wellness', name: 'Wellness & Fitness', description: 'Health and fitness products', count: 1200, status: 'active', parent: 'health-beauty', icon: '🏃‍♀️' },

    // Sports & Outdoors (6 categories)
    { id: 'sports-outdoors', name: 'Sports & Outdoors', description: 'Gear for active lifestyle', count: 12340, status: 'active', featured: true, icon: '⚽' },
    { id: 'fitness-equipment', name: 'Fitness Equipment', description: 'Exercise and gym equipment', count: 3450, status: 'active', parent: 'sports-outdoors', icon: '🏋️' },
    { id: 'outdoor-recreation', name: 'Outdoor Recreation', description: 'Camping, hiking, outdoor gear', count: 2890, status: 'active', parent: 'sports-outdoors', icon: '🏕️' },
    { id: 'water-sports', name: 'Water Sports', description: 'Swimming and water activities', count: 1560, status: 'active', parent: 'sports-outdoors', icon: '🏊' },
    { id: 'team-sports', name: 'Team Sports', description: 'Equipment for team sports', count: 2340, status: 'active', parent: 'sports-outdoors', icon: '⚽' },
    { id: 'winter-sports', name: 'Winter Sports', description: 'Skiing, snowboarding equipment', count: 890, status: 'active', parent: 'sports-outdoors', icon: '⛷️' },
    { id: 'cycling', name: 'Cycling', description: 'Bikes and cycling accessories', count: 1210, status: 'active', parent: 'sports-outdoors', icon: '🚴' },

    // Books & Media (5 categories)
    { id: 'books-media', name: 'Books & Media', description: 'Knowledge & entertainment', count: 7450, status: 'active', featured: true, icon: '📚' },
    { id: 'books', name: 'Books', description: 'Physical and digital books', count: 4230, status: 'active', parent: 'books-media', icon: '📖' },
    { id: 'movies-tv', name: 'Movies & TV', description: 'Entertainment content', count: 1890, status: 'active', parent: 'books-media', icon: '🎬' },
    { id: 'music', name: 'Music', description: 'CDs, vinyl, digital music', count: 980, status: 'active', parent: 'books-media', icon: '🎵' },
    { id: 'magazines', name: 'Magazines & Newspapers', description: 'Periodicals and subscriptions', count: 230, status: 'active', parent: 'books-media', icon: '📰' },
    { id: 'educational', name: 'Educational Materials', description: 'Learning resources', count: 1120, status: 'active', parent: 'books-media', icon: '🎓' },

    // Additional categories to reach 50+
    { id: 'toys-games', name: 'Toys & Games', description: 'Fun for all ages', count: 6780, status: 'active', featured: true, icon: '🧸' },
    { id: 'automotive', name: 'Automotive', description: 'Car parts & accessories', count: 11230, status: 'active', featured: true, icon: '🚗' },
    { id: 'grocery-food', name: 'Grocery & Food', description: 'Fresh & pantry essentials', count: 5670, status: 'active', featured: true, icon: '🍎' },
    { id: 'pet-supplies', name: 'Pet Supplies', description: 'Everything for your pets', count: 3450, status: 'active', icon: '🐕' },
    { id: 'office-supplies', name: 'Office Supplies', description: 'Workplace essentials', count: 2890, status: 'active', icon: '📎' },
    { id: 'baby-kids', name: 'Baby & Kids', description: 'Products for children', count: 4560, status: 'active', icon: '🍼' },
    { id: 'craft-hobbies', name: 'Arts, Crafts & Hobbies', description: 'Creative supplies', count: 2340, status: 'active', icon: '🎨' },
    { id: 'industrial', name: 'Industrial & Scientific', description: 'Professional equipment', count: 1890, status: 'active', icon: '🔧' }
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [categories, searchTerm, filter]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      // Load from localStorage or use defaults
      const savedCategories = localStorage.getItem('categoryData');
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      } else {
        const defaultCategories = generateDefaultCategories();
        setCategories(defaultCategories);
        localStorage.setItem('categoryData', JSON.stringify(defaultCategories));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCategories = () => {
    let filtered = categories;

    if (searchTerm) {
      filtered = filtered.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter !== 'all') {
      filtered = filtered.filter(cat => {
        switch (filter) {
          case 'featured': return cat.featured;
          case 'active': return cat.status === 'active';
          case 'inactive': return cat.status === 'inactive';
          case 'parent': return !cat.parent;
          case 'child': return cat.parent;
          default: return true;
        }
      });
    }

    setFilteredCategories(filtered);
  };

  const saveCategories = async () => {
    try {
      setLoading(true);
      localStorage.setItem('categoryData', JSON.stringify(categories));
      alert('Categories saved successfully!');
    } catch (error) {
      console.error('Error saving categories:', error);
      alert('Error saving categories');
    } finally {
      setLoading(false);
    }
  };

  const addCategory = () => {
    setNewCategory({
      id: `category-${Date.now()}`,
      name: '',
      description: '',
      count: 0,
      status: 'active',
      featured: false,
      icon: '📦',
      parent: null
    });
  };

  const saveNewCategory = () => {
    if (newCategory && newCategory.name.trim()) {
      setCategories(prev => [...prev, newCategory]);
      setNewCategory(null);
    }
  };

  const updateCategory = (index, updates) => {
    setCategories(prev => prev.map((cat, i) => 
      i === index ? { ...cat, ...updates } : cat
    ));
  };

  const deleteCategory = (index) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter((_, i) => i !== index));
    }
  };

  const CategoryEditor = ({ category, index, isNew = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={category.name}
            onChange={(e) => isNew 
              ? setNewCategory({ ...category, name: e.target.value })
              : updateCategory(index, { name: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Category Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Icon
          </label>
          <input
            type="text"
            value={category.icon}
            onChange={(e) => isNew 
              ? setNewCategory({ ...category, icon: e.target.value })
              : updateCategory(index, { icon: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="📦"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={category.description}
            onChange={(e) => isNew 
              ? setNewCategory({ ...category, description: e.target.value })
              : updateCategory(index, { description: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="2"
            placeholder="Category description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Count
          </label>
          <input
            type="number"
            value={category.count}
            onChange={(e) => isNew 
              ? setNewCategory({ ...category, count: parseInt(e.target.value) || 0 })
              : updateCategory(index, { count: parseInt(e.target.value) || 0 })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={category.status}
            onChange={(e) => isNew 
              ? setNewCategory({ ...category, status: e.target.value })
              : updateCategory(index, { status: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={category.featured}
            onChange={(e) => isNew 
              ? setNewCategory({ ...category, featured: e.target.checked })
              : updateCategory(index, { featured: e.target.checked })
            }
            className="mr-2"
          />
          Featured Category
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={() => isNew ? setNewCategory(null) : setEditingCategory(null)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={() => isNew ? saveNewCategory() : setEditingCategory(null)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          {isNew ? 'Add Category' : 'Save Changes'}
        </button>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Category Manager</h2>
          <p className="text-gray-600">Manage product categories ({categories.length} total)</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={saveCategories}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Save className="h-4 w-4" />
            <span>Save All</span>
          </button>
          <button
            onClick={addCategory}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
          <div className="text-sm text-gray-600">Total Categories</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {categories.filter(c => c.featured).length}
          </div>
          <div className="text-sm text-gray-600">Featured</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {categories.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {categories.reduce((sum, c) => sum + c.count, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Products</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="featured">Featured Only</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
              <option value="parent">Parent Categories</option>
              <option value="child">Sub Categories</option>
            </select>
          </div>
        </div>
      </div>

      {/* New Category Editor */}
      {newCategory && (
        <CategoryEditor category={newCategory} isNew={true} />
      )}

      {/* Categories List */}
      <div className="space-y-3">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            {editingCategory === index ? (
              <CategoryEditor category={category} index={index} />
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{category.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.description}</p>
                    <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                      <span>{category.count.toLocaleString()} products</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        category.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {category.status}
                      </span>
                      {category.featured && (
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                      {category.parent && (
                        <span className="text-xs text-blue-600">
                          Sub-category of {categories.find(c => c.id === category.parent)?.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingCategory(index)}
                    className="p-2 text-gray-400 hover:text-blue-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteCategory(index)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No categories found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;