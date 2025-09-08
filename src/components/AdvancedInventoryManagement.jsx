import React, { useState, useEffect } from 'react';
import { 
  Package, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  PieChart,
  RefreshCw,
  Clock,
  DollarSign,
  Warehouse,
  Truck,
  ShoppingCart,
  Target,
  Zap,
  AlertCircle,
  Calendar,
  MapPin,
  Users,
  Settings,
  FileText,
  Image,
  Star,
  ThumbsUp,
  Activity,
  Layers
} from 'lucide-react';

// Advanced Inventory Management System
export const AdvancedInventoryManagement = ({ 
  userRole = 'admin', 
  warehouseId = null,
  onInventoryUpdate,
  onReorderAlert 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [inventoryData, setInventoryData] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load inventory data
  useEffect(() => {
    const loadInventoryData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockInventory = [
        {
          id: 'INV-001',
          sku: 'IPH15-PRO-256-BLK',
          name: 'iPhone 15 Pro Max 256GB Black',
          category: 'Electronics',
          brand: 'Apple',
          currentStock: 45,
          reservedStock: 12,
          availableStock: 33,
          reorderPoint: 20,
          maxStock: 100,
          unitCost: 899.99,
          sellingPrice: 1199.99,
          totalValue: 40499.55,
          lastRestocked: new Date('2024-01-15'),
          turnoverRate: 8.5,
          status: 'in-stock',
          supplier: 'Apple Inc.',
          warehouse: 'NYC Warehouse',
          location: 'A1-B2-C3',
          forecast: {
            demand: 65,
            leadTime: 7,
            safetyStock: 15
          },
          movement: [
            { date: '2024-01-21', type: 'sale', quantity: -3, reason: 'Order #12345' },
            { date: '2024-01-20', type: 'sale', quantity: -5, reason: 'Order #12344' },
            { date: '2024-01-19', type: 'adjustment', quantity: +2, reason: 'Inventory audit' },
            { date: '2024-01-18', type: 'return', quantity: +1, reason: 'Customer return' }
          ]
        },
        {
          id: 'INV-002',
          sku: 'SAM-S24-512-WHT',
          name: 'Samsung Galaxy S24 Ultra 512GB White',
          category: 'Electronics',
          brand: 'Samsung',
          currentStock: 15,
          reservedStock: 8,
          availableStock: 7,
          reorderPoint: 25,
          maxStock: 80,
          unitCost: 749.99,
          sellingPrice: 1099.99,
          totalValue: 11249.85,
          lastRestocked: new Date('2024-01-10'),
          turnoverRate: 6.2,
          status: 'low-stock',
          supplier: 'Samsung Electronics',
          warehouse: 'LA Warehouse',
          location: 'B2-C3-D4',
          forecast: {
            demand: 45,
            leadTime: 5,
            safetyStock: 20
          },
          movement: [
            { date: '2024-01-21', type: 'sale', quantity: -2, reason: 'Order #12346' },
            { date: '2024-01-20', type: 'sale', quantity: -4, reason: 'Bulk order' }
          ]
        },
        {
          id: 'INV-003',
          sku: 'MBP-M3-1TB-SLV',
          name: 'MacBook Pro M3 1TB Silver',
          category: 'Electronics',
          brand: 'Apple',
          currentStock: 0,
          reservedStock: 0,
          availableStock: 0,
          reorderPoint: 10,
          maxStock: 50,
          unitCost: 1599.99,
          sellingPrice: 1999.99,
          totalValue: 0,
          lastRestocked: new Date('2024-01-05'),
          turnoverRate: 4.8,
          status: 'out-of-stock',
          supplier: 'Apple Inc.',
          warehouse: 'Chicago Warehouse',
          location: 'C1-D2-E3',
          forecast: {
            demand: 25,
            leadTime: 10,
            safetyStock: 8
          },
          movement: [
            { date: '2024-01-20', type: 'sale', quantity: -1, reason: 'Last unit sold' },
            { date: '2024-01-19', type: 'sale', quantity: -2, reason: 'Corporate order' }
          ]
        }
      ];

      const mockWarehouses = [
        {
          id: 'WH-001',
          name: 'NYC Warehouse',
          location: 'New York, NY',
          capacity: 10000,
          occupied: 7500,
          products: 1250,
          value: 2500000,
          manager: 'John Smith',
          status: 'active'
        },
        {
          id: 'WH-002',
          name: 'LA Warehouse',
          location: 'Los Angeles, CA',
          capacity: 8000,
          occupied: 5200,
          products: 980,
          value: 1800000,
          manager: 'Sarah Jones',
          status: 'active'
        },
        {
          id: 'WH-003',
          name: 'Chicago Warehouse',
          location: 'Chicago, IL',
          capacity: 6000,
          occupied: 4100,
          products: 750,
          value: 1200000,
          manager: 'Mike Chen',
          status: 'maintenance'
        }
      ];

      setInventoryData(mockInventory);
      setWarehouses(mockWarehouses);
      setLoading(false);
    };

    loadInventoryData();
  }, []);

  // Filter inventory data
  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesWarehouse = selectedWarehouse === 'all' || item.warehouse === selectedWarehouse;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesWarehouse;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'overstock': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-stock': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'low-stock': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'out-of-stock': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'overstock': return <TrendingUp className="h-4 w-4 text-blue-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const calculateStockLevel = (current, max) => {
    return Math.round((current / max) * 100);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Calculate dashboard metrics
  const dashboardMetrics = {
    totalProducts: inventoryData.length,
    totalValue: inventoryData.reduce((sum, item) => sum + item.totalValue, 0),
    lowStockItems: inventoryData.filter(item => item.status === 'low-stock').length,
    outOfStockItems: inventoryData.filter(item => item.status === 'out-of-stock').length,
    avgTurnover: inventoryData.reduce((sum, item) => sum + item.turnoverRate, 0) / inventoryData.length,
    totalWarehouses: warehouses.length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading inventory data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Inventory Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced inventory tracking and warehouse management
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardMetrics.totalProducts.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(dashboardMetrics.totalValue)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardMetrics.lowStockItems}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardMetrics.outOfStockItems}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Turnover</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardMetrics.avgTurnover.toFixed(1)}x
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-full">
                <Warehouse className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Warehouses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardMetrics.totalWarehouses}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'products', label: 'Products', icon: Package },
          { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
          { id: 'movements', label: 'Stock Movements', icon: Activity },
          { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
          { id: 'reports', label: 'Reports', icon: FileText }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inventory Health */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Inventory Health</h3>
              <div className="space-y-4">
                {['in-stock', 'low-stock', 'out-of-stock', 'overstock'].map(status => {
                  const count = inventoryData.filter(item => item.status === status).length;
                  const percentage = (count / inventoryData.length) * 100;
                  
                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(status)}
                          <span className="font-medium capitalize">{status.replace('-', ' ')}</span>
                        </div>
                        <span className="text-sm text-gray-500">{count} items ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            status === 'in-stock' ? 'bg-green-500' :
                            status === 'low-stock' ? 'bg-yellow-500' :
                            status === 'out-of-stock' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Products by Value */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Top Products by Value</h3>
              <div className="space-y-4">
                {inventoryData
                  .sort((a, b) => b.totalValue - a.totalValue)
                  .slice(0, 5)
                  .map(product => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(product.totalValue)}</p>
                        <p className="text-sm text-gray-500">{product.currentStock} units</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Warehouse Utilization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Warehouse Utilization</h3>
              <div className="space-y-4">
                {warehouses.map(warehouse => {
                  const utilizationPercentage = (warehouse.occupied / warehouse.capacity) * 100;
                  
                  return (
                    <div key={warehouse.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{warehouse.name}</h4>
                          <p className="text-sm text-gray-500">{warehouse.location}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {utilizationPercentage.toFixed(1)}% utilized
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            utilizationPercentage < 70 ? 'bg-green-500' :
                            utilizationPercentage < 90 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${utilizationPercentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{warehouse.occupied.toLocaleString()} sq ft used</span>
                        <span>{warehouse.capacity.toLocaleString()} sq ft total</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Stock Movements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Recent Stock Movements</h3>
              <div className="space-y-3">
                {inventoryData
                  .flatMap(product => 
                    product.movement.map(move => ({
                      ...move,
                      productName: product.name,
                      sku: product.sku
                    }))
                  )
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 8)
                  .map((movement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          movement.type === 'sale' ? 'bg-red-100 text-red-600' :
                          movement.type === 'return' ? 'bg-blue-100 text-blue-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {movement.type === 'sale' ? <ShoppingCart className="h-4 w-4" /> :
                           movement.type === 'return' ? <RefreshCw className="h-4 w-4" /> :
                           <Settings className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{movement.productName}</p>
                          <p className="text-xs text-gray-500">{movement.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-sm ${
                          movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                        </p>
                        <p className="text-xs text-gray-500">{movement.date}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            {/* Filters and Search */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home & Garden</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>

                <select
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Warehouses</option>
                  {warehouses.map(warehouse => (
                    <option key={warehouse.id} value={warehouse.name}>
                      {warehouse.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Stock Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Turnover
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {filteredInventory.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                              <Image className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{product.name}</h4>
                              <p className="text-sm text-gray-500">{product.sku}</p>
                              <p className="text-xs text-gray-400">{product.warehouse} • {product.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Available: {product.availableStock}</span>
                              <span>Total: {product.currentStock}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  calculateStockLevel(product.currentStock, product.maxStock) < 25 ? 'bg-red-500' :
                                  calculateStockLevel(product.currentStock, product.maxStock) < 50 ? 'bg-yellow-500' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${calculateStockLevel(product.currentStock, product.maxStock)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500">
                              Reorder at {product.reorderPoint} • Max {product.maxStock}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                            {getStatusIcon(product.status)}
                            <span className="ml-1 capitalize">{product.status.replace('-', ' ')}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(product.totalValue)}
                            </p>
                            <p className="text-gray-500">
                              {formatCurrency(product.unitCost)} each
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">{product.turnoverRate}x</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedProduct(product)}
                              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'warehouses' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {warehouses.map(warehouse => (
              <div key={warehouse.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{warehouse.name}</h3>
                    <p className="text-sm text-gray-500">{warehouse.location}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    warehouse.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {warehouse.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Capacity Utilization</span>
                      <span>{((warehouse.occupied / warehouse.capacity) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${(warehouse.occupied / warehouse.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">{warehouse.products}</p>
                      <p className="text-xs text-gray-500">Products</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-lg font-bold text-green-600">{formatCurrency(warehouse.value)}</p>
                      <p className="text-xs text-gray-500">Total Value</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Manager: {warehouse.manager}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 px-3 bg-primary-600 text-white rounded text-sm hover:bg-primary-700">
                        View Details
                      </button>
                      <button className="py-2 px-3 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab === 'movements' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4">Stock Movements</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed stock movement tracking and history would be displayed here.
            </p>
          </div>
        )}

        {activeTab === 'forecasting' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4">Demand Forecasting</h3>
            <p className="text-gray-600 dark:text-gray-400">
              AI-powered demand forecasting and inventory optimization would be displayed here.
            </p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4">Inventory Reports</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive inventory reports and analytics would be displayed here.
            </p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Product Details
                </h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Product Name
                      </label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedProduct.name}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          SKU
                        </label>
                        <p className="text-gray-900 dark:text-white">{selectedProduct.sku}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Category
                        </label>
                        <p className="text-gray-900 dark:text-white">{selectedProduct.category}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Current Stock
                        </label>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {selectedProduct.currentStock}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Available
                        </label>
                        <p className="text-2xl font-bold text-green-600">
                          {selectedProduct.availableStock}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Reserved
                        </label>
                        <p className="text-2xl font-bold text-yellow-600">
                          {selectedProduct.reservedStock}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Recent Movements
                      </label>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {selectedProduct.movement.map((movement, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                              <p className="font-medium capitalize">{movement.type}</p>
                              <p className="text-sm text-gray-500">{movement.reason}</p>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${
                                movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                              </p>
                              <p className="text-sm text-gray-500">{movement.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedInventoryManagement;