import { themeTokens } from '@/shared/styles';
import { style, styleVariants } from '@vanilla-extract/css';

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

export const statusBase = style({
  position: 'absolute',
  bottom: '0px',
  right: '0px',
  width: '1em',
  height: '1em',
  borderRadius: '50%',
  border: `2px solid  ${themeTokens.colors.border}`,
});
export const status = styleVariants({
  ONLINE: [statusBase, { backgroundColor: '#28a745' }],
  AWAY: [statusBase, { backgroundColor: '#ffc107' }],
  OFFLINE: [statusBase, { backgroundColor: '#6c757d' }],
  DO_NOT_DISTURB: [statusBase, { backgroundColor: '#FFFFFF' }],
});
