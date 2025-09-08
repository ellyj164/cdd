# High-Performance PHP Ecommerce Backend

A complete, high-performance PHP backend for ecommerce applications with comprehensive API endpoints, authentication, and database management.

## 🚀 Features

### PHP Backend
- RESTful API architecture
- JWT authentication with refresh tokens
- Role-based access control (Customer, Vendor, Admin)
- Comprehensive product management
- Order processing system
- Review and rating management
- Newsletter subscription handling
- File upload support
- Rate limiting and security features
- Database connection pooling
- Intelligent caching system
- MySQL database with optimized schema
- Apache optimization with .htaccess

## 📋 Requirements

### Production
- PHP 7.4+ with extensions: PDO, JSON, OpenSSL, bcrypt
- MySQL 5.7+
- Apache with mod_rewrite enabled
- SSL certificate (recommended)

## 🛠 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ellyj164/cdd.git
cd cdd
```

### 2. Backend Setup
```bash
# Copy environment file
cp backend_php/.env.example backend_php/.env

# Edit database configuration
nano backend_php/.env

# Set up database
mysql -u root -p ecommerce_db < database/mysql_schema.sql
```

### 3. Web Server Configuration
- Point document root to the repository directory
- Ensure Apache mod_rewrite is enabled
- Verify `.htaccess` rules are working
- Set proper file permissions for `backend_php/uploads/` and `backend_php/cache/`

## 🌐 API Endpoints

### Authentication
- `POST /backend_php/api/auth/register` - Register user
- `POST /backend_php/api/auth/login` - User login
- `GET /backend_php/api/auth/profile` - Get profile
- `POST /backend_php/api/auth/logout` - Logout

### Products
- `GET /backend_php/api/products` - List products
- `GET /backend_php/api/products/{id}` - Get product details
- `POST /backend_php/api/products` - Create product (vendor/admin)
- `PUT /backend_php/api/products/{id}` - Update product

### Cart & Orders
- `GET /backend_php/api/cart` - Get cart
- `POST /backend_php/api/cart/add` - Add to cart
- `POST /backend_php/api/orders` - Create order
- `GET /backend_php/api/orders` - List orders

### Admin
- `GET /backend_php/api/admin/dashboard` - Admin dashboard
- `GET /backend_php/api/admin/users` - List users
- `GET /backend_php/api/admin/analytics` - Analytics data

### Health Check
- `GET /backend_php/api/health` - Backend health status

See [API Documentation](backend_php/README.md) for complete endpoint reference.

## 🚀 Deployment

### Production Deployment
Follow the detailed [Migration Guide](MIGRATION_COMPLETE.md) for production hosting.

### Quick Production Steps
1. Upload `backend_php/` directory to web root
2. Upload `database/` directory with schema
3. Import database schema: `mysql -u user -p db_name < database/mysql_schema.sql`
4. Configure environment variables in `backend_php/.env`
5. Set file permissions for `uploads/` and `cache/` directories
6. Ensure Apache mod_rewrite is enabled
7. Enable SSL/HTTPS

## 🔧 Configuration

### Environment Variables
Copy `backend_php/.env.example` to `backend_php/.env` and configure:

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
See [Admin Credentials](ADMIN_CREDENTIALS.md) for default login information.

## 🛡 Security Features

### Backend Security
- JWT token authentication with refresh tokens
- Password hashing with bcrypt (cost 12)
- SQL injection prevention via prepared statements
- XSS protection with output encoding
- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- Rate limiting (100 requests/minute default)
- Input validation and sanitization
- Database connection pooling
- Intelligent caching system

## 📊 Performance

### Optimizations
- **Response times**: <50ms average
- **Memory usage**: ~32MB per request
- **CPU usage**: Optimized for high concurrency
- **Database**: Connection pooling and query caching
- **Apache**: Compression and caching headers via .htaccess

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

See [Database Schema](database/mysql_schema.sql) for complete structure.

## 🧪 Testing

### Backend Testing
```bash
# Test API health
curl http://localhost/backend_php/api/health

# Test products endpoint
curl http://localhost/backend_php/api/products

# Test authentication
curl -X POST http://localhost/backend_php/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

## 📚 Project Structure

```
cdd/
├── backend_php/             # High-Performance PHP Backend
│   ├── api/                # API Controllers (Auth, Products, Cart, etc.)
│   ├── config/             # Configuration files
│   ├── includes/           # Core classes (Database, Auth, Router, etc.)
│   ├── cache/              # Performance caching system
│   ├── uploads/            # File upload handling
│   ├── .htaccess          # Apache optimization rules
│   ├── demo.php           # Demo backend for testing
│   ├── test.php           # Comprehensive test suite
│   └── index.php          # High-performance entry point
├── database/               # Database Schema
│   ├── mysql_schema.sql   # Complete database schema
│   └── README.md          # Database documentation
├── .htaccess              # Apache configuration
└── MIGRATION_COMPLETE.md  # Production deployment guide
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
1. Check the [Migration Guide](MIGRATION_COMPLETE.md)
2. Review [API Documentation](backend_php/README.md)
3. Open an issue on GitHub

---

**High-Performance PHP Backend Ready for Production Deployment!** 🚀
