import { createContext, useState, useEffect } from 'react';
import { getme } from "../services/auth.api";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
  setLoading: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ start with true

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await getme();
        if (res && res.user) {
          setUser(res.user);
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth(); // ✅ THIS IS CRITICAL
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};