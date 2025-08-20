import { style } from '@vanilla-extract/css';
export const item = style({
  display: 'flex',
  gap: '5px',
  color: '#ffffff',
  borderRadius: '15px',
  textDecoration: 'none',
  textAlign: 'center',
  padding: '5px 10px',
  lineHeight: '24px',

  transition: 'background-color 0.3s ease, color 0.3s ease',
});

export const activeItem = style([
  item,
  {
    color: 'rgba(57,6,58, 1)',
    backgroundColor: 'rgba(249,237,255, 1)',
  },
]);
