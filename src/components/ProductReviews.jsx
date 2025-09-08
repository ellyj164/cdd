import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, Flag, Edit, Trash, ChevronDown, ChevronUp } from 'lucide-react';
import { useReviewStore, validateReview, REVIEW_SORT_OPTIONS, sortReviews } from '../stores/useReviewStore';
import { useAuth } from '../contexts/AuthContext';

const RatingStars = ({ rating, size = 'w-4 h-4', interactive = false, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleStarClick = (starRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating) => {
    if (interactive) {
      setHoverRating(starRating);
    }
  };

  const handleStarLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = interactive 
          ? star <= (hoverRating || rating)
          : star <= rating;
        
        return (
          <Star
            key={star}
            className={`${size} cursor-${interactive ? 'pointer' : 'default'} transition-colors ${
              isFilled 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 hover:text-yellow-400'
            }`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}
          />
        );
      })}
    </div>
  );
};

const RatingDistribution = ({ productId }) => {
  const { getProductRatingStats } = useReviewStore();
  const stats = getProductRatingStats(productId);

  if (stats.totalReviews === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 dark:text-white">
          {stats.averageRating.toFixed(1)}
        </div>
        <RatingStars rating={Math.round(stats.averageRating)} size="w-6 h-6" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Based on {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map(rating => {
          const count = stats.ratingDistribution[rating] || 0;
          const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
          
          return (
            <div key={rating} className="flex items-center space-x-2 text-sm">
              <span className="w-8 text-gray-600 dark:text-gray-400">{rating}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-gray-600 dark:text-gray-400 text-right">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReviewForm = ({ productId, onSubmit, onCancel, editReview = null }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    rating: editReview?.rating || 5,
    title: editReview?.title || '',
    comment: editReview?.comment || ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateReview(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const reviewData = {
        ...formData,
        userId: user.id,
        userName: user.name,
        verified: true // In real app, this would be based on purchase history
      };

      await onSubmit(reviewData);
      
      if (!editReview) {
        setFormData({ rating: 5, title: '', comment: '' });
      }
      setErrors({});
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg space-y-4">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
        {editReview ? 'Edit Your Review' : 'Write a Review'}
      </h4>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating *
        </label>
        <RatingStars 
          rating={formData.rating}
          size="w-8 h-8"
          interactive
          onRatingChange={(rating) => handleChange('rating', rating)}
        />
        {errors.rating && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.rating}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Review Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white ${
            errors.title 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:border-primary-500'
          }`}
          placeholder="Sum up your review in a few words"
          maxLength={100}
        />
        {errors.title && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.title}</p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {formData.title.length}/100 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Your Review *
        </label>
        <textarea
          value={formData.comment}
          onChange={(e) => handleChange('comment', e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white ${
            errors.comment 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:border-primary-500'
          }`}
          placeholder="Share your thoughts about this product..."
          maxLength={1000}
        />
        {errors.comment && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.comment}</p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {formData.comment.length}/1000 characters
        </p>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : editReview ? 'Update Review' : 'Submit Review'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const ReviewItem = ({ review, currentUserId, onHelpful, onEdit, onDelete, onReport }) => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleReport = () => {
    if (reportReason.trim()) {
      onReport(review.id, reportReason);
      setShowReportForm(false);
      setReportReason('');
    }
  };

  const isOwnReview = currentUserId === review.userId;
  const hasVotedHelpful = review.helpfulVotes?.includes(currentUserId);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-primary-600 dark:text-primary-400 font-medium">
                {review.userName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 dark:text-white">
                {review.userName}
              </span>
              {review.verified && (
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded text-xs font-medium">
                  Verified Purchase
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <RatingStars rating={review.rating} />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(review.date)}
              </span>
            </div>
          </div>
        </div>

        {isOwnReview && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(review)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(review.id)}
              className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {review.title && (
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
          {review.title}
        </h5>
      )}

      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
        {review.comment}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onHelpful(review.id)}
            disabled={isOwnReview}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              hasVotedHelpful
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            } ${isOwnReview ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Helpful ({review.helpful || 0})</span>
          </button>

          {!isOwnReview && (
            <button
              onClick={() => setShowReportForm(!showReportForm)}
              className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <Flag className="w-4 h-4" />
              <span>Report</span>
            </button>
          )}
        </div>
      </div>

      {showReportForm && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
          <h6 className="font-medium text-gray-900 dark:text-white mb-2">
            Report this review
          </h6>
          <textarea
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            placeholder="Please explain why you're reporting this review..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            rows={3}
          />
          <div className="flex space-x-2 mt-3">
            <button
              onClick={handleReport}
              disabled={!reportReason.trim()}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm font-medium disabled:opacity-50"
            >
              Submit Report
            </button>
            <button
              onClick={() => setShowReportForm(false)}
              className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductReviews = ({ productId }) => {
  const { user } = useAuth();
  const { 
    getProductReviews, 
    addReview, 
    updateReview, 
    deleteReview, 
    markHelpful, 
    reportReview,
    canUserReview 
  } = useReviewStore();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const allReviews = getProductReviews(productId);
  const sortedReviews = sortReviews([...allReviews], sortBy);
  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 5);
  const canWriteReview = user && canUserReview(productId, user.id);

  const handleSubmitReview = async (reviewData) => {
    if (editingReview) {
      updateReview(editingReview.id, reviewData);
      setEditingReview(null);
    } else {
      addReview(productId, reviewData);
    }
    setShowReviewForm(false);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(reviewId, user.id);
    }
  };

  const handleCancelForm = () => {
    setShowReviewForm(false);
    setEditingReview(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rating Distribution */}
        <div className="md:col-span-1">
          <RatingDistribution productId={productId} />
        </div>

        {/* Reviews Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Customer Reviews ({allReviews.length})
            </h3>
            
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(REVIEW_SORT_OPTIONS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>

              {/* Write Review Button */}
              {canWriteReview && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 text-sm font-medium"
                >
                  Write Review
                </button>
              )}
            </div>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <ReviewForm
              productId={productId}
              onSubmit={handleSubmitReview}
              onCancel={handleCancelForm}
              editReview={editingReview}
            />
          )}

          {/* Reviews List */}
          {allReviews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No reviews yet. Be the first to share your experience!
              </p>
              {canWriteReview && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 font-medium"
                >
                  Write the First Review
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {displayedReviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  review={review}
                  currentUserId={user?.id}
                  onHelpful={markHelpful}
                  onEdit={handleEditReview}
                  onDelete={handleDeleteReview}
                  onReport={reportReview}
                />
              ))}

              {/* Show More/Less Button */}
              {allReviews.length > 5 && (
                <div className="text-center">
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="flex items-center space-x-2 mx-auto text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                  >
                    <span>
                      {showAllReviews 
                        ? 'Show Less' 
                        : `Show All ${allReviews.length} Reviews`
                      }
                    </span>
                    {showAllReviews ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
export { RatingStars, RatingDistribution };