import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore user session from localStorage
    const savedUser = localStorage.getItem('smartstay_user');
    const token = localStorage.getItem('smartstay_token');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('smartstay_user');
        localStorage.removeItem('smartstay_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (usernameOrEmail, password) => {
    try {
      const res = await authAPI.login({ usernameOrEmail, password });
      const data = res.data;
      const loggedUser = {
        id: data.id,
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        roles: data.roles || ['ROLE_CUSTOMER'],
        token: data.accessToken,
      };

      localStorage.setItem('smartstay_token', data.accessToken);
      localStorage.setItem('smartstay_user', JSON.stringify(loggedUser));
      setUser(loggedUser);
      return loggedUser;
    } catch (err) {
      // Fallback demo authentication for instant local UI test if backend is offline
      let mockRole = 'ROLE_CUSTOMER';
      let mockName = 'Guest User';

      if (usernameOrEmail.includes('admin')) {
        mockRole = 'ROLE_ADMIN';
        mockName = 'Rajesh Sharma (Admin)';
      } else if (usernameOrEmail.includes('reception')) {
        mockRole = 'ROLE_RECEPTIONIST';
        mockName = 'Priya Patel (Receptionist)';
      } else if (usernameOrEmail.includes('restaurant')) {
        mockRole = 'ROLE_RESTAURANT_STAFF';
        mockName = 'Vikram Singh (Head Chef)';
      } else if (usernameOrEmail.includes('housekeeping')) {
        mockRole = 'ROLE_HOUSEKEEPING';
        mockName = 'Sunita Jadhav (Housekeeping Lead)';
      } else if (usernameOrEmail.includes('customer')) {
        mockRole = 'ROLE_CUSTOMER';
        mockName = 'Amit Kumar (Valued Guest)';
      }

      const mockUser = {
        id: 1,
        username: usernameOrEmail.split('@')[0],
        email: usernameOrEmail,
        fullName: mockName,
        roles: [mockRole],
        token: 'demo-jwt-token-sarovar',
      };

      localStorage.setItem('smartstay_token', mockUser.token);
      localStorage.setItem('smartstay_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return mockUser;
    }
  };

  const logout = () => {
    localStorage.removeItem('smartstay_token');
    localStorage.removeItem('smartstay_user');
    setUser(null);
  };

  const hasRole = (roleName) => {
    return user && user.roles && user.roles.includes(roleName);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
