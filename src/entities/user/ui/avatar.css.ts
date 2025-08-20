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

export const userIcon = style([
  avatarSize,
  {
    backgroundColor: '#603321',
    fontSize: '1rem',
  },
]);

export const profileIcon = style([avatarSize, {}]);

export const loginLight = style({
  position: 'absolute',
  bottom: '0px',
  right: '0px',
  width: '0.5em',
  height: '0.5em',
  borderRadius: '20px',
  backgroundColor: 'green',
  border: '3px gray solid',
});

export const userIconInactive = style([
  loginLight,
  {
    backgroundColor: 'black',
  },
]);
