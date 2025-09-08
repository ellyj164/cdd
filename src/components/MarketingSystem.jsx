import React, { useState, useEffect } from 'react';
import { 
  Percent, 
  Clock, 
  Gift, 
  Star, 
  Zap, 
  Users, 
  Trophy, 
  Target,
  Calendar,
  Mail,
  Share2,
  Copy,
  CheckCircle,
  Timer,
  Flame
} from 'lucide-react';

// Advanced Marketing & Promotions System
export const MarketingSystem = ({ 
  userId, 
  onApplyCoupon, 
  onJoinLoyalty, 
  onShareReward 
}) => {
  const [activeCoupons, setActiveCoupons] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [emailCampaigns, setEmailCampaigns] = useState([]);
  const [copiedCode, setCopiedCode] = useState('');

  // Initialize marketing data
  useEffect(() => {
    // Mock active coupons
    setActiveCoupons([
      {
        id: 'coup1',
        code: 'WELCOME20',
        title: '20% Off Your First Order',
        description: 'Valid for new customers only',
        discount: 20,
        type: 'percentage',
        minOrder: 50,
        expiresAt: '2024-02-29T23:59:59Z',
        category: 'new-customer',
        usageLimit: 1,
        used: false
      },
      {
        id: 'coup2',
        code: 'FREESHIP',
        title: 'Free Shipping',
        description: 'Free shipping on orders over $25',
        discount: 0,
        type: 'shipping',
        minOrder: 25,
        expiresAt: '2024-03-15T23:59:59Z',
        category: 'shipping',
        usageLimit: null,
        used: false
      },
      {
        id: 'coup3',
        code: 'BUNDLE15',
        title: '15% Off Bundles',
        description: 'Save on product bundles',
        discount: 15,
        type: 'category',
        minOrder: 0,
        expiresAt: '2024-02-20T23:59:59Z',
        category: 'bundles',
        usageLimit: 3,
        used: false
      }
    ]);

    // Mock flash sales
    setFlashSales([
      {
        id: 'flash1',
        title: 'Lightning Deal: Smart TV',
        originalPrice: 899.99,
        salePrice: 549.99,
        discount: 39,
        timeLeft: 3600 * 2 + 1800, // 2.5 hours in seconds
        soldCount: 47,
        totalStock: 100,
        image: 'https://placehold.co/300x300/1e40af/ffffff?text=Smart+TV'
      },
      {
        id: 'flash2',
        title: 'Flash Sale: Wireless Earbuds',
        originalPrice: 199.99,
        salePrice: 99.99,
        discount: 50,
        timeLeft: 7200, // 2 hours
        soldCount: 23,
        totalStock: 50,
        image: 'https://placehold.co/300x300/dc2626/ffffff?text=Earbuds'
      }
    ]);

    // Mock user data
    setLoyaltyPoints(2450);
    setReferralCode('REF-USER-' + Math.random().toString(36).substr(2, 6).toUpperCase());
  }, [userId]);

  // Timer for flash sales
  useEffect(() => {
    const timer = setInterval(() => {
      setFlashSales(prevSales => 
        prevSales.map(sale => ({
          ...sale,
          timeLeft: Math.max(0, sale.timeLeft - 1)
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time remaining
  const formatTimeLeft = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  // Copy referral code
  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(referralCode);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Flash Sales Section */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-red-600 rounded-lg">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              ⚡ Flash Sales
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Limited time offers - grab them before they're gone!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flashSales.map((sale) => (
            <FlashSaleCard key={sale.id} sale={sale} />
          ))}
        </div>
      </div>

      {/* Coupons & Discounts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Percent className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Available Coupons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} onApply={onApplyCoupon} />
          ))}
        </div>
      </div>

      {/* Loyalty Program */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Loyalty Rewards
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Earn points with every purchase
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-600">
              {loyaltyPoints.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Points Available
            </div>
          </div>
        </div>

        <LoyaltyProgram points={loyaltyPoints} onJoin={onJoinLoyalty} />
      </div>

      {/* Referral Program */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Share2 className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Refer Friends & Earn
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Your Referral Code
            </h3>
            <div className="flex items-center space-x-3">
              <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-lg">
                {referralCode}
              </div>
              <button
                onClick={copyReferralCode}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {copiedCode === referralCode ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            
            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Gift className="w-4 h-4" />
                <span>You get $10 credit for each referral</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Your friend gets 20% off their first order</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Referral Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Referrals</span>
                <span className="font-semibold text-gray-900 dark:text-white">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">This Month</span>
                <span className="font-semibold text-gray-900 dark:text-white">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Earnings</span>
                <span className="font-semibold text-green-600">$120</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Campaigns */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Mail className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Exclusive Email Offers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <EmailCampaignCard
            title="Weekly Deals Newsletter"
            description="Get the best deals delivered to your inbox every Tuesday"
            discount="Up to 50% off"
            subscribed={true}
          />
          <EmailCampaignCard
            title="New Arrivals Alert"
            description="Be the first to know about new products in your favorite categories"
            discount="Early access"
            subscribed={false}
          />
          <EmailCampaignCard
            title="Abandoned Cart Recovery"
            description="Get reminded about items you left behind with exclusive discounts"
            discount="Extra 10% off"
            subscribed={true}
          />
        </div>
      </div>
    </div>
  );
};

// Flash Sale Card Component
const FlashSaleCard = ({ sale }) => {
  const progressPercentage = (sale.soldCount / sale.totalStock) * 100;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={sale.image}
          alt={sale.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
          -{sale.discount}%
        </div>
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          <Timer className="w-3 h-3 inline mr-1" />
          {formatTimeLeft(sale.timeLeft)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {sale.title}
        </h3>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-2xl font-bold text-red-600">
            ${sale.salePrice}
          </span>
          <span className="text-lg text-gray-500 line-through">
            ${sale.originalPrice}
          </span>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Sold: {sale.soldCount}</span>
            <span>Available: {sale.totalStock - sale.soldCount}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  );
};

// Coupon Card Component
const CouponCard = ({ coupon, onApply }) => {
  const isExpired = new Date(coupon.expiresAt) < new Date();
  
  return (
    <div className={`relative overflow-hidden rounded-lg border-2 border-dashed p-4 ${
      isExpired 
        ? 'border-gray-300 bg-gray-50 dark:bg-gray-700' 
        : 'border-green-400 bg-green-50 dark:bg-green-900/20'
    }`}>
      {/* Decorative circles */}
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-900 rounded-full" />
      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-900 rounded-full" />
      
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600 mb-1">
          {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : 
           coupon.type === 'shipping' ? 'FREE SHIPPING' : 
           coupon.title}
        </div>
        
        <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {coupon.code}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {coupon.description}
        </p>
        
        {coupon.minOrder > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Min. order: ${coupon.minOrder}
          </p>
        )}
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
        </div>
        
        <button
          onClick={() => onApply(coupon)}
          disabled={isExpired || coupon.used}
          className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            isExpired || coupon.used
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {coupon.used ? 'Used' : isExpired ? 'Expired' : 'Apply Coupon'}
        </button>
      </div>
    </div>
  );
};

// Loyalty Program Component
const LoyaltyProgram = ({ points, onJoin }) => {
  const tiers = [
    { name: 'Bronze', min: 0, max: 999, color: 'orange', benefits: ['1x points', 'Birthday bonus'] },
    { name: 'Silver', min: 1000, max: 4999, color: 'gray', benefits: ['1.5x points', 'Free shipping', 'Early access'] },
    { name: 'Gold', min: 5000, max: 9999, color: 'yellow', benefits: ['2x points', 'Priority support', 'Exclusive deals'] },
    { name: 'Platinum', min: 10000, max: Infinity, color: 'purple', benefits: ['3x points', 'Personal shopper', 'VIP events'] }
  ];

  const currentTier = tiers.find(tier => points >= tier.min && points <= tier.max);
  const nextTier = tiers.find(tier => tier.min > points);
  const pointsToNext = nextTier ? nextTier.min - points : 0;

  const rewards = [
    { points: 500, reward: '$5 Credit', description: 'Store credit for any purchase' },
    { points: 1000, reward: 'Free Shipping', description: 'Free shipping on next order' },
    { points: 2000, reward: '$25 Credit', description: 'Store credit for any purchase' },
    { points: 5000, reward: 'Premium Membership', description: '3 months of premium benefits' }
  ];

  return (
    <div className="space-y-6">
      {/* Current Tier Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Current Status: {currentTier?.name}
            </h3>
            {nextTier && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {pointsToNext} points to {nextTier.name}
              </p>
            )}
          </div>
          <div className={`px-4 py-2 bg-${currentTier?.color}-100 dark:bg-${currentTier?.color}-900/20 text-${currentTier?.color}-800 dark:text-${currentTier?.color}-200 rounded-full text-sm font-medium`}>
            {currentTier?.name}
          </div>
        </div>

        {/* Progress to next tier */}
        {nextTier && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>{currentTier?.min}</span>
              <span>{nextTier.min}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`bg-${currentTier?.color}-600 h-2 rounded-full transition-all`}
                style={{ 
                  width: `${((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100}%` 
                }}
              />
            </div>
          </div>
        )}

        {/* Current Benefits */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Your Benefits:</h4>
          <div className="flex flex-wrap gap-2">
            {currentTier?.benefits.map((benefit, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Redeem Points
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg ${
                points >= reward.points
                  ? 'border-green-300 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {reward.reward}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {reward.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600">
                    {reward.points}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
              
              <button
                disabled={points < reward.points}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  points >= reward.points
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                }`}
              >
                {points >= reward.points ? 'Redeem' : 'Not Enough Points'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Email Campaign Card Component
const EmailCampaignCard = ({ title, description, discount, subscribed }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <Mail className="w-6 h-6 text-indigo-600 flex-shrink-0" />
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          subscribed 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}>
          {subscribed ? 'Subscribed' : 'Not Subscribed'}
        </span>
      </div>
      
      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h4>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {description}
      </p>
      
      <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
        {discount}
      </div>
      
      <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
        subscribed
          ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
      }`}>
        {subscribed ? 'Manage' : 'Subscribe'}
      </button>
    </div>
  );
};

export default MarketingSystem;