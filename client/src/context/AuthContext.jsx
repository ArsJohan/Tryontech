import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Simula que el usuario NO está autenticado por ahora
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Puedes cambiar esto a true para probar
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);