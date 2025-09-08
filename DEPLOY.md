# Comprehensive eCommerce Platform - Deployment Guide

## Overview

This is a comprehensive multi-vendor eCommerce platform with advanced features for Sellers, Customers, and Admins. The platform includes role-based authentication, comprehensive inventory management, seller onboarding, customer order management, and admin moderation tools.

## Architecture

- **Frontend**: Next.js 14 with React, TypeScript, Tailwind CSS
- **Backend**: NestJS with TypeScript, PostgreSQL, JWT Authentication
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT-based with role-based access control
- **UI Components**: Custom components with Lucide icons, Framer Motion animations

## Features

### 🛒 Customer Features
- **Enhanced Dashboard**: Order overview, account status, quick actions
- **Order Management**: Comprehensive order tracking with filtering and search
- **Professional UI**: Dark mode support, responsive design
- **Account Management**: Profile updates, address management, preferences

### 👨‍💼 Seller Features
- **Comprehensive Onboarding**: 6-step registration process
  - Business information collection
  - Contact details and address
  - Product categories and shipping methods
  - Banking and payment setup
  - Document upload and verification
  - Review and submission
- **Inventory Management**: 
  - Product catalog with advanced filtering
  - Stock level monitoring and alerts
  - Bulk operations and status management
  - Stock movement tracking
  - Low stock alerts and notifications
- **Analytics Dashboard**: Sales tracking, revenue reporting, performance metrics
- **Professional Seller Console**: Complete business management interface

### 🔧 Admin Features
- **Comprehensive Dashboard**: Platform overview with key metrics
- **User Management**: 
  - Customer and vendor management
  - Account status controls (active, suspended, pending)
  - User verification and KYC status
- **Product Moderation**:
  - Product approval workflow
  - Content moderation tools
  - Report management
  - Bulk moderation actions
- **Analytics**: Platform-wide statistics and reporting
- **Vendor Applications**: Review and approve seller applications

## User Roles & Permissions

### Customer
- Browse products and marketplace
- Place and manage orders
- Update profile and preferences
- View order history and tracking

### Vendor/Seller
- Complete onboarding process
- Manage product inventory
- View sales analytics
- Handle order fulfillment
- Update business information

### Admin
- Manage all users and vendors
- Moderate products and content
- View platform analytics
- Handle reports and disputes
- Configure platform settings

## Installation & Setup

### Prerequisites

- Node.js 16+
- PostgreSQL 12+
- npm or yarn
- Git

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cdd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Build and run**
   ```bash
   # Development
   npm run dev

   # Production
   npm run build
   npm start
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   Create `.env` file:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_DATABASE=ecommerce_db

   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d

   # App
   PORT=3001
   NODE_ENV=production
   ```

4. **Database setup**
   ```bash
   # Create database
   createdb ecommerce_db

   # Run migrations
   npm run typeorm:migration:run
   ```

5. **Build and run**
   ```bash
   # Development
   npm run start:dev

   # Production
   npm run build
   npm run start:prod
   ```

## Database Schema

### Core Entities

- **Users**: Customer and admin accounts
- **Vendors**: Seller business profiles
- **Products**: Product catalog with variants
- **Orders**: Order management and tracking
- **Payments**: Payment processing records

### Key Features

- **Role-based Access Control**: Customer, Vendor, Admin roles
- **Vendor Onboarding**: Complete business registration workflow
- **Product Management**: Inventory tracking, stock levels, categories
- **Order Processing**: Status tracking, fulfillment management

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Vendors
- `POST /vendors/onboarding` - Complete vendor onboarding
- `GET /vendors/me/stats` - Get vendor statistics
- `PATCH /vendors/:id/approve` - Approve vendor (Admin)

### Products
- `GET /products` - List products with filters
- `POST /products` - Create product (Vendor)
- `PATCH /products/:id` - Update product

### Orders
- `GET /orders` - List orders
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details

## Deployment

### Production Environment Setup

1. **Server Requirements**
   - Ubuntu 20.04+ or similar Linux distribution
   - Node.js 16+
   - PostgreSQL 12+
   - Nginx (recommended)
   - SSL certificate (Let's Encrypt recommended)

2. **Frontend Deployment**
   ```bash
   # Build the application
   npm run build

   # Deploy with PM2
   npm install -g pm2
   pm2 start npm --name "ecommerce-frontend" -- start
   pm2 save
   pm2 startup
   ```

3. **Backend Deployment**
   ```bash
   cd backend
   npm run build

   # Deploy with PM2
   pm2 start dist/main.js --name "ecommerce-backend"
   pm2 save
   ```

4. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl;
       server_name yourdomain.com;

       ssl_certificate /path/to/ssl/cert;
       ssl_certificate_key /path/to/ssl/key;

       # Frontend
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:3001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

### Environment Variables for Production

**Frontend (.env.production)**
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

**Backend (.env)**
```env
DB_HOST=your_db_host
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_secure_password
DB_DATABASE=ecommerce_prod

JWT_SECRET=your_very_secure_jwt_secret
JWT_EXPIRES_IN=7d

PORT=3001
NODE_ENV=production

# File upload (optional)
UPLOAD_DEST=uploads/
MAX_FILE_SIZE=10485760

# Email (optional)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_email_password
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Granular permissions by user role
- **Input Validation**: Comprehensive data validation
- **SQL Injection Protection**: TypeORM provides built-in protection
- **XSS Protection**: Sanitized data rendering
- **CORS Configuration**: Proper cross-origin resource sharing
- **Rate Limiting**: API endpoint protection
- **Secure Headers**: HSTS, CSP implementation

## Performance Optimizations

- **Next.js Static Generation**: Pre-rendered pages for better performance
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic bundle optimization
- **Database Indexing**: Optimized database queries
- **Caching Strategy**: Redis integration ready

## Monitoring & Maintenance

### Health Checks
- Frontend: `GET /api/health`
- Backend: `GET /health`

### Logging
- Application logs via console
- Error tracking and monitoring
- Performance metrics collection

### Backup Strategy
```bash
# Database backup
pg_dump ecommerce_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump ecommerce_prod > $BACKUP_DIR/db_backup_$DATE.sql
find $BACKUP_DIR -name "db_backup_*.sql" -mtime +7 -delete
```

## Default Admin Account

**Important**: Change these credentials immediately after deployment!

```
Email: admin@globalnexus.com
Password: admin123
```

## Support & Troubleshooting

### Common Issues

1. **Build failures**: Check Node.js version and dependencies
2. **Database connection**: Verify PostgreSQL is running and credentials are correct
3. **JWT errors**: Ensure JWT_SECRET is set and consistent
4. **CORS issues**: Check API URL configuration

### Logs
- Frontend logs: Browser console and server logs
- Backend logs: Application console output
- Database logs: PostgreSQL logs

### Performance Monitoring
- Monitor memory usage with `htop` or similar tools
- Check database performance with PostgreSQL monitoring tools
- Use PM2 monitoring: `pm2 monit`

## Contributing

When contributing to this project:

1. Follow the existing code style and patterns
2. Add tests for new features
3. Update documentation as needed
4. Ensure all builds pass before submitting

## License

This project is licensed under the MIT License.

---

**Ready for production deployment with competitive global UX standards!** 🌟

For additional support or questions, please refer to the API documentation or create an issue in the repository.