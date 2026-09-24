import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { loginUser, registerUser } from '../api/authApi';

const AuthContext = createContext(null);

function readTokenClaims(token) {
  try {
    const payload = token?.split('.')[1];
    return payload ? JSON.parse(window.atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) : {};
  } catch {
    return {};
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));

  const persist = (nextToken, nextUser) => {
    if (nextToken) localStorage.setItem('auth_token', nextToken);
    if (nextUser) localStorage.setItem('auth_user', JSON.stringify(nextUser));
    setToken(nextToken || null);
    setUser(nextUser || null);
  };

  const login = useCallback(async (credentials) => {
    const res = await loginUser(credentials);
    // Backend response shape may vary; handle common conventions defensively.
    const nextToken = res.token || res.accessToken || res.data?.token || null;
    const claims = readTokenClaims(nextToken);
    const nextUser = { ...claims, ...(res.user || res.data?.user || {}), mobile: credentials.mobile };
    persist(nextToken, nextUser);
    return res;
  }, []);

  const register = useCallback(async (payload) => {
    const res = await registerUser(payload);
    return res;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token), login, register, logout }),
    [user, token, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
