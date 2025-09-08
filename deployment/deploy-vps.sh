#!/bin/bash

# Multi-Vendor Marketplace VPS Deployment Script
# This script automates the deployment of the marketplace on a VPS

set -e

echo "🚀 Starting Multi-Vendor Marketplace Deployment..."

# Configuration
PROJECT_NAME="ecod-marketplace"
DOMAIN=${1:-"your-domain.com"}
EMAIL=${2:-"admin@your-domain.com"}
ENVIRONMENT=${3:-"production"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    error "Please run this script as root (use sudo)"
fi

log "Updating system packages..."
apt update && apt upgrade -y

log "Installing required packages..."
apt install -y curl wget git vim htop ufw fail2ban nginx certbot python3-certbot-nginx

# Install Docker
log "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker www-data
    rm get-docker.sh
fi

# Install Docker Compose
log "Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Configure firewall
log "Configuring firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Create project directory
PROJECT_DIR="/opt/${PROJECT_NAME}"
log "Creating project directory: ${PROJECT_DIR}"
mkdir -p ${PROJECT_DIR}
cd ${PROJECT_DIR}

# Clone or update repository
if [ -d ".git" ]; then
    log "Updating existing repository..."
    git pull origin main
else
    log "Cloning repository..."
    git clone https://github.com/ellyj1/ecod.git .
fi

# Create environment file
log "Creating environment configuration..."
cp .env.example .env

# Generate secure passwords
DB_PASSWORD=$(openssl rand -base64 32)
REDIS_PASSWORD=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 64)

# Update environment file
sed -i "s/secure_password_change_in_production/${DB_PASSWORD}/g" .env
sed -i "s/secure_redis_password_change_in_production/${REDIS_PASSWORD}/g" .env
sed -i "s/your-super-secret-jwt-key-change-in-production/${JWT_SECRET}/g" .env
sed -i "s/NODE_ENV=development/NODE_ENV=production/g" .env
sed -i "s/localhost:3001/https:\/\/${DOMAIN}/g" .env

log "Building and starting services..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
log "Waiting for services to start..."
sleep 30

# Check service health
log "Checking service health..."
for service in postgres redis backend frontend; do
    if docker-compose ps | grep -q "$service.*Up"; then
        log "✅ $service is running"
    else
        warn "⚠️  $service might have issues"
    fi
done

# Configure SSL with Let's Encrypt
if [ "$DOMAIN" != "your-domain.com" ]; then
    log "Configuring SSL certificate for ${DOMAIN}..."
    certbot --nginx -d ${DOMAIN} --non-interactive --agree-tos --email ${EMAIL}
    
    # Setup auto-renewal
    (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
fi

# Create backup script
log "Creating backup script..."
cat > /opt/backup-marketplace.sh << 'EOF'
#!/bin/bash
# Automated backup script for marketplace

BACKUP_DIR="/backups/marketplace"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p ${BACKUP_DIR}

# Backup database
docker-compose exec -T postgres pg_dump -U nexus_user globalnexus_prod > ${BACKUP_DIR}/db_backup_${DATE}.sql

# Backup uploads
tar -czf ${BACKUP_DIR}/uploads_backup_${DATE}.tar.gz uploads/

# Cleanup old backups (keep last 7 days)
find ${BACKUP_DIR} -name "*.sql" -mtime +7 -delete
find ${BACKUP_DIR} -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: ${DATE}"
EOF

chmod +x /opt/backup-marketplace.sh

# Schedule daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/backup-marketplace.sh") | crontab -

# Create update script
log "Creating update script..."
cat > /opt/update-marketplace.sh << 'EOF'
#!/bin/bash
# Update script for marketplace

cd /opt/ecod-marketplace

echo "🔄 Updating marketplace..."

# Pull latest changes
git pull origin main

# Rebuild and restart services
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo "✅ Update completed"
EOF

chmod +x /opt/update-marketplace.sh

# Display completion message
log "🎉 Deployment completed successfully!"
echo
echo -e "${BLUE}📊 Service URLs:${NC}"
echo -e "Frontend: http://${DOMAIN}"
echo -e "Backend API: http://${DOMAIN}/api/v1"
echo -e "API Documentation: http://${DOMAIN}/api/docs"
echo
echo -e "${BLUE}🔐 Default Admin Credentials:${NC}"
echo -e "Email: admin@globalnexus.com"
echo -e "Password: admin123"
echo -e "${RED}⚠️  Please change the admin password immediately!${NC}"
echo
echo -e "${BLUE}📁 Important Files:${NC}"
echo -e "Project Directory: ${PROJECT_DIR}"
echo -e "Environment File: ${PROJECT_DIR}/.env"
echo -e "Backup Script: /opt/backup-marketplace.sh"
echo -e "Update Script: /opt/update-marketplace.sh"
echo
echo -e "${BLUE}🛠️  Management Commands:${NC}"
echo -e "View logs: cd ${PROJECT_DIR} && docker-compose logs -f"
echo -e "Restart services: cd ${PROJECT_DIR} && docker-compose restart"
echo -e "Update application: /opt/update-marketplace.sh"
echo -e "Backup data: /opt/backup-marketplace.sh"
echo
echo -e "${GREEN}✅ Your multi-vendor marketplace is now live!${NC}"