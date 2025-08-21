import ThemeSelector from '../theme-selector/ui/ThemeSelector';
import * as styles from './header.css';

export default function Header() {
  return (
    <header className={styles.container}>
      {/* left  */}
      <div className={styles.leftContainer}>
        <ThemeSelector />
      </div>

      {/* middle */}
      <div className={styles.middleContainer}>
        <input
          type="text"
          style={{
            width: '100%',
          }}
        ></input>
      </div>

      {/* right */}
      <div className={styles.rightContainer}></div>
    </header>
  );
}
