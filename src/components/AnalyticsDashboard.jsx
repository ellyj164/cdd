import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
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
  Zap
} from 'lucide-react';

// Advanced Analytics Dashboard
export const AnalyticsDashboard = ({ 
  userRole = 'admin', // admin, vendor, or customer
  timeRange = '30d',
  onExport,
  onTimeRangeChange 
}) => {
  const [dashboardData, setDashboardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [realTimeData, setRealTimeData] = useState({});

  // Mock analytics data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setDashboardData({
        revenue: {
          current: 847250,
          previous: 721340,
          change: 17.5,
          trend: 'up'
        },
        orders: {
          current: 12847,
          previous: 11203,
          change: 14.7,
          trend: 'up'
        },
        customers: {
          current: 8934,
          previous: 8156,
          change: 9.5,
          trend: 'up'
        },
        conversion: {
          current: 3.2,
          previous: 2.8,
          change: 14.3,
          trend: 'up'
        },
        chartData: {
          revenue: [
            { date: '2024-01-01', value: 25000 },
            { date: '2024-01-02', value: 28000 },
            { date: '2024-01-03', value: 32000 },
            { date: '2024-01-04', value: 29000 },
            { date: '2024-01-05', value: 35000 },
            { date: '2024-01-06', value: 38000 },
            { date: '2024-01-07', value: 42000 }
          ],
          visitors: [
            { date: '2024-01-01', value: 1200 },
            { date: '2024-01-02', value: 1350 },
            { date: '2024-01-03', value: 1100 },
            { date: '2024-01-04', value: 1450 },
            { date: '2024-01-05', value: 1600 },
            { date: '2024-01-06', value: 1380 },
            { date: '2024-01-07', value: 1750 }
          ]
        },
        topProducts: [
          { id: 1, name: 'Wireless Headphones Pro', sales: 1247, revenue: 186420 },
          { id: 2, name: 'Smart Fitness Watch', sales: 934, revenue: 156890 },
          { id: 3, name: 'Laptop Stand Deluxe', sales: 756, revenue: 67830 },
          { id: 4, name: 'USB-C Hub', sales: 623, revenue: 43610 },
          { id: 5, name: 'Desk Organizer', sales: 445, revenue: 22250 }
        ],
        customerSegments: [
          { segment: 'New Customers', count: 2341, percentage: 26.2 },
          { segment: 'Returning Customers', count: 4892, percentage: 54.7 },
          { segment: 'VIP Customers', count: 1701, percentage: 19.1 }
        ],
        deviceBreakdown: [
          { device: 'Desktop', visitors: 3456, percentage: 45.2 },
          { device: 'Mobile', visitors: 3211, percentage: 42.0 },
          { device: 'Tablet', visitors: 978, percentage: 12.8 }
        ],
        geographicData: [
          { country: 'United States', orders: 4523, revenue: 245670 },
          { country: 'Canada', orders: 1834, revenue: 98450 },
          { country: 'United Kingdom', orders: 1456, revenue: 78930 },
          { country: 'Germany', orders: 1234, revenue: 67540 },
          { country: 'Australia', orders: 867, revenue: 45230 }
        ]
      });
      
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        activeUsers: Math.floor(Math.random() * 500) + 100,
        cartValue: Math.floor(Math.random() * 50000) + 10000,
        conversionRate: (Math.random() * 2 + 2).toFixed(2),
        pageViews: Math.floor(Math.random() * 1000) + 500
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getChangeColor = (change, trend) => {
    if (trend === 'up' && change > 0) return 'text-green-600';
    if (trend === 'down' && change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">
          Loading analytics...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time insights and performance metrics
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange?.(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button
            onClick={onExport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Live Metrics
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {realTimeData.activeUsers || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(realTimeData.cartValue || 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Cart Value</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {realTimeData.conversionRate || 0}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {formatNumber(realTimeData.pageViews || 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Page Views</div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(dashboardData.revenue?.current || 0)}
          change={dashboardData.revenue?.change || 0}
          trend={dashboardData.revenue?.trend}
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Total Orders"
          value={formatNumber(dashboardData.orders?.current || 0)}
          change={dashboardData.orders?.change || 0}
          trend={dashboardData.orders?.trend}
          icon={ShoppingCart}
          color="blue"
        />
        <MetricCard
          title="Total Customers"
          value={formatNumber(dashboardData.customers?.current || 0)}
          change={dashboardData.customers?.change || 0}
          trend={dashboardData.customers?.trend}
          icon={Users}
          color="purple"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${dashboardData.conversion?.current || 0}%`}
          change={dashboardData.conversion?.change || 0}
          trend={dashboardData.conversion?.trend}
          icon={Target}
          color="orange"
        />
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Trend
            </h3>
            <div className="flex items-center space-x-2">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
              >
                <option value="revenue">Revenue</option>
                <option value="visitors">Visitors</option>
                <option value="orders">Orders</option>
              </select>
            </div>
          </div>
          
          {/* Simple chart representation */}
          <div className="h-64 flex items-end space-x-2">
            {dashboardData.chartData?.[selectedMetric]?.map((data, index) => (
              <div
                key={index}
                className="flex-1 bg-blue-200 dark:bg-blue-700 rounded-t"
                style={{
                  height: `${(data.value / Math.max(...dashboardData.chartData[selectedMetric].map(d => d.value))) * 100}%`
                }}
                title={`${new Date(data.date).toLocaleDateString()}: ${data.value}`}
              />
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Top Selling Products
          </h3>
          
          <div className="space-y-4">
            {dashboardData.topProducts?.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {product.sales} sales
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(product.revenue)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Segments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Customer Segments
          </h3>
          
          <div className="space-y-4">
            {dashboardData.customerSegments?.map((segment, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{segment.segment}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {segment.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${segment.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Device Breakdown
          </h3>
          
          <div className="space-y-4">
            {dashboardData.deviceBreakdown?.map((device, index) => {
              const Icon = device.device === 'Desktop' ? Monitor : 
                          device.device === 'Mobile' ? Smartphone : 
                          Monitor;
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{device.device}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {formatNumber(device.visitors)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {device.percentage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Geographic Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Geographic Performance
          </h3>
          
          <div className="space-y-4">
            {dashboardData.geographicData?.map((geo, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{geo.country}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(geo.revenue)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {geo.orders} orders
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          AI-Powered Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InsightCard
            type="success"
            title="Revenue Growth"
            description="Revenue increased by 17.5% compared to last period, driven by mobile sales growth."
          />
          <InsightCard
            type="warning"
            title="Cart Abandonment"
            description="Cart abandonment rate is 68%. Consider implementing exit-intent popups."
          />
          <InsightCard
            type="info"
            title="Top Traffic Source"
            description="Social media drives 34% of traffic. Increase social media ad spend for better ROI."
          />
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, change, trend, icon: Icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          <div className={`flex items-center mt-2 ${getChangeColor(change, trend)}`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'transform rotate-180' : ''}`} />
            <span className="text-sm font-medium">
              {Math.abs(change)}% from last period
            </span>
          </div>
        </div>
        <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/20 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );
};

// Insight Card Component
const InsightCard = ({ type, title, description }) => {
  const colors = {
    success: 'border-green-200 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200',
    warning: 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200',
    info: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
  };

  return (
    <div className={`border rounded-lg p-4 ${colors[type]}`}>
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
};

function getChangeColor(change, trend) {
  if (trend === 'up' && change > 0) return 'text-green-600';
  if (trend === 'down' && change < 0) return 'text-red-600';
  return 'text-gray-600';
}

export default AnalyticsDashboard;