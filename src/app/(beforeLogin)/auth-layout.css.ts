import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';
export const container = style({
  display: 'flex',
  minHeight: '100vh',
  fontFamily: 'sans-serif',
  backgroundColor: '#f8f8f8',

  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
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

  '@media': {
    'screen and (max-width: 768px)': {
      flex: 0.5,
    },
  },
});

export const rightSection = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
