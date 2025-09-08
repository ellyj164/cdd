# Multi-Vendor Marketplace - Production Ready

A complete production-ready multi-vendor marketplace built with Next.js and Nest.js, featuring comprehensive authentication, payment processing, file storage, Docker configuration, and VPS deployment automation.

## 🚀 Features

### Frontend (Next.js)
- Modern, responsive design with Tailwind CSS
- Multi-language support (i18n)
- Advanced payment system with multiple providers
- Real-time notifications
- PWA capabilities with service worker
- Dark mode support
- Accessibility compliant (WCAG 2.1)

### Backend (Nest.js)
- RESTful API with Swagger documentation
- JWT authentication with role-based access control
- Multi-vendor management system
- Comprehensive product catalog
- Order processing and management
- Payment integration (Stripe, PayPal ready)
- File upload with cloud storage support
- Rate limiting and security features

### Infrastructure
- PostgreSQL database with optimized schema
- Redis for caching and sessions
- Docker containerization for all services
- Nginx reverse proxy with SSL/TLS
- Automated deployment scripts
- Health monitoring and logging
- Backup automation

## 📋 System Requirements

### Development
- Node.js 18+
- npm 9+
- Docker & Docker Compose
- Git

### Production
- VPS with 2GB+ RAM
- Ubuntu 20.04+ or similar
- Domain name (optional)
- SSL certificate (automated with Let's Encrypt)

## 🛠 Quick Start

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/ellyj1/ecod.git
cd ecod
```

2. **Run the development setup script**
```bash
chmod +x deployment/setup-dev.sh
./deployment/setup-dev.sh
```

3. **Start the development servers**
```bash
# Terminal 1 - Start databases
docker-compose up -d postgres redis

# Terminal 2 - Start backend
cd backend
npm run start:dev

# Terminal 3 - Start frontend
npm run dev
```

### Manual Development Setup

1. **Environment Configuration**
```bash
cp .env.example .env
# Edit .env with your configuration
```

2. **Install Dependencies**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

3. **Start Services**
```bash
# Start databases
docker-compose up -d postgres redis

# Build and start backend
cd backend
npm run build
npm run start:dev

# Start frontend
npm run dev
```

## 🌐 Development URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api/v1
- **API Documentation**: http://localhost:3001/api/docs
- **Database**: localhost:5432 (PostgreSQL)
- **Cache**: localhost:6379 (Redis)

## 🚀 Production Deployment

### Automated VPS Deployment

```bash
# On your VPS (Ubuntu 20.04+)
curl -sSL https://raw.githubusercontent.com/ellyj1/ecod/main/deployment/deploy-vps.sh -o deploy.sh
chmod +x deploy.sh
sudo ./deploy.sh your-domain.com admin@your-domain.com
```

### Manual Docker Deployment

```bash
# Clone repository
git clone https://github.com/ellyj1/ecod.git
cd ecod

# Configure environment
cp .env.example .env
# Edit .env for production

# Build and start all services
docker-compose up -d --build

# Check service status
docker-compose ps
docker-compose logs
```

## 🔧 Configuration

### Environment Variables

Key environment variables for production:

```bash
# Database
DB_HOST=postgres
DB_NAME=globalnexus_prod
DB_USERNAME=nexus_user
DB_PASSWORD=your_secure_password

# Redis
REDIS_HOST=redis
REDIS_PASSWORD=your_redis_password

# JWT
JWT_SECRET=your_super_secret_jwt_key

# API
NEXT_PUBLIC_API_URL=https://your-domain.com/api/v1

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Payment (Optional)
STRIPE_SECRET_KEY=sk_live_your_stripe_key
```

### Database Schema

The application automatically creates the database schema using TypeORM migrations. Key entities include:

- **Users**: Customer and vendor accounts
- **Vendors**: Business profiles and verification
- **Products**: Catalog with variants and inventory
- **Orders**: Order processing and fulfillment
- **Payments**: Transaction records

### Default Admin Account

```
Email: admin@globalnexus.com
Password: admin123
```

**⚠️ Change the admin password immediately after first login!**

## 📊 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users/me` - Get user profile
- `PATCH /api/v1/users/me` - Update profile

### Vendors
- `POST /api/v1/vendors` - Create vendor profile
- `GET /api/v1/vendors` - List vendors
- `GET /api/v1/vendors/:id` - Get vendor details

### Products
- `GET /api/v1/products` - List products
- `GET /api/v1/products/:id` - Get product details
- `POST /api/v1/products` - Create product (vendor)

### Orders
- `GET /api/v1/orders` - List orders
- `GET /api/v1/orders/:id` - Get order details
- `POST /api/v1/orders` - Create order

## 🛡 Security Features

- JWT authentication with refresh tokens
- Role-based access control (Customer, Vendor, Admin)
- Rate limiting (10 req/s for API, 1 req/s for login)
- Input validation and sanitization
- SQL injection protection
- XSS protection
- CSRF protection
- Secure headers (HSTS, CSP, etc.)
- Password hashing with bcrypt

## 📁 Project Structure

```
ecod/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (legacy/mock)
│   ├── auth/              # Authentication pages
│   ├── products/          # Product pages
│   └── ...                # Other pages
├── backend/               # Nest.js backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── users/         # User management
│   │   ├── vendors/       # Vendor management
│   │   ├── products/      # Product catalog
│   │   ├── orders/        # Order processing
│   │   └── ...            # Other modules
│   └── package.json
├── src/                   # Frontend source
│   ├── components/        # React components
│   ├── services/          # API services
│   └── ...                # Other frontend code
├── nginx/                 # Nginx configuration
├── scripts/               # Database scripts
├── deployment/            # Deployment scripts
├── docker-compose.yml     # Docker orchestration
├── Dockerfile.frontend    # Frontend container
├── Dockerfile.backend     # Backend container
└── .env.example          # Environment template
```

## 🔄 Management Commands

### Development
```bash
# Start development servers
npm run dev                # Frontend
cd backend && npm run start:dev  # Backend

# Build for production
npm run build              # Frontend
cd backend && npm run build     # Backend

# Run tests
npm run test               # Frontend
cd backend && npm run test      # Backend
```

### Production
```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Update application
/opt/update-marketplace.sh

# Backup data
/opt/backup-marketplace.sh

# Monitor resources
docker stats
```

## 📊 Monitoring & Logging

### Health Checks
- Frontend: http://your-domain.com/health
- Backend: http://your-domain.com/api/v1/health
- Database: Automated health checks in Docker

### Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

### Backup
- Database: Automated daily backups at 2 AM
- File uploads: Included in backup script
- Retention: 7 days (configurable)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For deployment assistance or issues:

1. Check the [troubleshooting guide](docs/troubleshooting.md)
2. Review logs: `docker-compose logs`
3. Open an issue on GitHub
4. Check the API documentation at `/api/docs`

## 🎯 Roadmap

### Planned Features
- [ ] Real-time chat support
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Blockchain integration
- [ ] Multi-currency support
- [ ] Advanced inventory management
- [ ] Automated tax calculations

### Performance Optimizations
- [ ] Redis caching implementation
- [ ] CDN integration
- [ ] Image optimization
- [ ] Database query optimization
- [ ] Progressive Web App features

---

**Ready for production deployment with enterprise-grade security and scalability!** 🌟