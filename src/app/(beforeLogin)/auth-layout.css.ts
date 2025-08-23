import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';
export const container = style({
  display: 'flex',
  minHeight: '100vh',
  fontFamily: 'sans-serif',
  backgroundColor: '#f8f8f8',
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
