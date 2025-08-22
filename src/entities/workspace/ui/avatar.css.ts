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
});

export const workspaceIcon = style([
  avatarSize,
  {
    backgroundColor: '#603321',
    fontSize: '1rem',
  },
]);

export const imageIcon = style([avatarSize, {}]);
