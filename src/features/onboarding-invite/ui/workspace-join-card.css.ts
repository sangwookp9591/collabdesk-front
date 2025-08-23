import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const boxStyle = style({
  width: '300px',
  padding: '40px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const workspaceStyle = style({
  padding: '10px 10px',
  borderRadius: '8px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
});

export const inputStyle = style({
  border: '1px solid #ccc',
  width: '30px',
  height: '40px',
  fontSize: '1.5rem',
  textAlign: 'center',
});

export const buttonStyle = style({
  padding: '10px',
  backgroundColor: themeTokens.colors.button.background,
  color: 'white',
  textAlign: 'center',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
});
