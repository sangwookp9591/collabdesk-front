// 📁 widgets/tab-navigation/ui/tab-navigation.css.ts
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// 색상 토큰
const colors = {
  primary: '#3f0e40',
  text: '#1f2937',
  textMuted: '#6b7280',
  textDisabled: '#9ca3af',
  bg: '#ffffff',
  bgHover: '#f3f4f6',
  bgActive: '#eff6ff',
  border: '#e5e7eb',
  borderActive: '#3f0e40',
};

// 탭 네비게이션 컨테이너
export const tabNavigation = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderBottom: `1px solid ${colors.border}`,
    overflow: 'auto',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    gap: '10px',
  },

  variants: {
    variant: {
      default: {
        gap: 4,
      },
      pills: {
        gap: 8,
        padding: '8px',
        backgroundColor: colors.bgHover,
        borderRadius: '8px',
        border: 'none',
      },
      underline: {
        gap: 4,
      },
    },
    size: {
      sm: {
        minHeight: 40,
      },
      md: {
        minHeight: 48,
      },
      lg: {
        minHeight: 56,
      },
    },
  },

  defaultVariants: {
    variant: 'underline',
    size: 'md',
  },
});

// 탭 아이템
export const tabItem = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    outline: 'none',

    ':focus-visible': {
      outline: `2px solid ${colors.primary}`,
      outlineOffset: '2px',
    },
  },

  variants: {
    variant: {
      default: {
        padding: '12px 16px',
        borderRadius: '6px',
        color: colors.textMuted,

        ':hover': {
          color: colors.text,
          backgroundColor: colors.bgHover,
        },
      },
      pills: {
        padding: '8px 16px',
        borderRadius: '6px',
        color: colors.textMuted,

        ':hover': {
          color: colors.text,
          backgroundColor: colors.bg,
        },
      },
      underline: {
        padding: '16px 20px',
        color: colors.textMuted,

        ':hover': {
          color: colors.text,
        },
      },
    },

    size: {
      sm: {
        fontSize: '0.8rem',
        gap: '6px',
      },
      md: {
        fontSize: '1rem',
        gap: '8px',
      },
      lg: {
        fontSize: '1.2rem',
        gap: '10px',
      },
    },

    active: {
      true: {},
      false: {},
    },

    disabled: {
      true: {
        color: colors.textDisabled,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
      false: {},
    },
  },

  compoundVariants: [
    // default + active
    {
      variants: { variant: 'default', active: true },
      style: {
        color: colors.primary,
        backgroundColor: colors.bgActive,
      },
    },
    // pills + active
    {
      variants: { variant: 'pills', active: true },
      style: {
        color: colors.primary,
        backgroundColor: colors.bg,
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      },
    },
    // underline + active
    {
      variants: { variant: 'underline', active: true },
      style: {
        color: colors.primary,
        borderBottomColor: colors.borderActive,
      },
    },
  ],

  defaultVariants: {
    variant: 'underline',
    size: 'md',
    active: false,
    disabled: false,
  },
});

// 탭 아이콘
export const tabIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// 탭 라벨
export const tabLabel = style({
  minWidth: 0, // 텍스트 잘림 방지
});

// 탭 배지
export const tabBadge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    color: 'white',
    borderRadius: '50px',
    fontWeight: 600,
    fontSize: '11px',
    lineHeight: 1,
    minWidth: 'auto',
  },

  variants: {
    size: {
      sm: {
        height: '16px',
        minWidth: '16px',
        padding: '0 4px',
      },
      md: {
        height: '18px',
        minWidth: '18px',
        padding: '0 5px',
      },
      lg: {
        height: '20px',
        minWidth: '20px',
        padding: '0 6px',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

// 활성 인디케이터 (underline variant용)
export const activeIndicator = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '2px',
  backgroundColor: colors.primary,
  borderRadius: '1px 1px 0 0',
});
