import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchCurrentUser, logOut as clearSession } from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let active = true;
    fetchCurrentUser()
      .then((currentUser) => { if (active) setUser(currentUser); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setIsChecking(false); });
    return () => { active = false; };
  }, []);

  const startSession = useCallback((_token, sessionUser) => setUser(sessionUser), []);
  const logOut = useCallback(() => clearSession().finally(() => setUser(null)), []);
  const value = useMemo(() => ({ user, isChecking, isAuthenticated: Boolean(user), startSession, logOut }), [user, isChecking, startSession, logOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
