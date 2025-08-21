import { PrevIcon, NextIcon, HelpIcon, SearchIcon } from '@/shared/ui';
import * as styles from './header.css';
import { themeTokens } from '@/shared/styles/theme.css';
import { ThemeSelector } from '@/widgets/theme-selector';
import LogoutButton from '@/features/auth/ui/LogoutButton';

export default function Header() {
  return (
    <header className={styles.container}>
      {/* left  */}
      <div className={styles.leftContainer}>
        <ThemeSelector />
        <div className={styles.historyControls}>
          <PrevIcon size={20} />
          <NextIcon size={20} />
        </div>
      </div>

      {/* middle */}
      <div className={styles.middleContainer}>
        <input type="text" className={styles.searchBar}></input>
        <div className={styles.searchIcon}>
          <SearchIcon size={20} color={themeTokens.colors.textSecondary} />
        </div>
      </div>

      {/* right */}
      <div className={styles.rightContainer}>
        <LogoutButton />
        <HelpIcon size={20} />
      </div>
    </header>
  );
}
