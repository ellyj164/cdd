# Testing Guide - Multi-Vendor Marketplace

This guide provides step-by-step instructions for testing the complete marketplace infrastructure.

## 🧪 Testing Infrastructure

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ and npm
- Git

### 1. Development Environment Testing

```bash
# Clone the repository
git clone https://github.com/ellyj1/ecod.git
cd ecod

# Set up development environment
chmod +x deployment/setup-dev.sh
./deployment/setup-dev.sh
```

### 2. Manual Testing Steps

#### Backend Testing

```bash
# 1. Start databases
docker-compose up -d postgres redis

# 2. Wait for databases to start (check logs)
docker-compose logs postgres
docker-compose logs redis

# 3. Start backend
cd backend
npm run start:dev

# 4. Test health endpoint
curl http://localhost:3001/api/v1/health

# 5. Test API documentation
# Open http://localhost:3001/api/docs in browser
```

#### Frontend Testing

```bash
# 1. Start frontend (in a new terminal)
npm run dev

# 2. Open browser
# Visit http://localhost:3000

# 3. Test pages
# - Home page
# - Product catalog
# - Authentication pages
# - Seller console
```

### 3. API Testing

#### Authentication Tests

```bash
# Register a new user
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'

# Login
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "test@example.com",
    "password": "password123"
  }'

# Use the returned token for authenticated requests
export TOKEN="your_jwt_token_here"

# Get user profile
curl -X GET http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

#### Vendor Tests

```bash
# Create vendor profile
curl -X POST http://localhost:3001/api/v1/vendors \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Business",
    "businessDescription": "A test business"
  }'

# Get vendors
curl -X GET http://localhost:3001/api/v1/vendors
```

### 4. Docker Integration Testing

```bash
# Build and start all services
docker-compose up --build

# Check service health
docker-compose ps
curl http://localhost/health
curl http://localhost/api/v1/health

# Test through Nginx proxy
curl http://localhost/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Production Testing (Local)

```bash
# Create production environment
cp .env.example .env.production

# Update environment for production
sed -i 's/development/production/g' .env.production

# Build for production
NODE_ENV=production docker-compose -f docker-compose.yml up --build
```

## 🔍 Verification Checklist

### ✅ Backend Verification
- [ ] Backend starts without errors
- [ ] Database connection successful
- [ ] Health endpoint responds
- [ ] API documentation accessible
- [ ] JWT authentication works
- [ ] User registration/login works
- [ ] Vendor creation works
- [ ] All endpoints return proper HTTP status codes

### ✅ Frontend Verification
- [ ] Frontend builds successfully
- [ ] All pages load without errors
- [ ] API integration works
- [ ] Authentication flow works
- [ ] Forms submit correctly
- [ ] Responsive design works
- [ ] No console errors

### ✅ Infrastructure Verification
- [ ] Docker containers start successfully
- [ ] PostgreSQL accepts connections
- [ ] Redis is accessible
- [ ] Nginx proxies requests correctly
- [ ] SSL/TLS works (if configured)
- [ ] File uploads work
- [ ] Logs are properly generated

### ✅ Security Verification
- [ ] Passwords are hashed
- [ ] JWT tokens are secure
- [ ] API endpoints require authentication
- [ ] Rate limiting works
- [ ] CORS is properly configured
- [ ] SQL injection protection works
- [ ] XSS protection is enabled

## 🐛 Common Issues & Solutions

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Check logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Clear backend build
rm -rf backend/dist

# Reinstall dependencies
npm install
cd backend && npm install
```

### Port Conflicts
```bash
# Check what's running on ports
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001
netstat -tulpn | grep :5432

# Kill processes if needed
sudo fuser -k 3000/tcp
sudo fuser -k 3001/tcp
```

### Permission Issues
```bash
# Fix permissions for uploads
chmod 755 uploads/
chown -R $USER:$USER uploads/

# Fix script permissions
chmod +x deployment/*.sh
```

## 📊 Performance Testing

### Load Testing with curl
```bash
# Simple load test
for i in {1..100}; do
  curl -s http://localhost:3001/api/v1/health > /dev/null &
done
wait
```

### Database Performance
```bash
# Check PostgreSQL stats
docker-compose exec postgres psql -U nexus_user -d globalnexus_prod -c "
  SELECT schemaname,tablename,attname,n_distinct,correlation 
  FROM pg_stats WHERE tablename IN ('users','vendors','products','orders');
"
```

## 🔧 Debugging

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Backend development logs
cd backend && npm run start:dev

# Frontend development logs
npm run dev
```

### Database Debugging
```bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U nexus_user -d globalnexus_prod

# Check tables
\dt

# Check users table
SELECT id, email, name, role FROM users;
```

### Redis Debugging
```bash
# Connect to Redis
docker-compose exec redis redis-cli

# Check keys
KEYS *

# Monitor commands
MONITOR
```

## ✅ Final Verification

Your marketplace is working correctly if:

1. **✅ All services start**: `docker-compose ps` shows all services as "Up"
2. **✅ Health checks pass**: Both frontend and backend health endpoints return 200
3. **✅ Database connected**: Backend logs show successful database connection
4. **✅ Authentication works**: You can register, login, and access protected routes
5. **✅ API documentation loads**: Swagger docs accessible at `/api/docs`
6. **✅ Frontend renders**: All pages load without errors
7. **✅ Proxy works**: Requests to `/api/*` are properly routed to backend

## 🎯 Next Steps

After successful testing:
1. Deploy to production VPS using `deployment/deploy-vps.sh`
2. Configure SSL certificates
3. Set up monitoring and backups
4. Configure payment providers
5. Set up email services
6. Configure cloud storage for file uploads