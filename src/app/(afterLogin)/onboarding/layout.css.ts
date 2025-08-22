import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  fontFamily: 'sans-serif',
  backgroundColor: '#f8f8f8',
});

export const hedaer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  backgroundColor: themeTokens.colors.primary,
});

export const mainContainer = style({
  display: 'flex',
  flex: 1,
});

export const leftSection = style({
  flex: 1,
  backgroundColor: themeTokens.colors.primary,
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
});

export const rightSection = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
