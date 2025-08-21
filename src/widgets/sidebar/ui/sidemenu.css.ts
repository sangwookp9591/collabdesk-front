import { themeTokens } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const sideMenu = style({
  width: '80px',
  height: '100%',
  backgroundColor: themeTokens.colors.sidebarMenu.background,
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
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
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.6rem',
});

export const wsAvatar = style([
  avatarSize,
  {
    backgroundColor: 'gray',
    fontSize: '1rem',
  },
]);

//메뉴 아이템용 recipe
export const workspace = recipe({
  base: [
    avatarSize,
    {
      textDecorationLine: 'none',
      color: themeTokens.colors.sidebarMenu.text, // 기본 색상
      backgroundColor: themeTokens.colors.sidebarMenu.background, // 기본 색상
      transition: 'background-color 1s',
    },
  ],
  variants: {
    active: {
      true: {
        backgroundColor: themeTokens.colors.sidebarMenu.backgroundActive, // 활성화 색상
      },
      false: {},
    },
  },
});

export const svgIconSize = style({
  width: '20px',
  height: '20px',
});
