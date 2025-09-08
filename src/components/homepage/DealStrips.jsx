import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Zap, Tag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * DealStrips Component
 * Amazon-style deal strips with countdown timers and special offers
 */
const DealStrips = ({ section, loading }) => {
  const [timeLeft, setTimeLeft] = useState({});

  // Default deal strips
  const defaultDeals = [
    {
      id: 'lightning-deals',
      type: 'lightning',
      title: 'Lightning Deals',
      subtitle: 'Limited time offers',
      bgColor: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      textColor: 'text-white',
      icon: Zap,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      deals: [
        {
          id: 'deal-1',
          name: 'Wireless Earbuds',
          originalPrice: 99.99,
          salePrice: 49.99,
          image: 'https://placehold.co/200x200/6366f1/ffffff?text=Earbuds',
          discount: 50,
          rating: 4.5,
          reviewCount: 1234,
          claimed: 65 // percentage claimed
        },
        {
          id: 'deal-2',
          name: 'Smart Watch',
          originalPrice: 299.99,
          salePrice: 199.99,
          image: 'https://placehold.co/200x200/059669/ffffff?text=Watch',
          discount: 33,
          rating: 4.7,
          reviewCount: 892,
          claimed: 45
        },
        {
          id: 'deal-3',
          name: 'Bluetooth Speaker',
          originalPrice: 79.99,
          salePrice: 39.99,
          image: 'https://placehold.co/200x200/dc2626/ffffff?text=Speaker',
          discount: 50,
          rating: 4.3,
          reviewCount: 567,
          claimed: 80
        }
      ]
    },
    {
      id: 'daily-deals',
      type: 'daily',
      title: 'Deal of the Day',
      subtitle: 'Today only - Save up to 70%',
      bgColor: 'bg-gradient-to-r from-red-500 to-pink-500',
      textColor: 'text-white',
      icon: Tag,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      deals: [
        {
          id: 'daily-1',
          name: '4K Smart TV 55"',
          originalPrice: 799.99,
          salePrice: 399.99,
          image: 'https://placehold.co/200x200/7c3aed/ffffff?text=TV',
          discount: 50,
          rating: 4.6,
          reviewCount: 2156,
          claimed: 25
        }
      ]
    },
    {
      id: 'flash-sale',
      type: 'flash',
      title: 'Flash Sale',
      subtitle: 'Ends in 30 minutes',
      bgColor: 'bg-gradient-to-r from-purple-600 to-blue-600',
      textColor: 'text-white',
      icon: Clock,
      endTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
      deals: [
        {
          id: 'flash-1',
          name: 'Gaming Headset',
          originalPrice: 149.99,
          salePrice: 79.99,
          image: 'https://placehold.co/200x200/ec4899/ffffff?text=Headset',
          discount: 47,
          rating: 4.4,
          reviewCount: 789,
          claimed: 90
        },
        {
          id: 'flash-2',
          name: 'Mechanical Keyboard',
          originalPrice: 189.99,
          salePrice: 119.99,
          image: 'https://placehold.co/200x200/f59e0b/ffffff?text=Keyboard',
          discount: 37,
          rating: 4.8,
          reviewCount: 456,
          claimed: 70
        }
      ]
    }
  ];

  const deals = section?.deals || defaultDeals;

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      deals.forEach(deal => {
        if (deal.endTime) {
          const difference = deal.endTime - new Date();
          if (difference > 0) {
            newTimeLeft[deal.id] = {
              hours: Math.floor(difference / (1000 * 60 * 60)),
              minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
              seconds: Math.floor((difference % (1000 * 60)) / 1000)
            };
          } else {
            newTimeLeft[deal.id] = { hours: 0, minutes: 0, seconds: 0 };
          }
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [deals]);

  if (loading) {
    return (
      <div className="py-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="mb-6">
            <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  const formatTime = (time) => {
    if (!time) return '00:00:00';
    return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
  };

  return (
    <div className="py-8 space-y-6">
      {deals.map((dealStrip, stripIndex) => (
        <motion.div
          key={dealStrip.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: stripIndex * 0.1 }}
          className={`${dealStrip.bgColor} ${dealStrip.textColor} rounded-lg overflow-hidden shadow-lg`}
        >
          <div className="container mx-auto px-4 py-6">
            {/* Strip Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <dealStrip.icon className="h-6 w-6" />
                <div>
                  <h3 className="text-xl font-bold">{dealStrip.title}</h3>
                  <p className="text-sm opacity-90">{dealStrip.subtitle}</p>
                </div>
              </div>
              
              {/* Countdown Timer */}
              {timeLeft[dealStrip.id] && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <div className="font-mono text-lg font-bold">
                    {formatTime(timeLeft[dealStrip.id])}
                  </div>
                </div>
              )}
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {dealStrip.deals.map((deal, dealIndex) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: dealIndex * 0.1 }}
                  className="group"
                >
                  <Link to={`/product/${deal.id}`} className="block">
                    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-100 transition-all duration-300 group-hover:shadow-xl">
                      {/* Deal Image */}
                      <div className="relative mb-3">
                        <img
                          src={deal.image}
                          alt={deal.name}
                          className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{deal.discount}%
                        </div>
                        {deal.claimed > 75 && (
                          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Almost Gone!
                          </div>
                        )}
                      </div>

                      {/* Deal Info */}
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {deal.name}
                      </h4>

                      {/* Rating */}
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(deal.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">
                          ({deal.reviewCount})
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-lg font-bold text-red-600">
                          ${deal.salePrice}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${deal.originalPrice}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>{deal.claimed}% claimed</span>
                          <span>{100 - deal.claimed}% remaining</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${deal.claimed}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 group-hover:shadow-lg">
                        <span>Add to Cart</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All Link */}
            <div className="mt-6 text-center">
              <Link
                to={`/deals/${dealStrip.type}`}
                className="inline-flex items-center space-x-2 text-white hover:text-yellow-200 transition-colors duration-200 font-medium"
              >
                <span>View all {dealStrip.title.toLowerCase()}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DealStrips;