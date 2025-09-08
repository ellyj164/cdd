# Default Admin Credentials

## Admin Dashboard Access

For development and initial setup, the following default admin credentials are available:

### Default Admin Account
- **Username**: `admin`
- **Email**: `admin@globalnexus.com`
- **Password**: `changeme`

### Alternative Admin Account  
- **Username**: `admin@marketplace.com`
- **Password**: `admin123`

### Security Notice
⚠️ **IMPORTANT**: Change these default passwords immediately after first login in production!

## Quick Access
1. Navigate to `/admin/dashboard` or `/login`
2. Use the credentials above to sign in
3. You'll be redirected to the admin dashboard
4. Go to "Homepage" tab to manage homepage layout
5. Go to "Categories" tab to manage the 50+ product categories

## Features Available
- **Homepage Layout Manager**: Configure Amazon-style homepage sections
- **Category Manager**: Manage 50+ product categories
- **User Management**: Manage customers and vendors
- **Product Moderation**: Review and approve products
- **Analytics**: View platform statistics

## Development Setup
The admin credentials are automatically seeded during development. In production, ensure proper user authentication and authorization systems are in place.

### API Authentication
The system uses JWT tokens for authentication. Default admin users are pre-configured in the authentication service.