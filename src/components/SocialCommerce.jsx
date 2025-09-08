import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Camera, 
  Play,
  Instagram,
  Facebook,
  Twitter,
  Users,
  Award,
  Verified,
  TrendingUp,
  Eye
} from 'lucide-react';

// Social Commerce Component
export const SocialCommerce = ({ 
  productId, 
  currentUser, 
  onLike, 
  onShare, 
  onFollowInfluencer 
}) => {
  const [reviews, setReviews] = useState([]);
  const [socialPosts, setSocialPosts] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [userGeneratedContent, setUserGeneratedContent] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, title: '', content: '', images: [] });

  // Initialize social data
  useEffect(() => {
    // Mock reviews data
    setReviews([
      {
        id: 'rev1',
        userId: 'user1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://placehold.co/50x50/3b82f6/ffffff?text=SJ',
        rating: 5,
        title: 'Absolutely love this product!',
        content: 'This laptop has exceeded all my expectations. The performance is incredible and the design is sleek. Perfect for my work as a graphic designer.',
        images: [
          'https://placehold.co/300x200/1e40af/ffffff?text=Review+Photo+1',
          'https://placehold.co/300x200/dc2626/ffffff?text=Review+Photo+2'
        ],
        createdAt: '2024-01-20T10:30:00Z',
        likes: 23,
        helpful: 18,
        verified: true,
        tags: ['performance', 'design', 'professional']
      },
      {
        id: 'rev2',
        userId: 'user2',
        userName: 'Mike Chen',
        userAvatar: 'https://placehold.co/50x50/10b981/ffffff?text=MC',
        rating: 4,
        title: 'Great value for money',
        content: 'Solid laptop for the price. Battery life could be better but overall very satisfied with the purchase.',
        images: [],
        createdAt: '2024-01-18T15:45:00Z',
        likes: 12,
        helpful: 8,
        verified: true,
        tags: ['value', 'battery']
      },
      {
        id: 'rev3',
        userId: 'user3',
        userName: 'Emily Rodriguez',
        userAvatar: 'https://placehold.co/50x50/f59e0b/ffffff?text=ER',
        rating: 5,
        title: 'Perfect for students!',
        content: 'As a college student, this laptop is perfect for my needs. Lightweight, fast, and great for programming.',
        images: ['https://placehold.co/300x200/059669/ffffff?text=Student+Setup'],
        createdAt: '2024-01-15T09:20:00Z',
        likes: 31,
        helpful: 25,
        verified: false,
        tags: ['student', 'programming', 'lightweight']
      }
    ]);

    // Mock social posts
    setSocialPosts([
      {
        id: 'post1',
        platform: 'instagram',
        author: 'TechReviewer_Pro',
        authorAvatar: 'https://placehold.co/50x50/8b5cf6/ffffff?text=TR',
        followers: 245000,
        content: 'Just unboxed this amazing laptop! The build quality is incredible 🔥 #TechReview #Laptop',
        image: 'https://placehold.co/400x400/6366f1/ffffff?text=Unboxing+Video',
        video: true,
        likes: 2341,
        comments: 89,
        shares: 156,
        engagement: 4.2
      },
      {
        id: 'post2',
        platform: 'twitter',
        author: 'DigitalNomadLife',
        authorAvatar: 'https://placehold.co/50x50/ef4444/ffffff?text=DN',
        followers: 89000,
        content: 'Working from a coffee shop in Bali with my new laptop. Perfect for remote work! ☕️🌴',
        image: 'https://placehold.co/400x300/06b6d4/ffffff?text=Coffee+Shop+Setup',
        video: false,
        likes: 567,
        comments: 34,
        shares: 78,
        engagement: 3.8
      }
    ]);

    // Mock influencers
    setInfluencers([
      {
        id: 'inf1',
        name: 'Tech Guru Sarah',
        handle: '@techgurusarah',
        avatar: 'https://placehold.co/80x80/3b82f6/ffffff?text=TGS',
        followers: 1250000,
        category: 'Technology',
        verified: true,
        engagement: 5.2,
        recentPost: 'Just reviewed 5 laptops under $1000. This one is definitely in my top 3!',
        partnership: true
      },
      {
        id: 'inf2',
        name: 'Digital Lifestyle Mike',
        handle: '@digitallifestylemike',
        avatar: 'https://placehold.co/80x80/10b981/ffffff?text=DLM',
        followers: 890000,
        category: 'Lifestyle',
        verified: true,
        engagement: 4.8,
        recentPost: 'Productivity setup tour featuring my favorite tech gear',
        partnership: false
      }
    ]);

    // Mock user-generated content
    setUserGeneratedContent([
      {
        id: 'ugc1',
        userId: 'user5',
        userName: 'CreativeStudio_NYC',
        userAvatar: 'https://placehold.co/50x50/ec4899/ffffff?text=CS',
        type: 'image',
        content: 'https://placehold.co/300x300/f97316/ffffff?text=Creative+Setup',
        caption: 'Our new editing setup with this powerful laptop! 🎨',
        likes: 445,
        featured: true,
        tags: ['creative', 'setup', 'professional']
      },
      {
        id: 'ugc2',
        userId: 'user6',
        userName: 'StudentTechLife',
        userAvatar: 'https://placehold.co/50x50/84cc16/ffffff?text=ST',
        type: 'video',
        content: 'https://placehold.co/300x300/0ea5e9/ffffff?text=Study+Setup',
        caption: 'Dorm room setup for finals week! This laptop is a game-changer 📚',
        likes: 234,
        featured: false,
        tags: ['student', 'dorm', 'study']
      }
    ]);
  }, [productId]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'facebook': return Facebook;
      case 'twitter': return Twitter;
      default: return Share2;
    }
  };

  return (
    <div className="space-y-8">
      {/* Social Proof Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Social Commerce Hub
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{reviews.length * 47}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Social Mentions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">{userGeneratedContent.length * 123}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">User Posts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{influencers.length * 234}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Influencer Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">4.6★</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Social Rating</div>
          </div>
        </div>
      </div>

      {/* Customer Reviews with Q&A */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Customer Reviews & Q&A
          </h3>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Write Review
          </button>
        </div>

        {/* Review Summary */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">4.6</div>
            <div>
              <div className="flex items-center mb-1">
                {renderStars(5)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Based on {reviews.length} reviews
              </div>
            </div>
          </div>
          
          {/* Rating Distribution */}
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter(r => r.rating === rating).length;
            const percentage = (count / reviews.length) * 100;
            
            return (
              <div key={rating} className="flex items-center space-x-3 mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {rating}★
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      {/* Influencer Partnerships */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Influencer Reviews
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {influencers.map((influencer) => (
            <InfluencerCard
              key={influencer.id}
              influencer={influencer}
              onFollow={onFollowInfluencer}
            />
          ))}
        </div>
      </div>

      {/* Social Media Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Social Media Buzz
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialPosts.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* User-Generated Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Customer Photos & Videos
          </h3>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Share Your Photo
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userGeneratedContent.map((content) => (
            <UserContentCard key={content.id} content={content} />
          ))}
        </div>
      </div>

      {/* Social Sharing Tools */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Share & Earn Rewards
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <Share2 className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Share Product</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Share on social media and earn points
            </p>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Share Now
            </button>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Upload Photo</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Share your photo for a chance to be featured
            </p>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              Upload Photo
            </button>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Write Review</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Share your experience and help others
            </p>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              Write Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="w-12 h-12 rounded-full"
        />
        
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {review.userName}
            </h4>
            {review.verified && (
              <div className="flex items-center space-x-1 text-green-600 text-sm">
                <Verified className="w-4 h-4" />
                <span>Verified Purchase</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(review.createdAt)}
            </span>
          </div>
          
          <h5 className="font-medium text-gray-900 dark:text-white mb-2">
            {review.title}
          </h5>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {review.content}
          </p>
          
          {/* Review Images */}
          {review.images.length > 0 && (
            <div className="flex space-x-2 mb-4">
              {review.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                />
              ))}
            </div>
          )}
          
          {/* Tags */}
          {review.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {review.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Review Actions */}
          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful})</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
              <ThumbsDown className="w-4 h-4" />
              <span>Not Helpful</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-purple-600 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Influencer Card Component
const InfluencerCard = ({ influencer, onFollow }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={influencer.avatar}
            alt={influencer.name}
            className="w-16 h-16 rounded-full"
          />
          {influencer.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <Verified className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {influencer.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {influencer.handle}
              </p>
            </div>
            <button
              onClick={() => onFollow(influencer.id)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
            >
              Follow
            </button>
          </div>
          
          <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{(influencer.followers / 1000000).toFixed(1)}M followers</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>{influencer.engagement}% engagement</span>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            {influencer.recentPost}
          </p>
          
          {influencer.partnership && (
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded-full text-xs">
              <Award className="w-3 h-3" />
              <span>Brand Partner</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Social Post Card Component
const SocialPostCard = ({ post }) => {
  const PlatformIcon = getPlatformIcon(post.platform);
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={post.authorAvatar}
          alt={post.author}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              @{post.author}
            </h4>
            <PlatformIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {(post.followers / 1000).toFixed(0)}K followers
          </p>
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {post.content}
      </p>
      
      <div className="relative mb-4">
        <img
          src={post.image}
          alt="Social post"
          className="w-full h-48 object-cover rounded-lg"
        />
        {post.video && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Heart className="w-4 h-4" />
          <span>{post.likes.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-4 h-4" />
          <span>{post.comments}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Share2 className="w-4 h-4" />
          <span>{post.shares}</span>
        </div>
      </div>
    </div>
  );
};

// User Content Card Component
const UserContentCard = ({ content }) => {
  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={content.content}
          alt="User content"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
        />
        
        {content.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-white ml-0.5" />
            </div>
          </div>
        )}
        
        {content.featured && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-600 text-white rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
            <div className="flex items-center space-x-2 mb-2">
              <img
                src={content.userAvatar}
                alt={content.userName}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium">@{content.userName}</span>
            </div>
            <p className="text-sm">{content.caption}</p>
            <div className="flex items-center space-x-3 mt-2 text-sm">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{content.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>View</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getPlatformIcon(platform) {
  switch (platform) {
    case 'instagram': return Instagram;
    case 'facebook': return Facebook;
    case 'twitter': return Twitter;
    default: return Share2;
  }
}

export default SocialCommerce;