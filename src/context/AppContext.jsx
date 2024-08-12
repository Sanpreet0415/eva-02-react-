import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedAuth = localStorage.getItem("isAuthenticated");
    if (savedTheme) setTheme(savedTheme);
    if (savedAuth) setIsAuthenticated(JSON.parse(savedAuth));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AppContext.Provider value={{ theme, setTheme, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return React.useContext(AppContext);
}
