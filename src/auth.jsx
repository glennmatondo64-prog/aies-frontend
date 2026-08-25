import { createContext, useContext, useState, useEffect } from 'react';
import { api } from './api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On load, if we have a token, fetch the current user.
  useEffect(() => {
    const token = localStorage.getItem('aies_token');
    if (!token) { setLoading(false); return; }
    api.get('/auth/me')
      .then((res) => setUser(res.user))
      .catch(() => localStorage.removeItem('aies_token'))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password }, { auth: false });
    localStorage.setItem('aies_token', res.token);
    setUser(res.user);
    return res.user;
  }

  async function register(payload) {
    const res = await api.post('/auth/register', payload, { auth: false });
    localStorage.setItem('aies_token', res.token);
    setUser(res.user);
    return res.user;
  }

  function logout() {
    localStorage.removeItem('aies_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
