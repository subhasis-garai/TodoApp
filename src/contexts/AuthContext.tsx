import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getData, storeData, removeData } from '../utils/storage';
import { AUTH_CREDENTIALS } from '../constants/auth';
import { AuthContextType } from '../types/AuthContextType';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await getData('user');
      if (user) setIsLoggedIn(true);
    };
    checkLogin();
  }, []);

  const login = async () => {
    await storeData('user', { username: AUTH_CREDENTIALS.USERNAME });
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await removeData('user');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// };
