import { createContext, useState, useEffect } from 'react';
import { login, register, checkPermission } from 'api/auth';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

const defalutAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defalutAuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      const isValid = await checkPermission(authToken);
      if (isValid) {
        isAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.name,
            email: data.email,
            password: data.password,
          });
          const tempPayload = jwt.decodeed(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decodeed(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            isAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            isAuthenticated(false);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          isAuthenticated(false);
          navigator('/login');
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
