import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

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

export const boxStyle = style({
  width: '300px',
  padding: '40px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
});

export const inputStyle = style({
  border: '1px solid #ccc',
  width: '30px',
  height: '40px',
  fontSize: '1.5rem',
  textAlign: 'center',
});

export const buttonStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '10px 2px',
  transition: 'transform 1s ease',
  selectors: {
    '&:hover': {
      transform: 'translateX(5px)',
      cursor: 'pointer',
    },
  },
});
