// 📁 widgets/theme-selector/ui/ThemeSelector.tsx
'use client';

import * as styles from './theme-selector.css';
import { useState } from 'react';
import { HomeIcon } from '@/shared/ui';
import { useTheme } from '@/shared/providers';
import { themeTokens } from '@/shared/styles';

export default function ThemeSelector() {
  const { theme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* <PaletteIcon size={20} /> */}

      <div className={styles.trigger}>
        <div
          className={styles.themePreview({ theme: theme as any })}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="테마 선택"
        ></div>
      </div>

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
