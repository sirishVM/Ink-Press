'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, DEMO_USERS, getStoredUser, saveStoredUser } from '@/lib/store';

type AuthContextType = {
  user: User | null;
  login: (identifier: string, password?: string) => Promise<boolean>;
  loginAsDemo: (index?: number) => void;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = getStoredUser();
    setUser(saved);
    setLoading(false);
  }, []);

  const login = async (identifier: string, password?: string): Promise<boolean> => {
    setLoading(true);
    // Find matching demo user or create session
    const matched = DEMO_USERS.find(
      u => u.email.toLowerCase() === identifier.toLowerCase() || u.handle.toLowerCase() === identifier.toLowerCase()
    );
    const activeUser = matched || {
      id: 'usr_' + Math.random().toString(36).substring(2, 8),
      name: identifier.split('@')[0],
      email: identifier.includes('@') ? identifier : `${identifier}@press.dev`,
      handle: '@' + identifier.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, ''),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Independent Writer & Contributor on Ink & Press.',
      role: 'Author' as const
    };
    setUser(activeUser);
    saveStoredUser(activeUser);
    setLoading(false);
    return true;
  };

  const loginAsDemo = (index: number = 0) => {
    const demo = DEMO_USERS[index] || DEMO_USERS[0];
    setUser(demo);
    saveStoredUser(demo);
  };

  const register = async (name: string, email: string, password?: string): Promise<boolean> => {
    setLoading(true);
    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 8),
      name: name.trim(),
      email: email.trim(),
      handle: '@' + name.toLowerCase().replace(/\s+/g, ''),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      bio: 'Author & Contributor on Ink & Press.',
      role: 'Author'
    };
    setUser(newUser);
    saveStoredUser(newUser);
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    saveStoredUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsDemo, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
