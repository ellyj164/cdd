# Complete Ecommerce Application

A full-featured ecommerce application with React frontend and PHP backend, ready for production deployment.

## 🚀 Features

### Frontend (React)
- Modern, responsive design with Tailwind CSS
- Professional footer with newsletter subscription
- Product catalog with search and filtering
- Shopping cart functionality
- User authentication and profiles
- Order management
- Review and rating system
- Mobile-first responsive design
- Dark mode support
- Accessibility compliant

### Backend (PHP)
- RESTful API architecture
- JWT authentication
- Role-based access control (Customer, Vendor, Admin)
- Comprehensive product management
- Order processing system
- Review and rating management
- Newsletter subscription handling
- File upload support
- Rate limiting and security features
- MySQL database with optimized schema

## 📋 Requirements

### Development
- Node.js 16+
- PHP 7.4+
- MySQL 5.7+
- Apache/Nginx with mod_rewrite

### Production
- Webmin hosting environment
- MySQL database
- PHP 7.4+ with extensions: PDO, JSON, OpenSSL
- SSL certificate (recommended)

## 🛠 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ellyj164/React-Playground.git
cd React-Playground
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 3. Backend Setup
```bash
# Copy environment file
cp backend/.env.example backend/.env

# Edit database configuration
nano backend/.env

# Set up database (import backend/database/schema.sql)
mysql -u root -p ecommerce_db < backend/database/schema.sql
```

### 4. Web Server Configuration
- Point document root to the main directory
- Ensure `.htaccess` rewrite rules are enabled
- Set proper file permissions for `backend/uploads/`

## 🌐 API Endpoints

### Authentication
- `POST /backend/auth/register` - Register user
- `POST /backend/auth/login` - User login
- `GET /backend/auth/profile` - Get profile
- `POST /backend/auth/logout` - Logout

### Products
- `GET /backend/products` - List products
- `GET /backend/products/{id}` - Get product details
- `POST /backend/products` - Create product (vendor/admin)
- `PUT /backend/products/{id}` - Update product

### Cart & Orders
- `GET /backend/cart` - Get cart
- `POST /backend/cart/add` - Add to cart
- `POST /backend/orders` - Create order
- `GET /backend/orders` - List orders

### Newsletter
- `POST /backend/newsletter/subscribe` - Subscribe to newsletter

See [API Documentation](backend/docs/API.md) for complete endpoint reference.

## 🚀 Deployment

### Webmin Deployment
Follow the detailed [Deployment Guide](backend/docs/DEPLOYMENT.md) for Webmin hosting.

### Quick Production Steps
1. Build React app: `npm run build`
2. Upload `dist/` contents to web root
3. Upload `backend/` directory
4. Import database schema
5. Configure environment variables
6. Set file permissions
7. Enable SSL/HTTPS

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:

```env
# Database
DB_HOST=localhost
DB_NAME=ecommerce_db
DB_USER=your_user
DB_PASS=your_password

# Security
JWT_SECRET=your-secret-key

# App Settings
APP_ENV=production
APP_URL=https://yourdomain.com
```

### Default Admin Account
- Email: admin@example.com
- Password: password (change immediately!)

## 📱 Frontend Features

### Components
- **Professional Footer** - Newsletter subscription, social links, company info
- **Product Catalog** - Search, filtering, pagination
- **Shopping Cart** - Add/remove items, quantity management
- **User Dashboard** - Profile management, order history
- **Admin/Vendor Dashboards** - Management interfaces

### Pages
- Home page with featured products
- Product listing and detail pages
- Cart and checkout flow
- User authentication pages
- Order management
- Admin and vendor dashboards

## 🛡 Security Features

### Backend Security
- JWT token authentication
- Password hashing with bcrypt
- SQL injection prevention
- XSS protection
- CORS configuration
- Rate limiting
- Input validation and sanitization
- Secure file upload handling

### Frontend Security
- XSS protection
- CSRF protection
- Secure authentication flow
- Input validation
- Sanitized data rendering

## 📊 Database Schema

### Main Tables
- `users` - User accounts and profiles
- `products` - Product catalog
- `categories` - Product categories
- `orders` - Customer orders
- `order_items` - Order line items
- `cart` - Shopping cart items
- `reviews` - Product reviews and ratings
- `newsletter_subscriptions` - Newsletter subscribers

See [Database Schema](backend/database/schema.sql) for complete structure.

## 🧪 Testing

### Backend Testing
```bash
# Test API health
curl http://localhost/backend/

# Test authentication
curl -X POST http://localhost/backend/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

### Frontend Testing
1. Start development server: `npm run dev`
2. Open http://localhost:5173
3. Test user flows:
   - Product browsing
   - Newsletter subscription
   - User registration/login
   - Shopping cart functionality

## 📚 Project Structure

```
React-Playground/
├── src/                     # React frontend source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   └── stores/            # Zustand stores
├── backend/               # PHP backend
│   ├── api/              # API endpoints
│   ├── config/           # Configuration files
│   ├── includes/         # Helper functions
│   ├── database/         # Database schema
│   └── docs/             # Documentation
├── dist/                 # Built frontend (after npm run build)
└── public/               # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For deployment assistance or issues:
1. Check the [Deployment Guide](backend/docs/DEPLOYMENT.md)
2. Review [API Documentation](backend/docs/API.md)
3. Open an issue on GitHub

## 🎯 Roadmap

### Planned Features
- Payment gateway integration (Stripe, PayPal)
- Advanced search with Elasticsearch
- Real-time notifications
- Multi-language support
- Advanced analytics dashboard
- Email marketing automation
- Social media integration
- Mobile app (React Native)

### Performance Optimizations
- Redis caching
- CDN integration
- Image optimization
- Database query optimization
- Progressive Web App (PWA) features

---

**Ready for production deployment with competitive global UX standards!** 🌟
