import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import authService from '@/api/authService';
import { STORAGE_KEYS } from '@/constants/app';
import { DEMO_USER } from '@/data/mock/user';

const AuthContext = createContext(null);

const DEMO_ACCESS_TOKEN = 'demo-access-token-ks-2026';
const DEMO_REFRESH_TOKEN = 'demo-refresh-token-ks-2026';

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.user);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function seedDemoSession() {
  try {
    if (!localStorage.getItem(STORAGE_KEYS.token)) {
      localStorage.setItem(STORAGE_KEYS.token, DEMO_ACCESS_TOKEN);
      localStorage.setItem(STORAGE_KEYS.refreshToken, DEMO_REFRESH_TOKEN);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(DEMO_USER));
      return { token: DEMO_ACCESS_TOKEN, user: DEMO_USER };
    }
    const user = readStoredUser();
    return { token: localStorage.getItem(STORAGE_KEYS.token), user: user || DEMO_USER };
  } catch {
    return { token: DEMO_ACCESS_TOKEN, user: DEMO_USER };
  }
}

export function AuthProvider({ children }) {
  const [session] = useState(() => seedDemoSession());
  const [user, setUser] = useState(session.user);
  const [token, setToken] = useState(session.token);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitializing(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const persistSession = useCallback((session) => {
    localStorage.setItem(STORAGE_KEYS.token, session.accessToken);
    localStorage.setItem(STORAGE_KEYS.refreshToken, session.refreshToken);
    const profile = session.user || DEMO_USER;
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(profile));
    setToken(session.accessToken);
    setUser(profile);
  }, []);

  const login = useCallback(
    async (credentials) => {
      const session = await authService.login(credentials);
      persistSession(session);
      return session;
    },
    [persistSession]
  );

  const register = useCallback((payload) => authService.register(payload), []);

  const verifyOtp = useCallback(
    async (payload) => {
      const session = await authService.verifyOtp(payload);
      persistSession(session);
      return session;
    },
    [persistSession]
  );

  const resendOtp = useCallback((payload) => authService.resendOtp(payload), []);

  const forgotPassword = useCallback((payload) => authService.forgotPassword(payload), []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // ignore network errors during logout
    } finally {
      localStorage.removeItem(STORAGE_KEYS.token);
      localStorage.removeItem(STORAGE_KEYS.refreshToken);
      localStorage.removeItem(STORAGE_KEYS.user);
      setToken(null);
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      initializing,
      login,
      register,
      verifyOtp,
      resendOtp,
      forgotPassword,
      logout,
    }),
    [user, token, initializing, login, register, verifyOtp, resendOtp, forgotPassword, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}