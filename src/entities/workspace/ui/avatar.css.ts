import { style } from '@vanilla-extract/css';

export const avatarSize = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '3px',
  position: 'relative',
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.6rem',
  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  backgroundColor: '#dfdsad',
  transition: 'transform 0.2s ease',
  ':hover': {
    transform: 'translateX(5px)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
  },
});

export const workspaceIcon = style([
  avatarSize,
  {
    border: '1px solid #e0e0e0',

    fontSize: '1rem',
  },
]);

export const imageIcon = style([avatarSize, {}]);
