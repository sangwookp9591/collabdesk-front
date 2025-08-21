import { themeTokens } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  height: '40px',
  flexShrink: 0,
  backgroundColor: themeTokens.colors.backgroundSecondary,
});

export const leftContainer = style({
  display: 'flex',
  flex: '1 0 auto',
  justifyContent: 'flex-start',
});

export const middleContainer = style({
  display: 'flex',
  flex: '2 1 0',
  minWidth: '280px',
  maxWidth: '1000px',
  height: '100%',
  justifyContent: 'center',
});

export const rightContainer = style({
  display: 'flex',
  flex: '1 0 auto',
});
