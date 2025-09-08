# Global Nexus Professional Ecommerce Platform Deployment Guide

## 🚀 Enterprise Deployment Documentation

### System Requirements

#### Minimum Hardware Requirements
- **CPU**: 8+ cores, 3.0GHz
- **RAM**: 32GB minimum, 64GB recommended
- **Storage**: 1TB SSD (NVMe recommended)
- **Network**: 1Gbps bandwidth minimum

#### Software Requirements
- **Node.js**: 18.17.0 or higher
- **npm**: 9.0.0 or higher
- **PostgreSQL**: 15.0+ (for primary data)
- **MongoDB**: 6.0+ (for product catalog)
- **Redis**: 7.0+ (for caching)
- **Docker**: 24.0+ (for containerization)

### Environment Setup

#### 1. Clone and Install

```bash
git clone https://github.com/ellyj1/edec.git
cd edec
npm install
```

#### 2. Environment Configuration

Copy `.env.local` and configure for your environment:

```bash
cp .env.local .env.production
```

**Production Environment Variables:**

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_API_VERSION=v1

# Database Configuration
DATABASE_URL=postgresql://username:password@your-postgres-host:5432/globalnexus_prod
MONGODB_URI=mongodb://username:password@your-mongo-host:27017/globalnexus_prod
REDIS_URL=redis://username:password@your-redis-host:6379

# Authentication
NEXTAUTH_SECRET=your-super-secure-production-secret-key
NEXTAUTH_URL=https://yourdomain.com

# OAuth Providers
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret

# Payment Gateway Configuration
STRIPE_SECRET_KEY=sk_live_your-production-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_live_your-production-stripe-publishable-key

# Email Service
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_USER=your-production-email@yourdomain.com
SMTP_PASS=your-production-email-password
FROM_EMAIL=noreply@yourdomain.com

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID=your-production-aws-access-key
AWS_SECRET_ACCESS_KEY=your-production-aws-secret-key
AWS_S3_BUCKET=globalnexus-production-assets
AWS_REGION=us-east-1

# Redis Configuration
REDIS_PASSWORD=your-production-redis-password
REDIS_HOST=your-redis-host
REDIS_PORT=6379

# Blockchain Configuration
BLOCKCHAIN_NETWORK=globalnexus_mainnet
BLOCKCHAIN_RPC_URL=https://mainnet.globalnexus.com/rpc
BLOCKCHAIN_PRIVATE_KEY=your-production-blockchain-private-key

# AI/ML Services
OPENAI_API_KEY=your-production-openai-api-key
ML_MODEL_ENDPOINT=https://ml-prod.globalnexus.com/api

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
MIXPANEL_TOKEN=your-production-mixpanel-token

# Security
RATE_LIMIT_MAX=10000
RATE_LIMIT_WINDOW=900000
ENCRYPTION_KEY=your-32-character-production-encryption-key

# Feature Flags
ENABLE_AI_RECOMMENDATIONS=true
ENABLE_BLOCKCHAIN_VERIFICATION=true
ENABLE_AR_VR_FEATURES=true
ENABLE_REAL_TIME_ANALYTICS=true

# Production
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Database Setup

#### PostgreSQL Setup

```sql
-- Create main database
CREATE DATABASE globalnexus_prod;

-- Create user
CREATE USER nexus_user WITH PASSWORD 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE globalnexus_prod TO nexus_user;

-- Enable required extensions
\c globalnexus_prod
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";
```

#### MongoDB Setup

```javascript
// Connect to MongoDB
use globalnexus_prod

// Create collections with proper indexing
db.createCollection("products")
db.createCollection("categories")
db.createCollection("vendors")
db.createCollection("reviews")

// Create indexes for performance
db.products.createIndex({ "name": "text", "description": "text" })
db.products.createIndex({ "category": 1, "price.base": 1 })
db.products.createIndex({ "vendor.id": 1 })
db.products.createIndex({ "createdAt": -1 })
db.products.createIndex({ "verification.blockchain.verified": 1 })
```

#### Redis Configuration

```bash
# Redis configuration for production
redis-cli CONFIG SET maxmemory 8gb
redis-cli CONFIG SET maxmemory-policy allkeys-lru
redis-cli CONFIG SET save "900 1 300 10 60 10000"
```

### Build and Deployment

#### 1. Production Build

```bash
# Install dependencies
npm ci --production

# Run TypeScript type checking
npm run type-check

# Build the application
npm run build

# Start production server
npm run start
```

#### 2. Docker Deployment

**Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --production && npm cache clean --force

# Copy application code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
CMD ["npm", "start"]
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    depends_on:
      - postgres
      - mongodb
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: globalnexus_prod
      POSTGRES_USER: nexus_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  mongodb:
    image: mongo:6.0
    environment:
      MONGO_INITDB_ROOT_USERNAME: nexus_user
      MONGO_INITDB_ROOT_PASSWORD: secure_password
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass secure_password
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  mongodb_data:
  redis_data:
