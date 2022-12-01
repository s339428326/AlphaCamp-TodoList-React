import { createContext, useState } from 'react';
import { login, register } from 'api/auth';
import * as jwt from 'jsonwebtoken';

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
