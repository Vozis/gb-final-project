import { useContext } from 'react';
import {
  LOCAL_STORAGE_KEY,
  Theme,
  ThemeContext,
} from '../../../theme/ThemeContext';

interface UseThemeResult {
  toggleTheme: () => void;
  theme?: Theme;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme?.(newTheme);
    document.body.className = newTheme;
    localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
  };
  return { theme, toggleTheme };
};
