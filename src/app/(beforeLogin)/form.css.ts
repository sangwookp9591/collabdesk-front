import { themeVars } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const formStyle = style({
  width: '300px',
  padding: '40px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
});

export const labelStyle = style({
  marginBottom: '8px',
  fontWeight: 'bold',
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
  backgroundColor: themeVars.color.primary,
  color: 'white',
  textAlign: 'center',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
});

export const profileWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
});

export const profileImage = style({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover',
});
