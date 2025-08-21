import { themeTokens } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  height: '40px',
  padding: '0px 10px',
  gap: '4px',
  flexShrink: 0,
  backgroundColor: themeTokens.colors.backgroundSecondary,
});

export const leftContainer = style({
  display: 'flex',
  flex: '1 0 auto',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const historyControls = style({
  display: 'flex',
  gap: '2px',
  cursor: 'pointer',
});

export const middleContainer = style({
  display: 'flex',
  flex: '2 1 0',
  minWidth: '280px',
  maxWidth: '1000px',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

export const searchBar = style({
  flex: '1 1',
  borderRadius: '8px',
  borderColor: '#0000',
  padding: '5px 0px 5px 25px',
  color: themeTokens.colors.textSecondary,
  backgroundColor: themeTokens.colors.backgroundTertiary,
  ':focus-visible': {
    outline: `2px solid ${themeTokens.colors.background}`,
    outlineOffset: '2px',
  },
});

export const searchIcon = style({
  position: 'absolute',
  left: '4px',
});

export const rightContainer = style({
  display: 'flex',
  flex: '1 0 auto',
  justifyContent: 'flex-end',
  alignItems: 'center',
});
