import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Gift, 
  Star, 
  Coins, 
  Crown, 
  Zap, 
  Target, 
  Award, 
  TrendingUp,
  Users,
  Calendar,
  ShoppingBag,
  Heart,
  Share2,
  Check,
  Clock,
  RefreshCw,
  Sparkles,
  Badge,
  Medal,
  Flame
} from 'lucide-react';

// Enhanced Loyalty Program Component
export const EnhancedLoyaltyProgram = ({ 
  userId, 
  userPoints, 
  userTier, 
  onClaimReward,
  onCompleteChallenge 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [challenges, setChallenges] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [referralCode, setReferralCode] = useState('');

  // Tier system configuration
  const tiers = [
    {
      name: 'Bronze',
      icon: Award,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      minPoints: 0,
      maxPoints: 999,
      benefits: [
        '1 point per $1 spent',
        '5% birthday discount',
        'Free standard shipping on orders over $50'
      ],
      nextTierPoints: 1000
    },
    {
      name: 'Silver',
      icon: Medal,
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      minPoints: 1000,
      maxPoints: 4999,
      benefits: [
        '1.5 points per $1 spent',
        '10% birthday discount',
        'Free standard shipping on all orders',
        'Early sale access'
      ],
      nextTierPoints: 5000
    },
    {
      name: 'Gold',
      icon: Crown,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      minPoints: 5000,
      maxPoints: 14999,
      benefits: [
        '2 points per $1 spent',
        '15% birthday discount',
        'Free expedited shipping',
        'Priority customer support',
        'Exclusive product access'
      ],
      nextTierPoints: 15000
    },
    {
      name: 'Platinum',
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      minPoints: 15000,
      maxPoints: 49999,
      benefits: [
        '3 points per $1 spent',
        '20% birthday discount',
        'Free express shipping',
        'Dedicated account manager',
        'VIP events and experiences',
        'Personal shopping assistant'
      ],
      nextTierPoints: 50000
    },
    {
      name: 'Diamond',
      icon: Sparkles,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      minPoints: 50000,
      maxPoints: null,
      benefits: [
        '5 points per $1 spent',
        '25% birthday discount',
        'Free same-day delivery',
        'Concierge service',
        'Exclusive luxury experiences',
        'Custom product designs',
        'Annual VIP gifts'
      ],
      nextTierPoints: null
    }
  ];

  const currentTier = tiers.find(tier => 
    userPoints >= tier.minPoints && (tier.maxPoints === null || userPoints <= tier.maxPoints)
  ) || tiers[0];

  const nextTier = tiers.find(tier => tier.minPoints > userPoints);
  const progressToNextTier = nextTier ? 
    ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;

  // Load challenges and rewards
  useEffect(() => {
    const loadLoyaltyData = () => {
      // Mock challenges
      setChallenges([
        {
          id: 1,
          title: 'Shopping Streak',
          description: 'Make purchases on 5 consecutive days',
          icon: Flame,
          progress: 3,
          total: 5,
          reward: 500,
          type: 'daily',
          difficulty: 'medium',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        },
        {
          id: 2,
          title: 'Review Master',
          description: 'Write 10 product reviews',
          icon: Star,
          progress: 7,
          total: 10,
          reward: 300,
          type: 'engagement',
          difficulty: 'easy',
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        {
          id: 3,
          title: 'Big Spender',
          description: 'Spend $1,000 in a month',
          icon: ShoppingBag,
          progress: 650,
          total: 1000,
          reward: 1000,
          type: 'spending',
          difficulty: 'hard',
          expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        },
        {
          id: 4,
          title: 'Social Butterfly',
          description: 'Share 5 products on social media',
          icon: Share2,
          progress: 2,
          total: 5,
          reward: 200,
          type: 'social',
          difficulty: 'easy',
          expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        }
      ]);

      // Mock rewards
      setRewards([
        {
          id: 1,
          title: '$5 Off Coupon',
          description: 'Get $5 off your next purchase',
          cost: 500,
          type: 'discount',
          icon: Gift,
          available: true,
          category: 'coupons'
        },
        {
          id: 2,
          title: 'Free Shipping',
          description: 'Free shipping on any order',
          cost: 200,
          type: 'shipping',
          icon: Zap,
          available: true,
          category: 'shipping'
        },
        {
          id: 3,
          title: '$25 Gift Card',
          description: 'Digital gift card for any purchase',
          cost: 2500,
          type: 'gift-card',
          icon: Gift,
          available: true,
          category: 'gift-cards'
        },
        {
          id: 4,
          title: 'VIP Support Access',
          description: '30 days of priority customer support',
          cost: 1000,
          type: 'service',
          icon: Crown,
          available: userPoints >= 1000,
          category: 'services'
        },
        {
          id: 5,
          title: 'Exclusive Product Preview',
          description: 'Early access to new product launches',
          cost: 1500,
          type: 'access',
          icon: Target,
          available: userPoints >= 1500,
          category: 'access'
        }
      ]);

      // Mock achievements
      setAchievements([
        {
          id: 1,
          title: 'First Purchase',
          description: 'Made your first purchase',
          icon: ShoppingBag,
          earned: true,
          earnedAt: new Date('2024-01-15'),
          points: 100
        },
        {
          id: 2,
          title: 'Review Hero',
          description: 'Left 50 product reviews',
          icon: Star,
          earned: true,
          earnedAt: new Date('2024-02-20'),
          points: 500
        },
        {
          id: 3,
          title: 'Loyal Customer',
          description: 'Reached Silver tier',
          icon: Medal,
          earned: userPoints >= 1000,
          earnedAt: userPoints >= 1000 ? new Date() : null,
          points: 250
        },
        {
          id: 4,
          title: 'Wishlist Creator',
          description: 'Added 25 items to wishlist',
          icon: Heart,
          earned: false,
          earnedAt: null,
          points: 200
        }
      ]);

      // Generate referral code
      setReferralCode(`REFER${userId}${Math.random().toString(36).substr(2, 4).toUpperCase()}`);
    };

    loadLoyaltyData();
  }, [userId, userPoints]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'daily': return 'text-blue-600 bg-blue-100';
      case 'engagement': return 'text-purple-600 bg-purple-100';
      case 'spending': return 'text-green-600 bg-green-100';
      case 'social': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeRemaining = (expiresAt) => {
    const now = new Date();
    const timeLeft = expiresAt - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    return 'Expiring soon';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Global Nexus Rewards
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Earn points, unlock exclusive benefits, and enjoy VIP treatment
        </p>
      </div>

      {/* Current Status Card */}
      <div className={`${currentTier.bgColor} ${currentTier.borderColor} border-2 rounded-xl p-6 mb-8`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full ${currentTier.bgColor}`}>
              <currentTier.icon className={`h-8 w-8 ${currentTier.color}`} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${currentTier.color}`}>
                {currentTier.name} Member
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {userPoints.toLocaleString()} points
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {userPoints.toLocaleString()}
              </span>
            </div>
            {nextTier && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {(nextTier.minPoints - userPoints).toLocaleString()} to {nextTier.name}
              </p>
            )}
          </div>
        </div>

        {/* Progress to next tier */}
        {nextTier && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Progress to {nextTier.name}</span>
              <span className="font-medium">{Math.round(progressToNextTier)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${currentTier.color.replace('text-', 'bg-')}`}
                style={{ width: `${progressToNextTier}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'challenges', label: 'Challenges', icon: Target },
          { id: 'rewards', label: 'Rewards', icon: Gift },
          { id: 'achievements', label: 'Achievements', icon: Trophy },
          { id: 'referral', label: 'Refer Friends', icon: Users }
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
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tier Benefits */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Crown className="h-6 w-6 mr-2 text-yellow-500" />
                Your Benefits
              </h3>
              <ul className="space-y-3">
                {currentTier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-blue-500" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full">
                      <ShoppingBag className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Purchase</p>
                      <p className="text-sm text-gray-500">Electronics order</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-bold">+125 pts</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                      <Star className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Review</p>
                      <p className="text-sm text-gray-500">Smartphone review</p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-bold">+50 pts</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-full">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Referral</p>
                      <p className="text-sm text-gray-500">Friend joined</p>
                    </div>
                  </div>
                  <span className="text-purple-600 font-bold">+200 pts</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map(challenge => {
              const IconComponent = challenge.icon;
              const progressPercent = (challenge.progress / challenge.total) * 100;
              const isCompleted = challenge.progress >= challenge.total;
              
              return (
                <div key={challenge.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full ${isCompleted ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <IconComponent className={`h-6 w-6 ${isCompleted ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{challenge.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Coins className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold text-yellow-600">{challenge.reward}</span>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(challenge.type)}`}>
                          {challenge.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress: {challenge.progress}/{challenge.total}</span>
                      <span className="font-medium">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isCompleted ? 'bg-green-500' : 'bg-primary-500'
                        }`}
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{formatTimeRemaining(challenge.expiresAt)}</span>
                    </div>
                    {isCompleted && (
                      <button
                        onClick={() => onCompleteChallenge(challenge.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <Trophy className="h-4 w-4" />
                        <span>Claim</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'rewards' && (
          <div>
            {/* Reward Categories */}
            <div className="mb-6">
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {['all', 'coupons', 'shipping', 'gift-cards', 'services', 'access'].map(category => (
                  <button
                    key={category}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map(reward => {
                const IconComponent = reward.icon;
                const canAfford = userPoints >= reward.cost;
                
                return (
                  <div key={reward.id} className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border transition-all ${
                    canAfford 
                      ? 'border-gray-200 dark:border-gray-700 hover:shadow-md' 
                      : 'border-gray-200 dark:border-gray-700 opacity-60'
                  }`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-full ${canAfford ? 'bg-primary-100' : 'bg-gray-100'}`}>
                        <IconComponent className={`h-6 w-6 ${canAfford ? 'text-primary-600' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">{reward.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{reward.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Coins className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold text-yellow-600">{reward.cost}</span>
                        <span className="text-sm text-gray-500">points</span>
                      </div>
                      <button
                        onClick={() => canAfford && onClaimReward(reward.id)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          canAfford
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Redeem' : 'Insufficient Points'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map(achievement => {
              const IconComponent = achievement.icon;
              
              return (
                <div key={achievement.id} className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border transition-all ${
                  achievement.earned 
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-full ${
                      achievement.earned ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        achievement.earned ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold ${
                        achievement.earned ? 'text-green-900 dark:text-green-100' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Check className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold text-yellow-600">+{achievement.points}</span>
                    </div>
                    {achievement.earned && achievement.earnedAt && (
                      <span className="text-xs text-gray-500">
                        Earned {achievement.earnedAt.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'referral' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white mb-8">
              <div className="text-center">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-90" />
                <h2 className="text-3xl font-bold mb-2">Refer Friends & Earn</h2>
                <p className="text-lg opacity-90 mb-6">
                  Give your friends $10 off their first order and get 500 points for each successful referral
                </p>
                
                <div className="bg-white/20 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-sm opacity-90 mb-2">Your Referral Code</p>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={referralCode}
                      readOnly
                      className="flex-1 bg-white/30 border border-white/40 rounded-lg px-4 py-3 text-white placeholder-white/70 text-lg font-mono text-center"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(referralCode)}
                      className="px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
                  <Share2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Share Your Code</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Send your unique referral code to friends and family
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Friend Purchases</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  They get $10 off their first order over $50
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full w-fit mx-auto mb-4">
                  <Coins className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">You Earn Points</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Receive 500 points for each successful referral
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-4">Referral History</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Sarah M.</p>
                    <p className="text-sm text-gray-500">Joined 2 days ago</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-bold">+500 pts</span>
                    <p className="text-sm text-gray-500">Completed</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">John D.</p>
                    <p className="text-sm text-gray-500">Joined 1 week ago</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-bold">+500 pts</span>
                    <p className="text-sm text-gray-500">Completed</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div>
                    <p className="font-medium">Mike R.</p>
                    <p className="text-sm text-gray-500">Invited yesterday</p>
                  </div>
                  <div className="text-right">
                    <span className="text-yellow-600 font-bold">Pending</span>
                    <p className="text-sm text-gray-500">Awaiting purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedLoyaltyProgram;