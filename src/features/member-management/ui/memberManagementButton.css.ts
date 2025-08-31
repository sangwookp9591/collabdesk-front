import { style } from '@vanilla-extract/css';
import { themeTokens } from '@/shared/styles';

// 메뉴 버튼 기본 스타일
export const menuButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  fontSize: '13px',
  color: themeTokens.colors.textSecondary,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  textAlign: 'left',
  width: '100%',
});
export const managementButton = style([
  menuButton,
  {
    ':hover': {
      backgroundColor: themeTokens.colors.backgroundHover,
    },
  },
]);
