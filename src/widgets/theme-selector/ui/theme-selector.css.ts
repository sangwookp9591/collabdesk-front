// 📁 widgets/theme-selector/ui/theme-selector.css.ts
import { themeTokens } from '@/shared/styles/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// 컨테이너
export const container = style({
  position: 'relative',
  display: 'inline-block',
});

// 트리거 버튼
export const trigger = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 12px',
  backgroundColor: themeTokens.colors.backgroundSecondary,
  border: `1px solid ${themeTokens.colors.border}`,
  borderRadius: themeTokens.radii.md,
  color: themeTokens.colors.text,
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 500,
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: themeTokens.colors.backgroundHover,
    borderColor: themeTokens.colors.borderFocus,
  },

  ':focus-visible': {
    outline: `2px solid ${themeTokens.colors.borderFocus}`,
    outlineOffset: '2px',
  },
});

// 드롭다운
export const dropdown = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  marginTop: 8,
  minWidth: 280,
  backgroundColor: themeTokens.colors.background,
  border: `1px solid ${themeTokens.colors.border}`,
  borderRadius: themeTokens.radii.lg,
  boxShadow: themeTokens.shadows.lg,
  zIndex: 1000,
  overflow: 'hidden',
});

// 헤더
export const header = style({
  padding: '16px 16px 12px',
  borderBottom: `1px solid ${themeTokens.colors.border}`,
});

export const headerTitle = style({
  margin: 0,
  fontSize: '16px',
  fontWeight: 600,
  color: themeTokens.colors.text,
});

// 테마 목록
export const themeList = style({
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

// 테마 아이템
export const themeItem = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: themeTokens.radii.md,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'all 0.2s ease',

    ':hover': {
      backgroundColor: themeTokens.colors.backgroundHover,
    },

    ':focus-visible': {
      outline: `2px solid ${themeTokens.colors.borderFocus}`,
      outlineOffset: '2px',
    },
  },

  variants: {
    active: {
      true: {
        backgroundColor: themeTokens.colors.backgroundActive,
        color: themeTokens.colors.primary,
      },
      false: {},
    },
  },
});

// 테마 프리뷰 (작은 색상 프리뷰)
const themePreviewBase = style({
  width: 32,
  height: 32,
  borderRadius: themeTokens.radii.sm,
  border: `2px solid ${themeTokens.colors.border}`,
  position: 'relative',
  overflow: 'hidden',
  flexShrink: 0,
});

export const themePreview = recipe({
  base: themePreviewBase,
  variants: {
    theme: {
      light: {
        background: 'linear-gradient(135deg, #ffffff 50%, #522653 50%)',
      },
      dark: {
        background: 'linear-gradient(135deg, #1a1d29 50%, #19171d 50%)',
      },
      green: {
        background: 'linear-gradient(135deg, #ffffff 50%,green 50%)',
      },
      default: {
        background: 'linear-gradient(135deg, #ffffff 50%, #4a154b 50%)',
      },
    },
  },
});

// 테마 정보
export const themeInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  flex: 1,
  backgroundColor: themeTokens.colors.backgroundActive,
});

export const themeName = style({
  fontSize: '14px',
  fontWeight: 500,
  color: themeTokens.colors.text,
});

export const themeDescription = style({
  fontSize: '12px',
  color: themeTokens.colors.textMuted,
});

// 오버레이
export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'transparent',
  zIndex: 999,
});
