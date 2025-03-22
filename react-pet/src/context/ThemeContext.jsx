
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context object for theme
const ThemeContext = createContext();


export const useTheme = () => {
  return useContext(ThemeContext);
};

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  //  BUTTON for changing the theme
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // APPlYING dark or light class to body DEPENDING ON TOGGLE
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
