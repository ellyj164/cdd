import React, { createContext, useContext, useState } from 'react';
import { apiService } from '../services/apiService.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Check for default admin credentials first
      const defaultAdmins = [
        { email: 'admin@globalnexus.com', password: 'changeme', username: 'admin' },
        { email: 'admin@marketplace.com', password: 'admin123', username: 'admin' },
        { email: 'admin', password: 'changeme', username: 'admin' }
      ];

      const defaultAdmin = defaultAdmins.find(admin => 
        (admin.email === email || admin.username === email) && admin.password === password
      );

      if (defaultAdmin) {
        const userData = {
          id: 'admin-1',
          email: defaultAdmin.email,
          name: 'Administrator',
          username: defaultAdmin.username,
          user_type: 'admin',
          type: 'admin',
          role: 'admin',
          verified: true,
          created_at: new Date().toISOString()
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', 'default-admin-token');
        return { success: true, user: userData };
      }

      // Call the actual backend API for other users
      const response = await apiService.auth.login({ email, password });
      
      if (response.status === 'success') {
        const userData = {
          ...response.data.user,
          type: response.data.user.user_type
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', response.data.token);
        return { success: true, user: userData };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name, userType = 'customer') => {
    setIsLoading(true);
    try {
      // Call the actual backend API
      const response = await apiService.auth.register({
        email,
        password,
        password_confirmation: password,
        name,
        user_type: userType
      });
      
      if (response.status === 'success') {
        const userData = {
          ...response.data.user,
          type: response.data.user.user_type
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', response.data.token);
        return { success: true, user: userData };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  // Initialize auth state on mount
  React.useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isCustomer: user?.type === 'customer',
    isVendor: user?.type === 'vendor',
    isAdmin: user?.type === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};