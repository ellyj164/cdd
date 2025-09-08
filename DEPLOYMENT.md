# Deployment Instructions

## Production Deployment to public_html

This guide explains how to deploy the React e-commerce application to a webmin hosting environment.

### Prerequisites

- Web hosting with PHP 7.4+ support
- MariaDB/MySQL database
- Apache with mod_rewrite enabled
- SSL certificate (recommended)

### Deployment Steps

1. **Build the React Application**
   ```bash
   npm install
   npm run build
   ```

2. **Upload Files to Server**
   - Upload ALL files from the project root to `/home/duns1/public_html/`
   - Ensure the `dist/` folder contents are accessible
   - Upload the `backend/` directory
   - Upload the `.htaccess` file for proper routing

3. **Database Setup**
   - Create a MariaDB/MySQL database
   - Import the schema from `backend/database/schema.sql`
   - Update database credentials in `backend/.env`

4. **Configure Backend**
   - Copy `backend/.env.example` to `backend/.env`
   - Update the following in `backend/.env`:
     ```
     DB_HOST=localhost
     DB_NAME=your_database_name
     DB_USER=your_database_user
     DB_PASS=your_database_password
     
     APP_URL=https://yourdomain.com
     JWT_SECRET=your-secure-random-key
     
     # Email settings (optional)
     SMTP_HOST=your_smtp_host
     SMTP_USER=your_email
     SMTP_PASS=your_email_password
     ```

5. **Set File Permissions**
   ```bash
   chmod 755 backend/
   chmod 644 backend/.env
   chmod 755 backend/uploads/
   ```

6. **Test the Installation**
   - Visit `https://yourdomain.com` to test the frontend
   - Visit `https://yourdomain.com/backend/health` to test the API
   - Try registering a new account to test the full flow

### Features Included

✅ **Complete Authentication System**
- User registration with email verification
- Secure login/logout
- Password reset functionality
- JWT token-based authentication

✅ **All Required Pages Created**
- Shipping Information (`/shipping`)
- Returns & Exchanges (`/returns`)
- Size Guide (`/size-guide`)
- Track Your Order (`/track-order`)
- Careers (`/careers`)
- Blog (`/blog`)
- Press (`/press`)
- Affiliate Program (`/affiliate`)
- Gift Cards (`/gift-cards`)
- Privacy Policy (`/privacy-policy`)
- Terms of Service (`/terms-of-service`)
- Cookie Policy (`/cookie-policy`)
- Accessibility (`/accessibility`)
- Email Verification (`/verify-email`)

✅ **Backend Integration**
- PHP backend with RESTful API
- MariaDB database support
- Comprehensive user management
- Product and order management
- Email system integration
- Security features (rate limiting, validation)

✅ **Production Ready**
- Optimized build for production
- Proper routing configuration
- Security headers
- Asset compression
- Error handling

### API Endpoints

The backend provides the following API endpoints:

- `POST /backend/auth/register` - User registration
- `POST /backend/auth/login` - User login
- `POST /backend/auth/verify-email` - Email verification
- `GET /backend/products` - Get products
- `POST /backend/cart/add` - Add to cart
- `POST /backend/orders` - Create order
- And many more...

### Troubleshooting

**404 Errors on Authentication:**
- Check that the backend `.env` file is configured
- Verify database connection
- Ensure the `backend/` directory is uploaded
- Check PHP error logs

**Frontend Routing Issues:**
- Ensure `.htaccess` file is uploaded and mod_rewrite is enabled
- Check that all build files are in the correct location

**Database Issues:**
- Verify database credentials in `backend/.env`
- Ensure the database schema is imported
- Check database user permissions

### Support

For deployment assistance:
- Check the backend logs in `backend/logs/`
- Review PHP error logs
- Test API endpoints individually
- Verify file permissions and ownership

The application is now ready for production use with all features working correctly!