-- Initialize database with required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- Create indexes for better performance
-- These will be created automatically by TypeORM, but we can add additional ones here if needed

-- Insert initial admin user (password: admin123)
-- Note: In production, this should be done securely
INSERT INTO users (id, email, password, name, role, "accountType", "isActive", "emailVerified", "createdAt", "updatedAt") 
VALUES (
    'admin-user-id', 
    'admin@globalnexus.com',
    '$2b$10$xqKS6V8Jl5c8KU8rT9Y2m.XLZq8QK5S8CQ2rM7G6V9W2D4P8T6S2G', -- bcrypt hash for 'admin123'
    'System Administrator',
    'admin',
    'individual',
    true,
    true,
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;