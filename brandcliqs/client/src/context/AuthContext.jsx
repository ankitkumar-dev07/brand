import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import api from '../services/api';

const C = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/auth/me')
      .then((r) => setUser(r.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (d) => {
    const r = await api.post('/auth/login', d);

    setUser(r.data.user);

    return r.data;
  };

  const register = async (d) => {
    const r = await api.post('/auth/register', d);

    setUser(r.data.user);

    return r.data;
  };

  const logout = async () => {
    await api.post('/auth/logout');

    setUser(null);
  };

  return (
    <C.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </C.Provider>
  );
}

export const useAuth = () => useContext(C);