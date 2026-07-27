"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export type Theme =
  | "default"
  | "purple"
  | "green"
  | "orange"
  | "blue"
  | "rose";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "theme";

export function ThemeProvider({
    children,
  }: {
    children: ReactNode;
  }) {
  
    const [theme, setThemeState] = useState<Theme>("default");
    useEffect(() => {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved) {
        setThemeState(saved);
        document.documentElement.dataset.theme = saved;
      } else {
        document.documentElement.dataset.theme = "default";
      }
    }, []);
  
    const setTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
      document.documentElement.dataset.theme = newTheme;
      localStorage.setItem(STORAGE_KEY, newTheme);
    };
  
    const value = useMemo(
      () => ({
        theme,
        setTheme,
      }),
      [theme]
    );
  
    return (
      <ThemeContext.Provider value={value}>
        <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </NextThemeProvider>
      </ThemeContext.Provider>
  
    );
  
  }
  
  export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useTheme must be used inside ThemeProvider");
    }
    return context;
  
  }