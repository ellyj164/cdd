import React, { useState, useEffect } from 'react';
import { X, Truck, Phone, Mail, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  const announcements = [
    {
      id: 1,
      text: "🎉 Winter Sale: Up to 70% off on selected items - Limited time offer!",
      link: "/deals",
      icon: <Truck className="h-4 w-4" />,
      type: "sale"
    },
    {
      id: 2,
      text: "🚚 Free worldwide shipping on orders over $50",
      link: "/shipping",
      icon: <Truck className="h-4 w-4" />,
      type: "shipping"
    },
    {
      id: 3,
      text: "📞 24/7 Customer Support: +1 (555) 123-4567",
      link: "/contact",
      icon: <Phone className="h-4 w-4" />,
      type: "support"
    },
    {
      id: 4,
      text: "🌍 Now serving 50+ countries worldwide",
      link: "/international",
      icon: <Globe className="h-4 w-4" />,
      type: "global"
    }
  ];

  // Auto-rotate announcements
  useEffect(() => {
    if (announcements.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  // Check if user has dismissed the bar in this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('announcementBarDismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('announcementBarDismissed', 'true');
  };

  if (!isVisible) return null;

  const current = announcements[currentAnnouncement];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium overflow-hidden z-50"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
        </div>

        <div className="relative flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Left Spacer for Mobile */}
          <div className="w-6 md:w-0" />

          {/* Announcement Content */}
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-2"
              >
                {current.icon}
                <a
                  href={current.link}
                  className="hover:underline transition-all duration-200 hover:text-yellow-200"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle navigation based on link
                    if (current.link.startsWith('http')) {
                      window.open(current.link, '_blank');
                    } else {
                      window.location.href = current.link;
                    }
                  }}
                >
                  {current.text}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators and Close Button */}
          <div className="flex items-center space-x-3">
            {/* Dots Indicator */}
            {announcements.length > 1 && (
              <div className="hidden md:flex items-center space-x-1">
                {announcements.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAnnouncement(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentAnnouncement
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to announcement ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200 group"
              aria-label="Close announcement"
            >
              <X className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {announcements.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
              key={currentAnnouncement}
            />
          </div>
        )}

        {/* Mobile-specific enhancements */}
        <style jsx>{`
          @media (max-width: 640px) {
            .announcement-text {
              font-size: 0.875rem;
              text-align: center;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBar;