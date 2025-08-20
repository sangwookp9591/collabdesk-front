import { style } from '@vanilla-extract/css';

export const sideMenu = style({
  width: '80px',
  height: '100%',
  backgroundColor: '#350d36',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  overflow: 'scroll',
});

export const topSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  paddingTop: '16px',
});

export const BottomSection = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '16px',
});

export const wsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const avatarSize = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '3px',
  width: '48px',
  height: '48px',
  position: 'relative',
  backgroundColor: 'gray',
  borderRadius: '12px',

  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.6rem',
  transition: 'background-color 0.2s',
});

export const wsAvatar = style([
  avatarSize,
  {
    backgroundColor: 'gray',
    fontSize: '1rem',
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
    fontSize: '1rem',
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
