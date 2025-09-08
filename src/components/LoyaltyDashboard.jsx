import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Award, Gift, TrendingUp, Calendar, Clock, Coins, Crown } from 'lucide-react';
import { useLoyaltyStore } from '../stores/useLoyaltyStore';

const LoyaltyDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  
  const {
    points,
    tier,
    totalEarned,
    totalSpent,
    pointsHistory,
    getNextTierInfo,
    getPointValue,
    getAvailableRewards,
    redeemPoints,
    addBonusPoints
  } = useLoyaltyStore();

  const nextTierInfo = getNextTierInfo();
  const availableRewards = getAvailableRewards();

  const getTierIcon = (tierName) => {
    switch (tierName) {
      case 'Bronze': return <Award className="h-5 w-5 text-amber-600" />;
      case 'Silver': return <Award className="h-5 w-5 text-gray-400" />;
      case 'Gold': return <Crown className="h-5 w-5 text-yellow-500" />;
      case 'Platinum': return <Crown className="h-5 w-5 text-purple-500" />;
      default: return <Award className="h-5 w-5" />;
    }
  };

  const getTierColor = (tierName) => {
    switch (tierName) {
      case 'Bronze': return 'from-amber-500 to-amber-600';
      case 'Silver': return 'from-gray-400 to-gray-500';
      case 'Gold': return 'from-yellow-400 to-yellow-500';
      case 'Platinum': return 'from-purple-400 to-purple-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const handleRedeemReward = (reward) => {
    try {
      redeemPoints(reward.points, `Redeemed: ${reward.name}`, reward.value);
      // In a real app, you would apply the reward to the user's account
      alert(`Successfully redeemed ${reward.name}!`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClaimBonus = () => {
    addBonusPoints(100, 'Daily Check-in Bonus');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Loyalty Rewards
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Earn points, unlock rewards, and enjoy exclusive benefits
          </p>
        </div>

        {/* Loyalty Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Points Balance */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Coins className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Points Balance
                  </h3>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {points.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Worth ${getPointValue(points).toFixed(2)} in rewards
            </p>
          </div>

          {/* Current Tier */}
          <div className={`bg-gradient-to-r ${getTierColor(tier)} rounded-lg shadow-md p-6 text-white`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {getTierIcon(tier)}
                <div className="ml-3">
                  <h3 className="font-semibold">{tier} Member</h3>
                  <p className="text-sm opacity-90">
                    ${totalSpent.toLocaleString()} total spent
                  </p>
                </div>
              </div>
            </div>
            {nextTierInfo && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress to {nextTierInfo.nextTier}</span>
                  <span>{Math.round(nextTierInfo.progress)}%</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full"
                    style={{ width: `${Math.min(nextTierInfo.progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1 opacity-90">
                  Spend ${nextTierInfo.remainingToSpend} more to unlock {nextTierInfo.nextTier}
                </p>
              </div>
            )}
          </div>

          {/* Total Earned */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Total Earned
                  </h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {totalEarned.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Points earned all time
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'rewards', label: 'Available Rewards', icon: Gift },
                { id: 'history', label: 'Points History', icon: Clock }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Ways to Earn Points
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Make a purchase</span>
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {tier === 'Bronze' ? '1' : tier === 'Silver' ? '1.5' : tier === 'Gold' ? '2' : '3'} point per $1
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Write a review</span>
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">50 points</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Refer a friend</span>
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">500 points</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Daily check-in</span>
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">10-100 points</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Daily Bonus
                    </h4>
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                      <div className="flex items-center mb-3">
                        <Calendar className="h-6 w-6 mr-2" />
                        <span className="font-medium">Check-in Bonus Available!</span>
                      </div>
                      <p className="text-sm mb-4 opacity-90">
                        Claim your daily bonus and earn up to 100 points
                      </p>
                      <button
                        onClick={handleClaimBonus}
                        className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                      >
                        Claim 100 Points
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rewards Tab */}
            {activeTab === 'rewards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`p-6 rounded-lg border-2 ${
                      reward.canAfford 
                        ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20' 
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Gift className={`h-8 w-8 ${
                        reward.canAfford ? 'text-green-500' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                        reward.canAfford 
                          ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {reward.points} points
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {reward.name}
                    </h4>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Save ${reward.savings} on your next order
                    </p>
                    
                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={!reward.canAfford}
                      className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                        reward.canAfford
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {reward.canAfford ? 'Redeem' : 'Insufficient Points'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Points Activity
                </h4>
                {pointsHistory.length > 0 ? (
                  <div className="space-y-3">
                    {pointsHistory.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            transaction.type === 'earned' ? 'bg-green-500' :
                            transaction.type === 'redeemed' ? 'bg-red-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {transaction.reason}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className={`font-bold ${
                          transaction.points > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.points > 0 ? '+' : ''}{transaction.points}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No points activity yet. Start shopping to earn points!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyDashboard;