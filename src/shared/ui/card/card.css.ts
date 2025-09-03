import { style } from '@vanilla-extract/css';

export const card = style({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '24px',
  border: '1px solid #e5e5e5',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.2s ease-in-out',

  ':hover': {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
});

export const cardHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

export const cardContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});
