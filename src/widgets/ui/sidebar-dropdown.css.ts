import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  color: 'white',
});

export const title = style({
  display: 'flex',
  fontWeight: 'bold',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
});

export const dropdownIcon = recipe({
  base: {
    transform: 'rotate(0deg)',
    transition: 'transform 1s ease',
  },
  variants: {
    active: {
      false: {
        transform: 'rotate(0deg)',
      },
      true: {
        transform: 'rotate(90deg)',
      },
    },
  },
});

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

export const addRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  padding: '3px 10px',
});

export const plusBox = style({
  borderRadius: '2px',
  padding: '2.5px',
  backgroundColor: '#611f69',
  color: 'white',
  cursor: 'pointer',
});
