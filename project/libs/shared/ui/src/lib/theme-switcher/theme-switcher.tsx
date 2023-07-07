import { useTheme } from '@project/shared/hooks';
import { Button } from '../button/button';
import { Theme } from '../../../../theme/ThemeContext';
import { MaterialIcon } from '../icons/material-icon';
import styles from './theme-switcher.module.scss';

/* eslint-disable-next-line */
export interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button className={styles.themeSwitcher} onClick={toggleTheme}>
      {theme === Theme.DARK ? (
        <MaterialIcon name={'MdOutlineModeNight'} />
      ) : (
        <MaterialIcon name={'MdOutlineWbSunny'} />
      )}
    </Button>
  );
}

export default ThemeSwitcher;
