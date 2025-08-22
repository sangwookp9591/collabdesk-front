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

export const skeletonContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
});

export const workspaceContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  selectors: {
    '&:hover': {
      backgroundColor: themeTokens.colors.backgroundActive,
      transform: 'translateX(5px)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
    },
  },
});

export const workspaceInfo = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '4px',
});

export const workspaceName = style({
  fontSize: '1rem',
  fontWeight: 600,
  color: themeTokens.colors.text,
});

export const workspaceMemberCount = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '0.85rem',
  fontWeight: 800,
  color: themeTokens.colors.text,
});
