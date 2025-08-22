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
  border: '1px solid #e0e0e0',
  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
});

export const workspaceIcon = style([
  avatarSize,
  {
    backgroundColor: '#dfdsad',
    fontSize: '1rem',
  },
]);

export const imageIcon = style([avatarSize, {}]);