```

#### 3. Nginx Configuration

```nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=global:10m rate=100r/s;

    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name yourdomain.com www.yourdomain.com;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

        # Gzip compression
        gzip on;
        gzip_vary on;
        gzip_types text/plain text/css application/json application/javascript;

        location / {
            limit_req zone=global burst=20 nodelay;
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        location /api/ {
            limit_req zone=api burst=5 nodelay;
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### SSL Certificate Setup

#### Using Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Monitoring and Logging

#### Application Performance Monitoring

```bash
# Install PM2 for process management
npm install pm2 -g

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'globalnexus',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
EOF

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Health Monitoring

```bash
# Create health check script
cat > health-check.sh << 'EOF'
#!/bin/bash
HEALTH_URL="https://yourdomain.com/api/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $RESPONSE != "200" ]; then
    echo "Health check failed: HTTP $RESPONSE"
    # Send alert (email, Slack, etc.)
    exit 1
fi

echo "Health check passed: HTTP $RESPONSE"
EOF

chmod +x health-check.sh

# Add to crontab for regular checks
echo "*/5 * * * * /path/to/health-check.sh" | crontab -
```

### Backup and Recovery

#### Database Backup

```bash
# PostgreSQL backup
pg_dump -h your-postgres-host -U nexus_user -d globalnexus_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# MongoDB backup
mongodump --uri="mongodb://nexus_user:password@your-mongo-host:27017/globalnexus_prod" --out backup_$(date +%Y%m%d_%H%M%S)

# Automated backup script
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# PostgreSQL backup
pg_dump -h your-postgres-host -U nexus_user -d globalnexus_prod > $BACKUP_DIR/postgres.sql

# MongoDB backup
mongodump --uri="mongodb://nexus_user:password@your-mongo-host:27017/globalnexus_prod" --out $BACKUP_DIR/mongodb

# Upload to S3 (optional)
aws s3 sync $BACKUP_DIR s3://your-backup-bucket/$(date +%Y%m%d)/

# Cleanup old backups (keep 30 days)
find /backups -type d -mtime +30 -exec rm -rf {} \;
EOF

chmod +x backup.sh

# Schedule daily backups
echo "0 2 * * * /path/to/backup.sh" | crontab -
```

### Security Configuration

#### Firewall Setup

```bash
# UFW configuration
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

#### API Rate Limiting

```bash
# Install fail2ban for additional protection
sudo apt install fail2ban

# Create jail configuration
sudo cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
action = iptables-multiport[name=ReqLimit, port="http,https", protocol=tcp]
logpath = /var/log/nginx/error.log
maxretry = 10
EOF

sudo systemctl restart fail2ban
```

### Scaling Configuration

#### Horizontal Scaling with Docker Swarm

```yaml
# docker-stack.yml
version: '3.8'

services:
  app:
    image: globalnexus:latest
    ports:
      - "3000:3000"
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '2'
          memory: 4G
        reservations:
          cpus: '1'
          memory: 2G
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
    networks:
      - globalnexus

  loadbalancer:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    deploy:
      replicas: 2
      placement:
        constraints:
          - node.role == manager
    networks:
      - globalnexus

networks:
  globalnexus:
    driver: overlay
```

### Performance Optimization

#### CDN Configuration

```javascript
// next.config.js CDN settings
module.exports = {
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.yourdomain.com' : '',
  images: {
    domains: ['cdn.yourdomain.com', 'your-bucket.s3.amazonaws.com'],
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/your-cloud-name/image/fetch/',
  },
}
```

#### Cache Configuration

```javascript
// Redis cache configuration
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL,
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  }
});
```

### Troubleshooting Guide

#### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **Database Connection Issues**
   ```bash
   # Test database connections
   psql -h your-postgres-host -U nexus_user -d globalnexus_prod -c "SELECT 1;"
   mongo --host your-mongo-host --username nexus_user --password
   redis-cli -h your-redis-host -p 6379 ping
   ```

3. **Memory Issues**
   ```bash
   # Monitor memory usage
   htop
   free -h
   docker stats
   
   # Increase Node.js memory limit
   export NODE_OPTIONS="--max-old-space-size=8192"
   ```

4. **SSL Certificate Issues**
   ```bash
   # Check certificate validity
   openssl x509 -in /etc/nginx/ssl/cert.pem -text -noout
   
   # Renew Let's Encrypt certificate
   sudo certbot renew --dry-run
   ```

### API Testing

#### Health Check Endpoints

```bash
# System health
curl https://yourdomain.com/api/health

# API status
curl https://yourdomain.com/api/

# Database connectivity
curl https://yourdomain.com/api/health/database

# Redis connectivity
curl https://yourdomain.com/api/health/redis
```

#### Load Testing

```bash
# Install Apache Bench
sudo apt install apache2-utils

# Basic load test
ab -n 1000 -c 10 https://yourdomain.com/

# API endpoint test
ab -n 500 -c 5 https://yourdomain.com/api/v1/marketplace/products
```

### Maintenance

#### Regular Maintenance Tasks

```bash
# Weekly maintenance script
cat > maintenance.sh << 'EOF'
#!/bin/bash
echo "Starting maintenance..."

# Update system packages
sudo apt update && sudo apt upgrade -y

# Clean Docker
docker system prune -f

# Optimize databases
psql -h your-postgres-host -U nexus_user -d globalnexus_prod -c "VACUUM ANALYZE;"

# Clear old logs
find /var/log -name "*.log" -mtime +30 -delete

# Restart services
pm2 restart all

echo "Maintenance completed"
EOF

chmod +x maintenance.sh

# Schedule weekly maintenance
echo "0 3 * * 0 /path/to/maintenance.sh" | crontab -
```

### Support Contacts

- **Technical Support**: support@globalnexus.com
- **Emergency Hotline**: +1-800-NEXUS-24
- **Documentation**: https://docs.globalnexus.com
- **Status Page**: https://status.globalnexus.com

---

**Global Nexus Professional Ecommerce Platform v1.0.0**
*Enterprise-ready for the future of commerce*