import ThemeSelector from '../theme-selector/ui/ThemeSelector';
import * as styles from './header.css';

export default function Header() {
  return (
    <header className={styles.container}>
      <ThemeSelector />
    </header>
  );
}
