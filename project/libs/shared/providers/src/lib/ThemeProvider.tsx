import { PropsWithChildren, useMemo, useState } from 'react';
import {
  LOCAL_STORAGE_KEY,
  Theme,
  ThemeContext,
} from '../../../theme/ThemeContext';

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_KEY) as Theme) || Theme.LIGHT;
const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme],
  );
  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
