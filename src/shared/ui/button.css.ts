import { style, styleVariants } from '@vanilla-extract/css';

import { themeTokens } from '../styles';

export const button = style({
  padding: '8px 16px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: themeTokens.colors.button.background,
  color: themeTokens.colors.textSecondary,
  cursor: 'pointer',
});

const baseButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'all 0.2s ease-in-out',

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const customButton = styleVariants({
  primary: [
    baseButton,
    {
      backgroundColor: '#007acc',
      color: '#ffffff',

      ':hover': {
        backgroundColor: '#005a9e',
      },
    },
  ],
  secondary: [
    baseButton,
    {
      backgroundColor: '#f5f5f5',
      color: '#1a1a1a',

      ':hover': {
        backgroundColor: '#e5e5e5',
      },
    },
  ],
  ghost: [
    baseButton,
    {
      backgroundColor: 'transparent',
      color: '#007acc',

      ':hover': {
        backgroundColor: '#f0f8ff',
      },
    },
  ],
});
