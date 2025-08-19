// styles/theme.css.ts

import { createThemeContract, createTheme } from '@vanilla-extract/css';

export const themeVars = createThemeContract({
  color: {
    primary: null,
    backgroundDark: null,
  },
});

// PurpleTheme
export const purpleTheme = createTheme(themeVars, {
  color: {
    primary: '#611f69',
    backgroundDark: '#350d36',
  },
});

// SkyBlueTheme
export const blueTheme = createTheme(themeVars, {
  color: {
    primary: '#3b82f6',
    backgroundDark: '#1e40af',
  },
});
