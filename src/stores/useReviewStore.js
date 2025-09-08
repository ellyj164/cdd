import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useReviewStore = create(
  persist(
    (set, get) => ({
      reviews: [],
      
      addReview: (productId, reviewData) => {
        const review = {
          id: Date.now(),
          productId,
          userId: reviewData.userId,
          userName: reviewData.userName,
          rating: reviewData.rating,
          title: reviewData.title,
          comment: reviewData.comment,
          date: new Date().toISOString(),
          verified: reviewData.verified || false,
          helpful: 0,
          helpfulVotes: [],
          reported: false,
          images: reviewData.images || []
        };
        
        set((state) => ({
          reviews: [review, ...state.reviews]
        }));
        
        return review;
      },
      
      updateReview: (reviewId, updates) => {
        set((state) => ({
          reviews: state.reviews.map(review =>
            review.id === reviewId 
              ? { ...review, ...updates, updatedAt: new Date().toISOString() }
              : review
          )
        }));
      },
      
      deleteReview: (reviewId, userId) => {
        set((state) => ({
          reviews: state.reviews.filter(review => 
            !(review.id === reviewId && review.userId === userId)
          )
        }));
      },
      
      getProductReviews: (productId) => {
        const { reviews } = get();
        return reviews
          .filter(review => review.productId === productId && !review.reported)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      },
      
      getUserReviews: (userId) => {
        const { reviews } = get();
        return reviews
          .filter(review => review.userId === userId)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      },
      
      getProductRatingStats: (productId) => {
        const productReviews = get().getProductReviews(productId);
        
        if (productReviews.length === 0) {
          return {
            averageRating: 0,
            totalReviews: 0,
            ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
          };
        }
        
        const totalReviews = productReviews.length;
        const sumRatings = productReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = sumRatings / totalReviews;
        
        const ratingDistribution = productReviews.reduce((dist, review) => {
          dist[review.rating] = (dist[review.rating] || 0) + 1;
          return dist;
        }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
        
        return {
          averageRating,
          totalReviews,
          ratingDistribution
        };
      },
      
      markHelpful: (reviewId, userId) => {
        set((state) => ({
          reviews: state.reviews.map(review => {
            if (review.id === reviewId) {
              const hasVoted = review.helpfulVotes.includes(userId);
              if (hasVoted) {
                return {
                  ...review,
                  helpful: review.helpful - 1,
                  helpfulVotes: review.helpfulVotes.filter(id => id !== userId)
                };
              } else {
                return {
                  ...review,
                  helpful: review.helpful + 1,
                  helpfulVotes: [...review.helpfulVotes, userId]
                };
              }
            }
            return review;
          })
        }));
      },
      
      reportReview: (reviewId, reason, reporterId) => {
        set((state) => ({
          reviews: state.reviews.map(review =>
            review.id === reviewId
              ? {
                  ...review,
                  reported: true,
                  reportReason: reason,
                  reportedBy: reporterId,
                  reportedAt: new Date().toISOString()
                }
              : review
          )
        }));
      },
      
      getReviewStats: () => {
        const { reviews } = get();
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
          : 0;
        
        const ratingDistribution = reviews.reduce((dist, review) => {
          dist[review.rating] = (dist[review.rating] || 0) + 1;
          return dist;
        }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
        
        return {
          totalReviews,
          averageRating,
          ratingDistribution
        };
      },
      
      canUserReview: (productId, userId) => {
        const { reviews } = get();
        // Check if user has already reviewed this product
        return !reviews.some(review => 
          review.productId === productId && review.userId === userId
        );
      },
      
      clearReviews: () => set({ reviews: [] })
    }),
    {
      name: 'reviews-storage',
    }
  )
);

// Review validation helpers
export const validateReview = (reviewData) => {
  const errors = {};
  
  if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
    errors.rating = 'Rating must be between 1 and 5 stars';
  }
  
  if (!reviewData.title || reviewData.title.trim().length < 5) {
    errors.title = 'Review title must be at least 5 characters';
  }
  
  if (!reviewData.comment || reviewData.comment.trim().length < 10) {
    errors.comment = 'Review comment must be at least 10 characters';
  }
  
  if (reviewData.title && reviewData.title.length > 100) {
    errors.title = 'Review title must be less than 100 characters';
  }
  
  if (reviewData.comment && reviewData.comment.length > 1000) {
    errors.comment = 'Review comment must be less than 1000 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Review sorting options
export const REVIEW_SORT_OPTIONS = {
  newest: 'Newest First',
  oldest: 'Oldest First',
  highest: 'Highest Rating',
  lowest: 'Lowest Rating',
  helpful: 'Most Helpful'
};

export const sortReviews = (reviews, sortBy) => {
  switch (sortBy) {
    case 'oldest':
      return reviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    case 'highest':
      return reviews.sort((a, b) => b.rating - a.rating);
    case 'lowest':
      return reviews.sort((a, b) => a.rating - b.rating);
    case 'helpful':
      return reviews.sort((a, b) => b.helpful - a.helpful);
    case 'newest':
    default:
      return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};