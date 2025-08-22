import { style } from '@vanilla-extract/css';

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
