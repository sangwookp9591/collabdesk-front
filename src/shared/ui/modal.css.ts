import { style } from '@vanilla-extract/css';
import { themeTokens } from '@/shared/styles/theme.css';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
});

export const modal = style({
  backgroundColor: themeTokens.colors.background,
  borderRadius: '12px',
  padding: '24px',
  minWidth: '300px',
  maxWidth: '90%',
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
});
