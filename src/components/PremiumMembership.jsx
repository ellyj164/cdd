import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Truck, 
  Star, 
  Calendar, 
  Gift, 
  Play, 
  Shield, 
  Zap,
  Package,
  Clock,
  CheckCircle,
  ChevronRight,
  Users,
  Percent
} from 'lucide-react';

// Premium Membership Program Component (Amazon Prime-style)
export const PremiumMembership = ({ 
  currentUser, 
  onSubscribe, 
  onCancel, 
  onManage 
}) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [membershipBenefits, setMembershipBenefits] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [memberStats, setMemberStats] = useState({});

  // Membership plans
  const membershipPlans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 14.99,
      originalPrice: 19.99,
      period: 'per month',
      savings: 'Save $5/month',
      popular: false
    },
    {
      id: 'annual',
      name: 'Annual',
      price: 119,
      originalPrice: 179.88,
      period: 'per year',
      savings: 'Save $60.88/year',
      popular: true,
      monthlyEquivalent: 9.92
    },
    {
      id: 'student',
      name: 'Student',
      price: 7.49,
      originalPrice: 14.99,
      period: 'per month',
      savings: '50% off',
      verification: 'Student verification required'
    }
  ];

  // Membership benefits
  const benefits = [
    {
      id: 'free-shipping',
      icon: Truck,
      title: 'FREE Fast Shipping',
      description: 'Free 1-2 day shipping on millions of items',
      highlight: 'Unlimited',
      color: 'blue'
    },
    {
      id: 'same-day',
      icon: Zap,
      title: 'Same-Day Delivery',
      description: 'Get your orders the same day in select cities',
      highlight: 'Same Day',
      color: 'purple'
    },
    {
      id: 'exclusive-deals',
      icon: Star,
      title: 'Exclusive Deals',
      description: 'Member-only discounts and early access to sales',
      highlight: 'Up to 50% off',
      color: 'yellow'
    },
    {
      id: 'priority-support',
      icon: Shield,
      title: 'Priority Support',
      description: '24/7 premium customer support with priority queue',
      highlight: '24/7',
      color: 'green'
    },
    {
      id: 'streaming',
      icon: Play,
      title: 'Premium Video',
      description: 'Access to exclusive video content and movies',
      highlight: '10,000+ titles',
      color: 'red'
    },
    {
      id: 'music',
      icon: Star,
      title: 'Music Streaming',
      description: 'Ad-free music streaming with offline downloads',
      highlight: '100M+ songs',
      color: 'indigo'
    },
    {
      id: 'storage',
      icon: Package,
      title: 'Cloud Storage',
      description: 'Unlimited photo storage and 5GB for videos',
      highlight: 'Unlimited',
      color: 'cyan'
    },
    {
      id: 'returns',
      icon: Clock,
      title: 'Extended Returns',
      description: '90-day return window instead of standard 30 days',
      highlight: '90 days',
      color: 'orange'
    }
  ];

  // Member statistics
  useEffect(() => {
    if (currentUser?.isPremiumMember) {
      setMemberStats({
        totalSaved: 287.45,
        ordersThisYear: 42,
        freeShippingSaved: 156.30,
        exclusiveDealsUsed: 8,
        memberSince: '2023-03-15'
      });
    }
  }, [currentUser]);

  // Handle subscription
  const handleSubscribe = async (planId) => {
    setIsProcessing(true);
    try {
      // Simulate subscription process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSubscribe?.(planId);
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // If user is already a premium member
  if (currentUser?.isPremiumMember) {
    return <MemberDashboard memberStats={memberStats} benefits={benefits} onManage={onManage} onCancel={onCancel} />;
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Premium Membership
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Unlock exclusive benefits, lightning-fast shipping, and premium content. 
            Join millions of satisfied members worldwide.
          </p>
        </div>

        {/* Membership Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {membershipPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all cursor-pointer ${
                selectedPlan === plan.id
                  ? 'ring-4 ring-purple-500 scale-105'
                  : 'hover:shadow-xl hover:scale-102'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`p-6 ${plan.popular ? 'pt-12' : ''}`}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl font-bold text-purple-600">
                        ${plan.price}
                      </span>
                      <div className="text-left">
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ${plan.originalPrice}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {plan.period}
                        </div>
                      </div>
                    </div>
                    
                    {plan.monthlyEquivalent && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        (${plan.monthlyEquivalent}/month)
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-3 py-2 rounded-full text-sm font-medium mb-6">
                    {plan.savings}
                  </div>
                  
                  {plan.verification && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      {plan.verification}
                    </div>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe(plan.id);
                    }}
                    disabled={isProcessing}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      selectedPlan === plan.id
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : 'Start Free Trial'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Premium Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 bg-${benefit.color}-100 dark:bg-${benefit.color}-900/20 rounded-lg flex items-center justify-center mb-4`}>
                  <benefit.icon className={`w-6 h-6 text-${benefit.color}-600`} />
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {benefit.description}
                </p>
                
                <div className={`text-sm font-medium text-${benefit.color}-600 dark:text-${benefit.color}-400`}>
                  {benefit.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Join Over 200 Million Happy Members
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">200M+</div>
                <div className="text-gray-600 dark:text-gray-400">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
                <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">$2.1B</div>
                <div className="text-gray-600 dark:text-gray-400">Saved by Members</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4">
            {[
              {
                question: "What's included in the 30-day free trial?",
                answer: "Full access to all Premium benefits including free shipping, exclusive deals, and premium content. Cancel anytime during the trial."
              },
              {
                question: "Can I cancel my membership anytime?",
                answer: "Yes, you can cancel your membership at any time. You'll continue to enjoy benefits until the end of your current billing period."
              },
              {
                question: "Do you offer family plans?",
                answer: "Yes! Family plans allow up to 6 family members to share Premium benefits at a discounted rate."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Member Dashboard Component
const MemberDashboard = ({ memberStats, benefits, onManage, onCancel }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-white/20 rounded-full">
              <Crown className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome Back, Premium Member!</h1>
              <p className="text-purple-100">
                Member since {new Date(memberStats.memberSince).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">${memberStats.totalSaved}</div>
              <div className="text-purple-100">Total Saved</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{memberStats.ordersThisYear}</div>
              <div className="text-purple-100">Orders This Year</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">${memberStats.freeShippingSaved}</div>
              <div className="text-purple-100">Shipping Saved</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{memberStats.exclusiveDealsUsed}</div>
              <div className="text-purple-100">Exclusive Deals Used</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={onManage}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Manage Membership
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Update payment, billing, and preferences
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
          
          <button className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Exclusive Deals
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View member-only discounts
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
          
          <button className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Premium Content
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Access videos, music, and more
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>

        {/* Benefits Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Premium Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="flex items-start space-x-3">
                <div className={`p-2 bg-${benefit.color}-100 dark:bg-${benefit.color}-900/20 rounded-lg flex-shrink-0`}>
                  <benefit.icon className={`w-5 h-5 text-${benefit.color}-600`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {benefit.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumMembership;