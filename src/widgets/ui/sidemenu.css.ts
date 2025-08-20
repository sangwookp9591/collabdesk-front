import { style } from '@vanilla-extract/css';

export const sideMenu = style({
  width: '80px',
  backgroundColor: '#350d36',

  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '16px',
  justifyContent: 'space-between',
});

export const topSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

export const BottomSection = style({
  display: 'flex',
  flexDirection: 'column',
});

export const avatarSize = style({
  width: '48px',
  height: '48px',
  position: 'relative',
  backgroundColor: 'gray',
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '12px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px',
  transition: 'background-color 0.2s',
});

export const wsAvatar = style([
  avatarSize,
  {
    backgroundColor: 'gray',
  },
]);

export const workspace = style([
  avatarSize,
  {
    backgroundColor: '#611f69',
  },
]);

export const svgIconSize = style({
  width: '20px',
  height: '20px',
});

export const userIcon = style([
  avatarSize,
  {
    backgroundColor: '#603321',
  },
]);

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
