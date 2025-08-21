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

export const formStyle = style({
  width: '300px',
  padding: '40px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
});

export const inputStyle = style({
  padding: '10px',
  marginBottom: '20px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  outline: 'none',
  fontSize: '1rem',
});

export const buttonStyle = style({
  padding: '10px',
  backgroundColor: themeTokens.colors.button.background,
  color: themeTokens.colors.textSecondary,
  textAlign: 'center',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
});
