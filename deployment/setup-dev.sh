#!/bin/bash

# Development Setup Script
# Sets up the development environment for the marketplace

set -e

echo "🚀 Setting up Multi-Vendor Marketplace Development Environment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

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

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    error "Docker is not installed. Please install Docker first."
fi

if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose is not installed. Please install Docker Compose first."
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    warn "Node.js is not installed. Installing via Node Version Manager..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install --lts
    nvm use --lts
fi

log "Creating development environment file..."
if [ ! -f .env ]; then
    cp .env.example .env
    log "✅ Environment file created. Please update it with your configuration."
else
    warn "Environment file already exists. Skipping..."
fi

log "Installing frontend dependencies..."
npm install

log "Installing backend dependencies..."
cd backend
npm install
cd ..

log "Starting development databases..."
docker-compose up -d postgres redis

# Wait for databases to be ready
log "Waiting for databases to start..."
sleep 10

# Check if databases are ready
for i in {1..30}; do
    if docker-compose exec postgres pg_isready -U nexus_user > /dev/null 2>&1; then
        log "✅ PostgreSQL is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        error "PostgreSQL failed to start"
    fi
    sleep 1
done

log "Building backend..."
cd backend
npm run build
cd ..

log "🎉 Development environment setup completed!"
echo
echo -e "${GREEN}📊 Available Commands:${NC}"
echo
echo -e "${YELLOW}Frontend Development:${NC}"
echo -e "  npm run dev              # Start Next.js dev server"
echo -e "  npm run build            # Build for production"
echo -e "  npm run start            # Start production server"
echo
echo -e "${YELLOW}Backend Development:${NC}"
echo -e "  cd backend && npm run start:dev    # Start Nest.js dev server"
echo -e "  cd backend && npm run build       # Build backend"
echo -e "  cd backend && npm run test        # Run tests"
echo
echo -e "${YELLOW}Database Management:${NC}"
echo -e "  docker-compose up -d postgres redis    # Start databases"
echo -e "  docker-compose down                    # Stop all services"
echo -e "  docker-compose logs postgres           # View database logs"
echo
echo -e "${GREEN}🌐 Development URLs:${NC}"
echo -e "Frontend: http://localhost:3000"
echo -e "Backend API: http://localhost:3001/api/v1"
echo -e "API Documentation: http://localhost:3001/api/docs"
echo
echo -e "${GREEN}🗄️  Database Connection:${NC}"
echo -e "Host: localhost"
echo -e "Port: 5432"
echo -e "Database: globalnexus_prod"
echo -e "Username: nexus_user"
echo -e "Password: (check your .env file)"