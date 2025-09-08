import React, { useState, useEffect, useRef } from 'react';
import { 
  Gavel, 
  Timer, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  ShoppingCart,
  Heart,
  Share2,
  History,
  Star
} from 'lucide-react';

// Auction Product Component with eBay-style features
export const AuctionProduct = ({ 
  product, 
  onBid, 
  onBuyNow, 
  onWatchlist, 
  currentUser 
}) => {
  const [currentBid, setCurrentBid] = useState(product.currentBid || product.startingBid);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [bidHistory, setBidHistory] = useState(product.bidHistory || []);
  const [showBidHistory, setShowBidHistory] = useState(false);
  const [isWatching, setIsWatching] = useState(product.isWatched || false);
  
  const timerRef = useRef(null);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTime = new Date(product.auctionEndTime).getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(`${minutes}m ${seconds}s`);
        }
      } else {
        setTimeLeft('Auction Ended');
      }
    };

    calculateTimeLeft();
    timerRef.current = setInterval(calculateTimeLeft, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [product.auctionEndTime]);

  const isAuctionActive = timeLeft !== 'Auction Ended';
  const hasReserve = product.reservePrice && currentBid < product.reservePrice;
  const meetsReserve = !hasReserve;

  // Handle bid submission
  const handleBid = () => {
    const bid = parseFloat(bidAmount);
    if (bid > currentBid) {
      const newBidHistory = [{
        bidder: currentUser?.name || 'Anonymous',
        amount: bid,
        timestamp: new Date().toISOString(),
        isUser: true
      }, ...bidHistory];
      
      setCurrentBid(bid);
      setBidHistory(newBidHistory);
      setBidAmount('');
      onBid?.(product.id, bid);
    }
  };

  // Calculate minimum bid increment
  const getMinBidIncrement = (currentBid) => {
    if (currentBid < 100) return 1;
    if (currentBid < 500) return 5;
    if (currentBid < 1000) return 10;
    return 25;
  };

  const minBid = currentBid + getMinBidIncrement(currentBid);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.imageUrl || 'https://placehold.co/400x300/e2e8f0/64748b?text=Auction+Item'}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        
        {/* Auction Badge */}
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <Gavel className="w-4 h-4 mr-1" />
          AUCTION
        </div>

        {/* Watch/Share Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => {
              setIsWatching(!isWatching);
              onWatchlist?.(product.id, !isWatching);
            }}
            className={`p-2 rounded-full transition-colors ${
              isWatching 
                ? 'bg-red-100 text-red-600' 
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isWatching ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Time Left Overlay */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <Timer className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isAuctionActive ? timeLeft : 'Ended'}
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-white">{product.seller?.name}</div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              {product.seller?.rating} ({product.seller?.feedbackCount} feedback)
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Located in</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{product.seller?.location}</div>
          </div>
        </div>

        {/* Current Bid Info */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Current bid:</span>
            <span className="text-2xl font-bold text-green-600">${currentBid.toFixed(2)}</span>
          </div>
          
          {hasReserve && (
            <div className="flex items-center text-orange-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              Reserve not yet met
            </div>
          )}

          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Bids: {bidHistory.length}</span>
            <span>Watchers: {product.watcherCount || 0}</span>
          </div>

          {product.shippingCost && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              + ${product.shippingCost} shipping
            </div>
          )}
        </div>

        {/* Bidding Section */}
        {isAuctionActive ? (
          <div className="space-y-4">
            {/* Bid Input */}
            <div className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="number"
                  step="0.01"
                  min={minBid}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={`Enter $${minBid.toFixed(2)} or more`}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Minimum bid: ${minBid.toFixed(2)}
                </div>
              </div>
              <button
                onClick={handleBid}
                disabled={!bidAmount || parseFloat(bidAmount) < minBid}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                Place Bid
              </button>
            </div>

            {/* Quick Bid Buttons */}
            <div className="flex space-x-2">
              {[minBid, minBid + 5, minBid + 10].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setBidAmount(amount.toString())}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  ${amount.toFixed(2)}
                </button>
              ))}
            </div>

            {/* Buy It Now (if available) */}
            {product.buyItNowPrice && (
              <button
                onClick={() => onBuyNow?.(product.id)}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy It Now - ${product.buyItNowPrice.toFixed(2)}
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
              Auction Ended
            </div>
            {bidHistory.length > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Winning bid: ${currentBid.toFixed(2)}
              </div>
            )}
          </div>
        )}

        {/* Bid History Toggle */}
        {bidHistory.length > 0 && (
          <button
            onClick={() => setShowBidHistory(!showBidHistory)}
            className="w-full mt-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <History className="w-4 h-4 mr-2" />
            {showBidHistory ? 'Hide' : 'Show'} Bid History ({bidHistory.length})
          </button>
        )}

        {/* Bid History */}
        {showBidHistory && (
          <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Bid History</h4>
            <div className="space-y-2">
              {bidHistory.map((bid, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className={`${bid.isUser ? 'font-medium text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}>
                    {bid.bidder}
                  </span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-white">
                      ${bid.amount.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(bid.timestamp).toLocaleTimeString()}
                    </div>
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

// Auction Listings Grid Component
export const AuctionGrid = ({ auctions, onBid, onBuyNow, onWatchlist, currentUser }) => {
  const [sortBy, setSortBy] = useState('ending-soon');
  const [filterBy, setFilterBy] = useState('all');

  // Sort auctions
  const sortedAuctions = [...auctions].sort((a, b) => {
    switch (sortBy) {
      case 'ending-soon':
        return new Date(a.auctionEndTime) - new Date(b.auctionEndTime);
      case 'price-low':
        return (a.currentBid || a.startingBid) - (b.currentBid || b.startingBid);
      case 'price-high':
        return (b.currentBid || b.startingBid) - (a.currentBid || a.startingBid);
      case 'most-bids':
        return (b.bidHistory?.length || 0) - (a.bidHistory?.length || 0);
      default:
        return 0;
    }
  });

  // Filter auctions
  const filteredAuctions = sortedAuctions.filter(auction => {
    if (filterBy === 'all') return true;
    if (filterBy === 'ending-soon') {
      const hoursLeft = (new Date(auction.auctionEndTime) - new Date()) / (1000 * 60 * 60);
      return hoursLeft <= 24;
    }
    if (filterBy === 'buy-it-now') return auction.buyItNowPrice;
    if (filterBy === 'no-reserve') return !auction.reservePrice;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="ending-soon">Ending Soon</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="most-bids">Most Bids</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter:
            </label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Auctions</option>
              <option value="ending-soon">Ending in 24h</option>
              <option value="buy-it-now">Buy It Now Available</option>
              <option value="no-reserve">No Reserve</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredAuctions.length} auctions found
        </div>
      </div>

      {/* Auction Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuctions.map((auction) => (
          <AuctionProduct
            key={auction.id}
            product={auction}
            onBid={onBid}
            onBuyNow={onBuyNow}
            onWatchlist={onWatchlist}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export { AuctionProduct as default };