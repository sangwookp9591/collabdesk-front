import { themeTokens } from '@/shared/styles/theme.css';
import { style, keyframes } from '@vanilla-extract/css';

export const linkStyle = style({
  display: 'flex',
  gap: '5px',
  width: '100%',
  lineHeight: '24px',
  color: themeTokens.colors.textSecondary,
  textDecoration: 'none',
  textAlign: 'center',
  alignItems: 'center',
});

export const activeLinkStyle = style([
  linkStyle,
  {
    color: themeTokens.colors.primary,
  },
]);
export const item = style({
  display: 'flex',
  borderRadius: '15px',
  padding: '5px 10px',
  justifyContent: 'space-between',

  transition: 'background-color 0.3s ease, color 0.3s ease',
});

export const activeItem = style([
  item,
  {
    backgroundColor: themeTokens.colors.primaryActive,
  },
]);

export const slideDown = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-10px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const menu = style({
  position: 'absolute',

  backgroundColor: `#fff`,
  border: `1px solid ${themeTokens.colors.backgroundHover}`,
  boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
  borderRadius: '5px',
  padding: '5px 5px',
  zIndex: 100,
  minWidth: '150px',
  animation: `${slideDown} 0.5s ease-out`,
});

export const menuItem = style({
  justifyContent: 'space-between',
  padding: '10px 10px',
  display: 'flex',
  position: 'relative',
  cursor: 'hover',
  borderBottom: `1px solid ${themeTokens.colors.backgroundHover}`,
  selectors: {
    '&:hover': {
      borderRadius: '5px',
      backgroundColor: themeTokens.colors.backgroundActive,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '2px',
      width: '100%',
      backgroundColor: themeTokens.colors.primary,
      transform: 'scaleX(0)', // 처음엔 안 보임
      transformOrigin: 'left', // 왼쪽에서 시작
      transition: 'transform 0.3s ease',
    },
    '&:hover::after': {
      transform: 'scaleX(1)', // hover 시 오른쪽으로 쭉
    },
  },
});

export const menuTitle = style({
  color: themeTokens.colors.text,
});
