import { themeTokens } from '@/shared/styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const slideDown = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-10px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  color: themeTokens.colors.textSecondary,
  animation: `${slideDown} 0.2s ease-out`,
});

export const title = style({
  display: 'flex',
  fontWeight: 'bold',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
});

export const titleWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
});

export const dropdownIcon = recipe({
  base: {
    transform: 'rotate(0deg)',
    transition: 'transform 0.5s ease',
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
  color: themeTokens.colors.textSecondary,
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
    color: themeTokens.colors.primary,
    backgroundColor: themeTokens.colors.primaryActive,
    // color: 'rgba(57,6,58, 1)',
    // backgroundColor: 'rgba(249,237,255, 1)',
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
  backgroundColor: themeTokens.colors.primaryHover,
  color: themeTokens.colors.textSecondary,
  cursor: 'pointer',
});

export const addDMButton = style({
  padding: '4px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: 'transparent',
  color: themeTokens.colors.textSecondary,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.15s ease',

  ':hover': {
    backgroundColor: themeTokens.colors.backgroundHover,
    color: themeTokens.colors.textSecondary,
  },
});
