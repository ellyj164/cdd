# MySQL Database Setup for E-commerce Platform

This directory contains the MySQL database schema and setup instructions for the e-commerce marketplace platform.

## Database Configuration

- **Database Name**: `marked`
- **Username**: `duns1`
- **Password**: `Tumukunde`
- **Host**: `localhost`
- **Port**: `3306`

## Setup Instructions

### 1. Install MySQL/MariaDB

```bash
# On Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# On CentOS/RHEL
sudo yum install mysql-server

# Start the service
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 2. Create Database and User

```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create database
CREATE DATABASE marked CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'duns1'@'localhost' IDENTIFIED BY 'Tumukunde';
GRANT ALL PRIVILEGES ON marked.* TO 'duns1'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
exit;
```

### 3. Import Database Schema

```bash
# Import the schema
mysql -u duns1 -p marked < mysql_schema.sql
```

### 4. Verify Installation

```sql
-- Connect as the new user
mysql -u duns1 -p marked

-- Check tables
SHOW TABLES;

-- Check sample data
SELECT * FROM categories;
SELECT * FROM users WHERE role = 'admin';

-- Exit
exit;
```

## Database Schema Overview

### Core Tables

1. **users** - User accounts (customers, vendors, admins)
2. **vendors** - Vendor business profiles
3. **products** - Product catalog
4. **orders** - Order management
5. **order_items** - Order line items
6. **categories** - Product categorization
7. **reviews** - Product reviews and ratings
8. **wishlists** - User wishlists
9. **cart_items** - Shopping cart items

### Additional Tables

- **coupons** - Discount codes and promotions
- **user_addresses** - Customer addresses
- **notifications** - System notifications

### Default Data

- 10 main product categories pre-populated
- Default admin user: `admin@globalnexus.com` (password needs to be set properly)

## Environment Variables

Update your backend `.env` file:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=marked
DB_USERNAME=duns1
DB_PASSWORD=Tumukunde
```

## Production Deployment

For production deployment on `http://5.189.180.149/` (duns1.fezalogistics.com):

1. Ensure MySQL is installed and configured
2. Import the schema on the production server
3. Update the backend environment variables
4. Configure domain DNS to point to the server
5. Set up SSL certificates for HTTPS

## Backup and Maintenance

### Backup Database

```bash
mysqldump -u duns1 -p marked > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Regular Maintenance

- Monitor database performance
- Keep MySQL updated
- Regular backups
- Index optimization as needed

## Security Notes

- Change default passwords in production
- Use SSL connections for production
- Restrict database access to application servers only
- Regular security updates