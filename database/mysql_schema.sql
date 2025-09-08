-- =========================================================
-- COMPREHENSIVE MYSQL DATABASE SCHEMA FOR MARKETPLACE
-- Database: marked
-- User: duns1 / Password: Tumukunde
-- =========================================================

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `marked` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `marked`;

-- =========================================================
-- USERS TABLE
-- =========================================================
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `email` varchar(255) NULL UNIQUE,
  `phone` varchar(50) NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('customer','vendor','admin') NOT NULL DEFAULT 'customer',
  `accountType` enum('individual','business') NOT NULL DEFAULT 'individual',
  `emailVerified` tinyint(1) NOT NULL DEFAULT 0,
  `phoneVerified` tinyint(1) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `twoFactorEnabled` tinyint(1) NOT NULL DEFAULT 0,
  `twoFactorSecret` varchar(255) NULL,
  `socialProviders` json NULL,
  `profile` json NULL,
  `kyc` json NULL,
  `onboarding` json NULL,
  `lastLoginAt` datetime NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_phone` (`phone`),
  INDEX `idx_role` (`role`),
  INDEX `idx_isActive` (`isActive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- VENDORS TABLE  
-- =========================================================
CREATE TABLE `vendors` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `businessName` varchar(255) NOT NULL,
  `businessDescription` text NULL,
  `businessRegistrationNumber` varchar(255) NULL UNIQUE,
  `taxId` varchar(255) NULL,
  `status` enum('pending','active','suspended','rejected') NOT NULL DEFAULT 'pending',
  `businessAddress` json NULL,
  `contactInformation` json NULL,
  `bankingInformation` json NULL,
  `documents` json NULL,
  `verificationNotes` text NULL,
  `commission` decimal(5,2) NOT NULL DEFAULT 10.00,
  `monthlyFee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_status` (`status`),
  INDEX `idx_businessName` (`businessName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- PAYMENTS TABLE
-- =========================================================
CREATE TABLE `payments` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `orderId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL DEFAULT 'USD',
  `paymentMethod` json NOT NULL,
  `status` enum('pending','processing','completed','failed','refunded') NOT NULL DEFAULT 'pending',
  `transactionId` varchar(255) NULL,
  `gatewayResponse` json NULL,
  `refundAmount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `refundReason` text NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_orderId` (`orderId`),
  INDEX `idx_userId` (`userId`),
  INDEX `idx_status` (`status`),
  INDEX `idx_transactionId` (`transactionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- SUPPORT TICKETS TABLE
-- =========================================================
CREATE TABLE `support_tickets` (
  `id` varchar(20) NOT NULL PRIMARY KEY,
  `userId` varchar(36) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `category` enum('general','order','payment','product','technical') NOT NULL DEFAULT 'general',
  `priority` enum('low','medium','high','urgent') NOT NULL DEFAULT 'medium',
  `status` enum('open','waiting_staff','waiting_customer','resolved','closed') NOT NULL DEFAULT 'open',
  `assignedToId` varchar(36) NULL,
  `resolution` text NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_userId` (`userId`),
  INDEX `idx_status` (`status`),
  INDEX `idx_priority` (`priority`),
  INDEX `idx_category` (`category`),
  INDEX `idx_assignedToId` (`assignedToId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- SUPPORT MESSAGES TABLE
-- =========================================================
CREATE TABLE `support_messages` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `ticketId` varchar(20) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `message` text NOT NULL,
  `isStaff` tinyint(1) NOT NULL DEFAULT 0,
  `attachments` json NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_ticketId` (`ticketId`),
  INDEX `idx_userId` (`userId`),
  INDEX `idx_createdAt` (`createdAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- KNOWLEDGE BASE TABLE
-- =========================================================
CREATE TABLE `knowledge_base` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `excerpt` text NULL,
  `content` longtext NOT NULL,
  `category` varchar(100) NOT NULL,
  `tags` json NULL,
  `published` tinyint(1) NOT NULL DEFAULT 0,
  `views` int NOT NULL DEFAULT 0,
  `authorId` varchar(36) NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`),
  INDEX `idx_published` (`published`),
  INDEX `idx_views` (`views`),
  FULLTEXT `idx_search` (`title`, `content`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- FAQ TABLE
-- =========================================================
CREATE TABLE `faq` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `question` varchar(500) NOT NULL,
  `answer` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `sortOrder` int NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`),
  INDEX `idx_published` (`published`),
  INDEX `idx_sortOrder` (`sortOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `contactInfo` json NULL,
  `bankingDetails` json NULL,
  `businessDocuments` json NULL,
  `rating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `totalOrders` int NOT NULL DEFAULT 0,
  `totalRevenue` decimal(12,2) NOT NULL DEFAULT 0.00,
  `totalReviews` int NOT NULL DEFAULT 0,
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `categories` json NULL,
  `shippingMethods` json NULL,
  `returnPolicy` json NULL,
  `approvedAt` datetime NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` varchar(36) NOT NULL,
  INDEX `idx_businessName` (`businessName`),
  INDEX `idx_status` (`status`),
  INDEX `idx_verified` (`verified`),
  INDEX `idx_featured` (`featured`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- PRODUCTS TABLE
-- =========================================================
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `shortDescription` text NULL,
  `sku` varchar(255) NULL,
  `price` decimal(10,2) NOT NULL,
  `compareAtPrice` decimal(10,2) NULL,
  `costPrice` decimal(10,2) NULL,
  `category` varchar(255) NOT NULL,
  `tags` json NULL,
  `images` json NULL,
  `status` enum('draft','active','inactive','out_of_stock') NOT NULL DEFAULT 'draft',
  `inventory` int NOT NULL DEFAULT 0,
  `trackInventory` tinyint(1) NOT NULL DEFAULT 0,
  `allowBackorder` tinyint(1) NOT NULL DEFAULT 0,
  `weight` decimal(8,3) NULL,
  `dimensions` json NULL,
  `variants` json NULL,
  `attributes` json NULL,
  `seoMetadata` json NULL,
  `shippingInfo` json NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `viewCount` int NOT NULL DEFAULT 0,
  `salesCount` int NOT NULL DEFAULT 0,
  `rating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `reviewCount` int NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `vendorId` varchar(36) NOT NULL,
  INDEX `idx_name` (`name`),
  INDEX `idx_category` (`category`),
  INDEX `idx_status` (`status`),
  INDEX `idx_featured` (`featured`),
  INDEX `idx_price` (`price`),
  INDEX `idx_rating` (`rating`),
  FULLTEXT `idx_search` (`name`, `description`),
  FOREIGN KEY (`vendorId`) REFERENCES `vendors`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- ORDERS TABLE
-- =========================================================
CREATE TABLE `orders` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `orderNumber` varchar(255) NOT NULL UNIQUE,
  `status` enum('pending','confirmed','processing','shipped','delivered','cancelled','refunded') NOT NULL DEFAULT 'pending',
  `paymentStatus` enum('pending','paid','failed','refunded','partially_refunded') NOT NULL DEFAULT 'pending',
  `subtotal` decimal(10,2) NOT NULL,
  `tax` decimal(10,2) NOT NULL DEFAULT 0.00,
  `shipping` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'USD',
  `shippingAddress` json NOT NULL,
  `billingAddress` json NULL,
  `paymentMethod` json NULL,
  `shippingMethod` json NULL,
  `notes` text NULL,
  `metadata` json NULL,
  `shippedAt` datetime NULL,
  `deliveredAt` datetime NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customerId` varchar(36) NOT NULL,
  INDEX `idx_orderNumber` (`orderNumber`),
  INDEX `idx_status` (`status`),
  INDEX `idx_paymentStatus` (`paymentStatus`),
  INDEX `idx_customerId` (`customerId`),
  INDEX `idx_createdAt` (`createdAt`),
  FOREIGN KEY (`customerId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- ORDER ITEMS TABLE
-- =========================================================
CREATE TABLE `order_items` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `variantId` varchar(255) NULL,
  `productSnapshot` json NULL,
  `orderId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- CATEGORIES TABLE (Enhanced product categories)
-- =========================================================
CREATE TABLE `categories` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL UNIQUE,
  `description` text NULL,
  `image` varchar(255) NULL,
  `icon` varchar(255) NULL,
  `parentId` varchar(36) NULL,
  `level` int NOT NULL DEFAULT 0,
  `sortOrder` int NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `metaTitle` varchar(255) NULL,
  `metaDescription` text NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_slug` (`slug`),
  INDEX `idx_parentId` (`parentId`),
  INDEX `idx_level` (`level`),
  INDEX `idx_sortOrder` (`sortOrder`),
  INDEX `idx_isActive` (`isActive`),
  FOREIGN KEY (`parentId`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- REVIEWS TABLE
-- =========================================================
CREATE TABLE `reviews` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `rating` int NOT NULL CHECK (`rating` >= 1 AND `rating` <= 5),
  `title` varchar(255) NULL,
  `comment` text NULL,
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `helpful` int NOT NULL DEFAULT 0,
  `images` json NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  `orderId` varchar(36) NULL,
  INDEX `idx_rating` (`rating`),
  INDEX `idx_verified` (`verified`),
  INDEX `idx_productId` (`productId`),
  INDEX `idx_userId` (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- WISHLIST TABLE
-- =========================================================
CREATE TABLE `wishlists` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  UNIQUE KEY `unique_wishlist` (`userId`, `productId`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- SHOPPING CART TABLE
-- =========================================================
CREATE TABLE `cart_items` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `quantity` int NOT NULL DEFAULT 1,
  `variantId` varchar(255) NULL,
  `customOptions` json NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  UNIQUE KEY `unique_cart_item` (`userId`, `productId`, `variantId`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- COUPONS TABLE
-- =========================================================
CREATE TABLE `coupons` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `code` varchar(255) NOT NULL UNIQUE,
  `name` varchar(255) NOT NULL,
  `description` text NULL,
  `type` enum('percentage','fixed','free_shipping') NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `minimumAmount` decimal(10,2) NULL,
  `maximumDiscount` decimal(10,2) NULL,
  `usageLimit` int NULL,
  `usageCount` int NOT NULL DEFAULT 0,
  `userLimit` int NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `applicableCategories` json NULL,
  `applicableProducts` json NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_code` (`code`),
  INDEX `idx_isActive` (`isActive`),
  INDEX `idx_dates` (`startDate`, `endDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- USER ADDRESSES TABLE
-- =========================================================
CREATE TABLE `user_addresses` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `company` varchar(255) NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `zipCode` varchar(20) NOT NULL,
  `phone` varchar(50) NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT 0,
  `type` enum('shipping','billing','both') NOT NULL DEFAULT 'both',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` varchar(36) NOT NULL,
  INDEX `idx_userId` (`userId`),
  INDEX `idx_isDefault` (`isDefault`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- NOTIFICATIONS TABLE
-- =========================================================
CREATE TABLE `notifications` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` enum('order','payment','system','promotion','review') NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `metadata` json NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` varchar(36) NOT NULL,
  INDEX `idx_userId` (`userId`),
  INDEX `idx_isRead` (`isRead`),
  INDEX `idx_type` (`type`),
  INDEX `idx_createdAt` (`createdAt`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- INSERT SAMPLE CATEGORIES
-- =========================================================
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `level`, `sortOrder`, `isActive`) VALUES
(UUID(), 'Electronics', 'electronics', 'Electronic devices and accessories', 0, 1, 1),
(UUID(), 'Fashion', 'fashion', 'Clothing, shoes, and accessories', 0, 2, 1),
(UUID(), 'Home & Garden', 'home-garden', 'Home decor, furniture, and garden supplies', 0, 3, 1),
(UUID(), 'Sports & Outdoors', 'sports-outdoors', 'Sports equipment and outdoor gear', 0, 4, 1),
(UUID(), 'Health & Beauty', 'health-beauty', 'Personal care and beauty products', 0, 5, 1),
(UUID(), 'Books & Media', 'books-media', 'Books, movies, music, and games', 0, 6, 1),
(UUID(), 'Toys & Games', 'toys-games', 'Toys, games, and children products', 0, 7, 1),
(UUID(), 'Automotive', 'automotive', 'Car parts and automotive accessories', 0, 8, 1),
(UUID(), 'Grocery & Food', 'grocery-food', 'Food, beverages, and grocery items', 0, 9, 1),
(UUID(), 'Business & Industrial', 'business-industrial', 'Professional and industrial equipment', 0, 10, 1);

-- =========================================================
-- CREATE DEFAULT ADMIN USER
-- =========================================================
INSERT INTO `users` (`id`, `email`, `name`, `password`, `role`, `emailVerified`, `isActive`) VALUES
(UUID(), 'admin@globalnexus.com', 'Administrator', '$2b$10$rOzJrZqQnhm7LJ5L5L5L5OzJrZqQnhm7LJ5L5L5L5OzJrZqQnhm7LJ', 'admin', 1, 1);

-- =========================================================
-- BANNERS TABLE (For Homepage Carousel and Promotions)
-- =========================================================
CREATE TABLE `banners` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `imageUrl` varchar(500) NOT NULL,
  `mobileImageUrl` varchar(500) NULL,
  `type` enum('hero','promotional','category','seasonal') NOT NULL DEFAULT 'hero',
  `status` enum('active','inactive','scheduled') NOT NULL DEFAULT 'active',
  `linkUrl` varchar(500) NULL,
  `buttonText` varchar(100) NULL,
  `sortOrder` int NOT NULL DEFAULT 0,
  `startDate` datetime NULL,
  `endDate` datetime NULL,
  `targetAudience` json NULL,
  `analytics` json NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_banner_type_status` (`type`, `status`),
  INDEX `idx_banner_sort` (`sortOrder`),
  INDEX `idx_banner_dates` (`startDate`, `endDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample banners for homepage
INSERT INTO `banners` (`id`, `title`, `description`, `imageUrl`, `type`, `status`, `linkUrl`, `buttonText`, `sortOrder`) VALUES
('banner-1', 'Winter Sale - Up to 70% Off', 'Discover amazing deals on fashion, electronics, and home goods', 'https://placehold.co/1200x400/6366f1/ffffff?text=Winter+Sale+70%25+Off', 'hero', 'active', '/deals', 'Shop Now', 1),
('banner-2', 'New Electronics Collection', 'Latest tech gadgets and accessories now available', 'https://placehold.co/1200x400/059669/ffffff?text=New+Electronics+Collection', 'hero', 'active', '/categories/electronics', 'Explore', 2),
('banner-3', 'Free Shipping Worldwide', 'Free shipping on all orders over $50', 'https://placehold.co/1200x400/dc2626/ffffff?text=Free+Shipping+Worldwide', 'hero', 'active', '/shipping', 'Learn More', 3);

-- Insert sample users for vendors
INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`, `emailVerified`, `isActive`) VALUES
('vendor-1', 'vendor1@example.com', '$2b$10$example', 'TechCorp Solutions', 'vendor', 1, 1),
('vendor-2', 'vendor2@example.com', '$2b$10$example', 'Fashion Hub', 'vendor', 1, 1),
('vendor-3', 'vendor3@example.com', '$2b$10$example', 'Home & Garden Co', 'vendor', 1, 1);

-- Insert sample vendors
INSERT INTO `vendors` (`id`, `businessName`, `businessDescription`, `status`, `verified`, `featured`, `userId`) VALUES
('vendor-1', 'TechCorp Solutions', 'Leading provider of cutting-edge technology products', 'active', 1, 1, 'vendor-1'),
('vendor-2', 'Fashion Hub', 'Trendy and affordable fashion for everyone', 'active', 1, 0, 'vendor-2'),
('vendor-3', 'Home & Garden Co', 'Everything you need for your home and garden', 'active', 1, 0, 'vendor-3');

-- Insert sample products
INSERT INTO `products` (`id`, `name`, `description`, `shortDescription`, `sku`, `price`, `compareAtPrice`, `category`, `images`, `status`, `inventory`, `featured`, `viewCount`, `salesCount`, `rating`, `reviewCount`, `vendorId`) VALUES
('prod-1', 'QuantumCore Laptop Pro', 'High-performance laptop with the latest QuantumCore processor, 16GB RAM, and 512GB SSD. Perfect for professionals and creative work.', 'Professional laptop with QuantumCore processor', 'LAPTOP-QC-001', 1299.99, 1599.99, 'Electronics', '["https://placehold.co/500x500/1f2937/ffffff?text=Laptop"]', 'active', 25, 1, 1520, 89, 4.8, 142, 'vendor-1'),
('prod-2', 'Wireless Noise-Cancelling Headphones', 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.', 'Premium wireless headphones', 'HEADPHONES-WNC-001', 199.99, 299.99, 'Electronics', '["https://placehold.co/500x500/374151/ffffff?text=Headphones"]', 'active', 15, 1, 2340, 156, 4.7, 89, 'vendor-1'),
('prod-3', 'Smart Fitness Watch', 'Advanced fitness tracking with heart rate monitor, GPS, and waterproof design.', 'Smart fitness watch with GPS', 'WATCH-SF-001', 349.99, 399.99, 'Electronics', '["https://placehold.co/500x500/4b5563/ffffff?text=Smart+Watch"]', 'active', 42, 1, 1890, 203, 4.6, 156, 'vendor-1'),
('prod-4', 'Designer Casual Jacket', 'Stylish and comfortable casual jacket perfect for any season.', 'Premium casual jacket', 'JACKET-DC-001', 89.99, 129.99, 'Fashion', '["https://placehold.co/500x500/6b7280/ffffff?text=Jacket"]', 'active', 38, 0, 890, 67, 4.5, 45, 'vendor-2'),
('prod-5', 'Ergonomic Office Chair', 'Comfortable ergonomic office chair with lumbar support and adjustable height.', 'Ergonomic office chair', 'CHAIR-EO-001', 299.99, 399.99, 'Home & Garden', '["https://placehold.co/500x500/9ca3af/ffffff?text=Office+Chair"]', 'active', 12, 1, 1240, 78, 4.7, 67, 'vendor-3'),
('prod-6', 'Bluetooth Speaker', 'Portable Bluetooth speaker with 12-hour battery and waterproof design.', 'Portable Bluetooth speaker', 'SPEAKER-BT-001', 79.99, 99.99, 'Electronics', '["https://placehold.co/500x500/d1d5db/ffffff?text=Speaker"]', 'active', 55, 0, 1680, 134, 4.4, 98, 'vendor-1'),
('prod-7', 'Running Shoes', 'High-performance running shoes with advanced cushioning technology.', 'Professional running shoes', 'SHOES-RUN-001', 129.99, 179.99, 'Fashion', '["https://placehold.co/500x500/e5e7eb/ffffff?text=Running+Shoes"]', 'active', 28, 1, 2140, 189, 4.8, 123, 'vendor-2'),
('prod-8', 'Smart Home Security Camera', '4K security camera with night vision and mobile app control.', '4K smart security camera', 'CAMERA-SEC-001', 159.99, 199.99, 'Electronics', '["https://placehold.co/500x500/f3f4f6/ffffff?text=Security+Camera"]', 'active', 33, 1, 980, 56, 4.6, 34, 'vendor-1');

-- Update product vendor associations
UPDATE `products` SET `vendorId` = 'vendor-1' WHERE `id` IN ('prod-1', 'prod-2', 'prod-3', 'prod-6', 'prod-8');
UPDATE `products` SET `vendorId` = 'vendor-2' WHERE `id` IN ('prod-4', 'prod-7');
UPDATE `products` SET `vendorId` = 'vendor-3' WHERE `id` IN ('prod-5');

-- =========================================================
-- INDEXES FOR PERFORMANCE
-- =========================================================
-- Additional composite indexes for common queries
CREATE INDEX `idx_products_category_status` ON `products` (`category`, `status`);
CREATE INDEX `idx_products_vendor_status` ON `products` (`vendorId`, `status`);
CREATE INDEX `idx_orders_customer_status` ON `orders` (`customerId`, `status`);
CREATE INDEX `idx_reviews_product_rating` ON `reviews` (`productId`, `rating`);

-- =========================================================
-- END OF SCHEMA
-- =========================================================