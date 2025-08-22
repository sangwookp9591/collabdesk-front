import { style } from '@vanilla-extract/css';
import { themeTokens } from '@/shared/styles/theme.css';

export const titleContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const boxContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2px 2px',
  borderRadius: '10px',
  border: `3px solid ${themeTokens.colors.primary}`,
  cursor: 'pointer',
  transition: 'transform 0.1s ease',
  selectors: {
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
});

export const workspaceList = style({
  width: '360px',
  padding: '24px',
  backgroundColor: themeTokens.colors.background,
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  maxHeight: '300px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  scrollbarWidth: 'thin',
  scrollbarColor: themeTokens.colors.primary,
  '::-webkit-scrollbar': {
    width: '8px',
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
});

export const workspaceContainer = style({
  selectors: {
    '&:hover': {
      backgroundColor: themeTokens.colors.backgroundActive,
      transform: 'translateX(5px)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
    },
  },
});
