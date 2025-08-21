// 📁 widgets/theme-selector/ui/ThemeSelector.tsx
'use client';

import * as styles from './theme-selector.css';
// import { CheckIcon, PaletteIcon } from '@/shared/ui/icons';
import { useState } from 'react';
import { HomeIcon } from '@/shared/ui/IconSvg';
import { useTheme } from '@/shared/providers/ThemeProvider';
import { themeTokens } from '@/shared/styles/theme.css';

export default function ThemeSelector() {
  const { theme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)} aria-label="테마 선택">
        {/* <PaletteIcon size={20} /> */}
        <span>테마</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <h3>테마 선택</h3>
          </div>

          <div className={styles.themeList}>
            {availableThemes.map((themeOption: any) => (
              <button
                key={themeOption.key}
                className={styles.themeItem({
                  active: theme === themeOption.key,
                })}
                onClick={() => {
                  setTheme(themeOption.key);
                  setIsOpen(false);
                }}
              >
                <div className={styles.themePreview({ theme: themeOption.key })} />

                <div className={styles.themeInfo}>
                  <span className={styles.themeName}>{themeOption.name}</span>
                  {themeOption.description && (
                    <span className={styles.themeDescription}>{themeOption.description}</span>
                  )}
                </div>

                {theme === themeOption.key && (
                  <HomeIcon size={16} color={themeTokens.colors.primary} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 오버레이 */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}
    </div>
  );
}
