import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign, 
  ShoppingCart, 
  Eye, 
  Clock,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  Target,
  Zap,
  Package,
  Star,
  ArrowUp,
  ArrowDown,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  Map,
  ShoppingBag,
  CreditCard,
  Percent,
  AlertCircle,
  CheckCircle,
  MousePointer,
  Share2
} from 'lucide-react';

// Advanced Analytics Dashboard
export const AdvancedAnalyticsDashboard = ({ 
  userRole = 'admin', // admin, vendor, or customer
  timeRange = '30d',
  onExport,
  onTimeRangeChange 
}) => {
  const [dashboardData, setDashboardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [realTimeData, setRealTimeData] = useState({});

  // Load analytics data
  useEffect(() => {
    const loadAnalyticsData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = {
        overview: {
          revenue: {
            current: 2847250,
            previous: 2421340,
            change: 17.6,
            trend: 'up',
            target: 3000000
          },
          orders: {
            current: 42847,
            previous: 38203,
            change: 12.2,
            trend: 'up',
            target: 45000
          },
          customers: {
            current: 15634,
            previous: 14892,
            change: 5.0,
            trend: 'up',
            target: 16000
          },
          conversion: {
            current: 3.42,
            previous: 3.18,
            change: 7.5,
            trend: 'up',
            target: 4.0
          },
          avgOrderValue: {
            current: 156.78,
            previous: 142.34,
            change: 10.1,
            trend: 'up',
            target: 165.00
          },
          returnRate: {
            current: 8.2,
            previous: 9.1,
            change: -9.9,
            trend: 'down',
            target: 7.0
          }
        },
        sales: {
          daily: [
            { date: '2024-01-15', revenue: 85420, orders: 1240, customers: 890 },
            { date: '2024-01-16', revenue: 92340, orders: 1356, customers: 945 },
            { date: '2024-01-17', revenue: 78950, orders: 1189, customers: 823 },
            { date: '2024-01-18', revenue: 105600, orders: 1567, customers: 1034 },
            { date: '2024-01-19', revenue: 98750, orders: 1423, customers: 987 },
            { date: '2024-01-20', revenue: 112380, orders: 1634, customers: 1156 },
            { date: '2024-01-21', revenue: 126900, orders: 1789, customers: 1298 }
          ],
          topProducts: [
            { name: 'iPhone 15 Pro Max', revenue: 125600, units: 105, growth: 23.4 },
            { name: 'Samsung Galaxy S24 Ultra', revenue: 98400, units: 82, growth: 18.7 },
            { name: 'MacBook Pro M3', revenue: 156800, units: 78, growth: 15.2 },
            { name: 'AirPods Pro 2', revenue: 45600, units: 190, growth: 12.8 },
            { name: 'iPad Pro 12.9"', revenue: 78900, units: 67, growth: 9.5 }
          ],
          categories: [
            { name: 'Electronics', revenue: 1256780, percentage: 44.2, growth: 18.5 },
            { name: 'Fashion', revenue: 785650, percentage: 27.6, growth: 12.3 },
            { name: 'Home & Garden', revenue: 456920, percentage: 16.1, growth: 8.7 },
            { name: 'Sports & Outdoors', revenue: 234870, percentage: 8.3, growth: 15.2 },
            { name: 'Books & Media', revenue: 112780, percentage: 3.8, growth: 5.4 }
          ]
        },
        customers: {
          acquisition: {
            organic: 45.6,
            paid: 28.4,
            social: 12.8,
            email: 8.9,
            referral: 4.3
          },
          demographics: {
            ageGroups: [
              { range: '18-24', percentage: 18.2, count: 2845 },
              { range: '25-34', percentage: 35.7, count: 5581 },
              { range: '35-44', percentage: 26.1, count: 4081 },
              { range: '45-54', percentage: 12.8, count: 2001 },
              { range: '55+', percentage: 7.2, count: 1126 }
            ],
            locations: [
              { country: 'United States', percentage: 45.2, count: 7067 },
              { country: 'Canada', percentage: 12.8, count: 2001 },
              { country: 'United Kingdom', percentage: 8.9, count: 1391 },
              { country: 'Germany', percentage: 6.7, count: 1047 },
              { country: 'France', percentage: 5.1, count: 797 }
            ]
          },
          behavior: {
            sessionDuration: 8.4,
            pageViews: 12.7,
            bounceRate: 42.3,
            returnVisitors: 34.6
          }
        },
        inventory: {
          turnover: 6.8,
          stockouts: 23,
          lowStock: 145,
          deadStock: 67,
          categories: [
            { name: 'Electronics', turnover: 8.2, stock: 2340, value: 456780 },
            { name: 'Fashion', turnover: 12.4, stock: 5670, value: 234560 },
            { name: 'Home & Garden', turnover: 4.6, stock: 1890, value: 123450 }
          ]
        },
        marketing: {
          campaigns: [
            { name: 'Summer Sale 2024', roi: 345.6, spent: 15600, revenue: 53900, status: 'active' },
            { name: 'New Year Promo', roi: 278.9, spent: 22400, revenue: 62500, status: 'completed' },
            { name: 'Back to School', roi: 198.4, spent: 18900, revenue: 37500, status: 'active' }
          ],
          channels: [
            { name: 'Google Ads', cost: 45600, conversions: 1234, cpa: 36.95, roas: 4.2 },
            { name: 'Facebook Ads', cost: 32400, conversions: 890, cpa: 36.40, roas: 3.8 },
            { name: 'Email Marketing', cost: 5600, conversions: 456, cpa: 12.28, roas: 8.9 },
            { name: 'Influencer Marketing', cost: 28900, conversions: 567, cpa: 50.97, roas: 2.9 }
          ]
        }
      };

      setDashboardData(mockData);
      setIsLoading(false);
    };

    loadAnalyticsData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadAnalyticsData, 300000);
    return () => clearInterval(interval);
  }, [timeRange]);

  // Real-time data updates
  useEffect(() => {
    const updateRealTimeData = () => {
      setRealTimeData({
        activeUsers: Math.floor(Math.random() * 500) + 200,
        currentRevenue: Math.floor(Math.random() * 5000) + 15000,
        ordersToday: Math.floor(Math.random() * 100) + 350,
        conversionRate: (Math.random() * 2 + 2.5).toFixed(2)
      });
    };

    updateRealTimeData();
    const interval = setInterval(updateRealTimeData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getMetricIcon = (metric) => {
    const icons = {
      revenue: DollarSign,
      orders: ShoppingCart,
      customers: Users,
      conversion: Target,
      avgOrderValue: CreditCard,
      returnRate: RefreshCw
    };
    return icons[metric] || Activity;
  };

  const getMetricColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading analytics data...</p>
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
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive business intelligence and insights
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={(e) => onTimeRangeChange?.(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            
            <button
              onClick={onExport}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Real-time Stats Bar */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm opacity-90">Active Users</p>
                <p className="text-xl font-bold">{realTimeData.activeUsers}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm opacity-90">Today's Revenue</p>
                <p className="text-xl font-bold">{formatCurrency(realTimeData.currentRevenue)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm opacity-90">Orders Today</p>
                <p className="text-xl font-bold">{realTimeData.ordersToday}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm opacity-90">Conversion Rate</p>
                <p className="text-xl font-bold">{realTimeData.conversionRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {Object.entries(dashboardData.overview || {}).map(([key, data]) => {
          const IconComponent = getMetricIcon(key);
          const isPositive = data.trend === 'up';
          
          return (
            <div key={key} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                  <IconComponent className={`h-6 w-6 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <div className={`flex items-center space-x-1 ${getMetricColor(data.trend)}`}>
                  {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span className="text-sm font-medium">{formatPercentage(data.change)}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {key === 'revenue' || key === 'avgOrderValue' ? formatCurrency(data.current) : 
                   key === 'conversion' || key === 'returnRate' ? `${data.current}%` : 
                   data.current.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min((data.current / data.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Target: {key === 'revenue' || key === 'avgOrderValue' ? formatCurrency(data.target) : 
                          key === 'conversion' || key === 'returnRate' ? `${data.target}%` : 
                          data.target.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'sales', label: 'Sales', icon: TrendingUp },
          { id: 'customers', label: 'Customers', icon: Users },
          { id: 'inventory', label: 'Inventory', icon: Package },
          { id: 'marketing', label: 'Marketing', icon: Target },
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
            {/* Revenue Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Revenue Trend</h3>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">Revenue chart would be rendered here</p>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Top Products</h3>
              <div className="space-y-4">
                {dashboardData.sales?.topProducts?.slice(0, 5).map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.units} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(product.revenue)}</p>
                      <div className="flex items-center space-x-1 text-green-600">
                        <ArrowUp className="h-3 w-3" />
                        <span className="text-xs">{product.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Category Performance</h3>
              <div className="space-y-4">
                {dashboardData.sales?.categories?.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{category.percentage}%</span>
                        <div className="flex items-center space-x-1 text-green-600">
                          <ArrowUp className="h-3 w-3" />
                          <span className="text-xs">{category.growth}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Acquisition */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Customer Acquisition</h3>
              <div className="space-y-4">
                {Object.entries(dashboardData.customers?.acquisition || {}).map(([channel, percentage]) => (
                  <div key={channel} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize">{channel}</span>
                      <span className="text-sm text-gray-500">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Sales Performance</h3>
              <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 text-lg">Advanced sales charts would be rendered here</p>
                  <p className="text-sm text-gray-500 mt-2">Including daily/weekly/monthly revenue, order trends, and forecasting</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Demographics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Age Demographics</h3>
              <div className="space-y-4">
                {dashboardData.customers?.demographics?.ageGroups?.map((group, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{group.range}</span>
                      <div className="text-right">
                        <span className="text-sm font-bold">{group.percentage}%</span>
                        <p className="text-xs text-gray-500">{group.count.toLocaleString()} users</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${group.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Geographic Distribution</h3>
              <div className="space-y-4">
                {dashboardData.customers?.demographics?.locations?.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">{location.country}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{location.percentage}%</span>
                      <p className="text-xs text-gray-500">{location.count.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Behavior Metrics */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Customer Behavior</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(dashboardData.customers?.behavior || {}).map(([metric, value]) => (
                  <div key={metric} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600 mb-2">
                      {metric === 'sessionDuration' ? `${value} min` : 
                       metric === 'pageViews' ? value.toFixed(1) :
                       `${value}%`}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {metric.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Inventory Health</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{dashboardData.inventory?.turnover}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Turnover Rate</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-2">{dashboardData.inventory?.stockouts}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Stockouts</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">{dashboardData.inventory?.lowStock}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Low Stock</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600 mb-2">{dashboardData.inventory?.deadStock}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Dead Stock</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Category Performance</h3>
              <div className="space-y-4">
                {dashboardData.inventory?.categories?.map((category, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{category.name}</h4>
                      <span className="text-sm text-green-600 font-bold">
                        {category.turnover}x turnover
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Stock:</span>
                        <span className="font-medium ml-2">{category.stock.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Value:</span>
                        <span className="font-medium ml-2">{formatCurrency(category.value)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Campaign Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Campaign Performance</h3>
              <div className="space-y-4">
                {dashboardData.marketing?.campaigns?.map((campaign, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{campaign.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">ROI:</span>
                        <span className="font-bold text-green-600 ml-2">{campaign.roi}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Spent:</span>
                        <span className="font-medium ml-2">{formatCurrency(campaign.spent)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Revenue:</span>
                        <span className="font-medium ml-2">{formatCurrency(campaign.revenue)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Channel Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Channel Performance</h3>
              <div className="space-y-4">
                {dashboardData.marketing?.channels?.map((channel, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{channel.name}</h4>
                      <span className="text-sm font-bold text-primary-600">
                        ROAS: {channel.roas}x
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Cost:</span>
                        <span className="font-medium ml-2">{formatCurrency(channel.cost)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Conversions:</span>
                        <span className="font-medium ml-2">{channel.conversions}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">CPA:</span>
                        <span className="font-medium ml-2">{formatCurrency(channel.cpa)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4">Custom Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Sales Report', description: 'Detailed sales analytics', icon: BarChart3 },
                { title: 'Customer Report', description: 'Customer behavior insights', icon: Users },
                { title: 'Inventory Report', description: 'Stock and turnover analysis', icon: Package },
                { title: 'Marketing Report', description: 'Campaign performance', icon: Target },
                { title: 'Financial Report', description: 'Revenue and profit analysis', icon: DollarSign },
                { title: 'Performance Report', description: 'Overall business metrics', icon: TrendingUp }
              ].map((report, index) => (
                <div key={index} className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                      <report.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{report.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{report.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 py-2 px-3 bg-primary-600 text-white rounded text-sm hover:bg-primary-700">
                      Generate
                    </button>
                    <button className="py-2 px-3 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;