// 📁 shared/styles/themes.css.ts
import { createTheme, createThemeContract } from '@vanilla-extract/css';

// 1. 테마 토큰 계약 정의 (모든 테마가 가져야 할 색상들)
export const themeTokens = createThemeContract({
  colors: {
    // 기본 색상
    primary: null,
    primaryHover: null,
    primaryActive: null,

    // 배경 색상
    background: null,
    backgroundSecondary: null,
    backgroundTertiary: null,
    backgroundHover: null,
    backgroundActive: null,

    // 텍스트 색상
    text: null,
    textSecondary: null,
    textMuted: null,
    textDate: null,
    textDisabled: null,
    textInverse: null,

    // 테두리 색상
    border: null,
    borderFocus: null,
    borderError: null,
    borderSuccess: null,

    // 상태 색상
    success: null,
    warning: null,
    error: null,
    info: null,

    // 사이드바 특화 색상
    sidebarMenu: {
      background: null,
      backgroundHover: null,
      backgroundActive: null,
      text: null,
      textActive: null,
      border: null,
      resizer: null,
      resizerHover: null,
    },
    sidebar: {
      background: null,
      backgroundHover: null,
      backgroundActive: null,
      text: null,
      textActive: null,
      border: null,
      resizer: null,
      resizerHover: null,
    },

    // 채널/메시지 특화 색상
    channel: {
      background: null,
      backgroundUnread: null,
      backgroundMention: null,
      text: null,
      textUnread: null,
      badge: null,
    },
    //tab
    tab: {
      background: null,
      backgroundHover: null,
      backgroundActive: null,
      pills: {
        background: null,
      },
      underline: {
        borderBottom: null,
      },
      borderBottom: null,
    },
    // button
    button: {
      background: null,
      backgroundDisable: null,
    },
    status: {
      success: {
        border: null,
        backgroundColor: null,
        color: null,
      },
      error: {
        border: null,
        backgroundColor: null,
        color: null,
      },
    },
  },

  // 그림자
  shadows: {
    sm: null,
    md: null,
    lg: null,
    focus: null,
  },

  // 보더 반지름
  radii: {
    sm: null,
    md: null,
    lg: null,
    full: null,
  },
});

// 2. 다크 테마 정의
export const darkTheme = createTheme(themeTokens, {
  colors: {
    primary: '#1a8cff',
    primaryHover: '#0d7ce8',
    primaryActive: '#0570d6',

    background: '#1a1d29',
    backgroundSecondary: '#232937',
    backgroundTertiary: '#2f3349',
    backgroundHover: 'rgba(255, 255, 255, 0.04)',
    backgroundActive: 'rgba(255, 255, 255, 0.08)',

    text: '#ffffff',
    textSecondary: '#d1d2d3',
    textMuted: '#868686',
    textDisabled: '#616061',
    textDate: 'rgb(173, 181, 189)',
    textInverse: '#1a1d29',

    border: 'rgba(255, 255, 255, 0.13)',
    borderFocus: '#1a8cff',
    borderError: '#ff4757',
    borderSuccess: '#2dd4bf',

    success: '#2dd4bf',
    warning: '#fbbf24',
    error: '#ff4757',
    info: '#06b6d4',

    sidebarMenu: {
      background: '#0f1419',
      backgroundHover: 'rgba(255, 255, 255, 0.06)',
      backgroundActive: '#1a8cff',
      text: '#d1d2d3',
      textActive: '#ffffff',
      border: 'rgba(255, 255, 255, 0.08)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.2)',
    },

    sidebar: {
      background: '#151920',
      backgroundHover: 'rgba(255, 255, 255, 0.06)',
      backgroundActive: '#1a8cff',
      text: '#d1d2d3',
      textActive: '#ffffff',
      border: 'rgba(255, 255, 255, 0.08)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.2)',
    },

    channel: {
      background: 'transparent',
      backgroundUnread: 'rgba(255, 255, 255, 0.06)',
      backgroundMention: 'rgba(255, 71, 87, 0.2)',
      text: '#d1d2d3',
      textUnread: '#ffffff',
      badge: '#ff4757',
    },
    tab: {
      background: '#2f3349',
      backgroundHover: '#3a4056',
      backgroundActive: '#1a8cff',
      pills: {
        background: '#1a8cff',
      },
      underline: {
        borderBottom: '#1a8cff',
      },
      borderBottom: 'rgba(255, 255, 255, 0.13)',
    },
    button: {
      background: '#1a8cff',
      backgroundDisable: '#616061',
    },
    status: {
      success: {
        border: '#bbf7d0',
        backgroundColor: '#f0fdf4',
        color: '#15803d',
      },
      error: {
        border: '#fecaca',
        backgroundColor: '#fef2f2',
        color: '#dc2626',
      },
    },
  },

  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.4)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    focus: '0 0 0 2px rgba(26, 140, 255, 0.3)',
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
});

// 2. 보라색 테마 정의 (Purple Theme) - 기존 purpleTheme 개선
export const purpleTheme = createTheme(themeTokens, {
  colors: {
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
    primaryActive: '#6d28d9',

    background: '#ffffff',
    backgroundSecondary: '#faf5ff',
    backgroundTertiary: '#f3e8ff',
    backgroundHover: 'rgba(139, 92, 246, 0.04)',
    backgroundActive: 'rgba(139, 92, 246, 0.08)',

    text: '#1f2937',
    textSecondary: '#4b5563',
    textMuted: '#6b7280',
    textDisabled: '#9ca3af',
    textDate: '#6b7280',
    textInverse: '#ffffff',

    border: '#e5e7eb',
    borderFocus: '#8b5cf6',
    borderError: '#f87171',
    borderSuccess: '#34d399',

    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',

    sidebarMenu: {
      background: '#6d28d9',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#ffffff',
      text: '#ffffff',
      textActive: '#6d28d9',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },
    sidebar: {
      background: '#7c3aed',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#ffffff',
      text: '#ffffff',
      textActive: '#6d28d9',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },

    channel: {
      background: 'transparent',
      backgroundUnread: 'rgba(139, 92, 246, 0.08)',
      backgroundMention: 'rgba(248, 113, 113, 0.2)',
      text: '#ffffff',
      textUnread: '#ffffff',
      badge: '#f87171',
    },
    tab: {
      background: '#ffffff',
      backgroundHover: '#faf5ff',
      backgroundActive: '#ede9fe',
      pills: {
        background: '#ede9fe',
      },
      underline: {
        borderBottom: '#8b5cf6',
      },
      borderBottom: '#e5e7eb',
    },
    button: {
      background: '#8b5cf6',
      backgroundDisable: '#9ca3af',
    },
    status: {
      success: {
        border: '#bbf7d0',
        backgroundColor: '#f0fdf4',
        color: '#15803d',
      },
      error: {
        border: '#fecaca',
        backgroundColor: '#fef2f2',
        color: '#dc2626',
      },
    },
  },

  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    focus: '0 0 0 2px rgba(139, 92, 246, 0.3)',
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
});

// 3. 라이트 테마 정의 (개선된 색상)
export const lightTheme = createTheme(themeTokens, {
  colors: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryActive: '#1e40af',

    background: '#ffffff',
    backgroundSecondary: '#f8fafc',
    backgroundTertiary: '#f1f5f9',
    backgroundHover: 'rgba(37, 99, 235, 0.04)',
    backgroundActive: 'rgba(37, 99, 235, 0.08)',

    text: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#64748b',
    textDisabled: '#94a3b8',
    textDate: '#64748b',
    textInverse: '#ffffff',

    border: '#e2e8f0',
    borderFocus: '#2563eb',
    borderError: '#ef4444',
    borderSuccess: '#10b981',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#0ea5e9',

    sidebarMenu: {
      background: '#1e40af',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#ffffff',
      text: '#ffffff',
      textActive: '#1e40af',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },
    sidebar: {
      background: '#2563eb',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#ffffff',
      text: '#ffffff',
      textActive: '#1e40af',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },

    channel: {
      background: 'transparent',
      backgroundUnread: 'rgba(37, 99, 235, 0.08)',
      backgroundMention: 'rgba(239, 68, 68, 0.1)',
      text: '#ffffff',
      textUnread: '#ffffff',
      badge: '#ef4444',
    },
    tab: {
      background: '#ffffff',
      backgroundHover: '#f1f5f9',
      backgroundActive: '#dbeafe',
      pills: {
        background: '#dbeafe',
      },
      underline: {
        borderBottom: '#2563eb',
      },
      borderBottom: '#e2e8f0',
    },
    button: {
      background: '#2563eb',
      backgroundDisable: '#94a3b8',
    },
    status: {
      success: {
        border: '#bbf7d0',
        backgroundColor: '#f0fdf4',
        color: '#15803d',
      },
      error: {
        border: '#fecaca',
        backgroundColor: '#fef2f2',
        color: '#dc2626',
      },
    },
  },

  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    focus: '0 0 0 2px rgba(37, 99, 235, 0.3)',
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
});

// 4. Aubergine 테마 정의 (Slack 클래식 보라색 - 개선)
export const aubergineTheme = createTheme(themeTokens, {
  colors: {
    primary: '#4a154b',
    primaryHover: '#3d1142',
    primaryActive: 'rgba(249,237,255, 1)',

    background: '#ffffff',
    backgroundSecondary: '#4a154b',
    backgroundTertiary: '#611f69',
    backgroundHover: 'rgba(240, 240, 240, 0.5)',
    backgroundActive: 'rgba(74, 21, 75, 0.08)',

    text: '#1f2937',
    textSecondary: '#ffffff',
    textMuted: '#6b7280',
    textDisabled: '#9ca3af',
    textDate: '#6b7280',
    textInverse: '#ffffff',

    border: '#e5e7eb',
    borderFocus: '#4a154b',
    borderError: '#f43f5e',
    borderSuccess: '#22c55e',

    success: '#22c55e',
    warning: '#eab308',
    error: '#f43f5e',
    info: '#8b5cf6',

    sidebarMenu: {
      background: '#4a154b',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#611f69',
      text: '#ffffff',
      textActive: '#4a154b',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },
    sidebar: {
      background: '#5b1d5d',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#ffffff',
      text: '#ffffff',
      textActive: '#4a154b',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },

    channel: {
      background: 'transparent',
      backgroundUnread: 'rgba(74, 21, 75, 0.08)',
      backgroundMention: 'rgba(244, 63, 94, 0.2)',
      text: '#ffffff',
      textUnread: '#ffffff',
      badge: '#f43f5e',
    },
    tab: {
      background: '#ffffff',
      backgroundHover: '#fdf2f8',
      backgroundActive: '#f3e8ff',
      pills: {
        background: '#f3e8ff',
      },
      underline: {
        borderBottom: '#4a154b',
      },
      borderBottom: '#e5e7eb',
    },
    button: {
      background: '#4a154b',
      backgroundDisable: '#9ca3af',
    },
    status: {
      success: {
        border: '#bbf7d0',
        backgroundColor: '#f0fdf4',
        color: '#15803d',
      },
      error: {
        border: '#fecaca',
        backgroundColor: '#fef2f2',
        color: '#dc2626',
      },
    },
  },

  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    focus: '0 0 0 2px rgba(74, 21, 75, 0.3)',
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
});

// 5. Green 테마 정의 (기본 테마 - 초록색)
export const greenTheme = createTheme(themeTokens, {
  colors: {
    primary: '#15803d', // 메인 초록색 (emerald 계열)
    primaryHover: '#166534',
    primaryActive: 'rgba(196, 213, 203, 0.82)',

    background: '#ffffff',
    backgroundSecondary: '#f0fdf4',
    backgroundTertiary: '#dcfce7',
    backgroundHover: 'rgba(22, 101, 52, 0.04)',
    backgroundActive: 'rgba(118, 159, 135, 0.08)',

    text: '#1f2937',
    textSecondary: '#ffffff',
    textMuted: '#6b7280',
    textDisabled: '#9ca3af',
    textDate: '#6b7280',
    textInverse: '#ffffff',

    border: '#e5e7eb',
    borderFocus: '#15803d',
    borderError: '#f43f5e',
    borderSuccess: '#22c55e',

    success: '#22c55e',
    warning: '#eab308',
    error: '#f43f5e',
    info: '#10b981',

    sidebarMenu: {
      background: '#15803d',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#ffffff',
      text: '#ffffff',
      textActive: '#15803d',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },
    sidebar: {
      background: '#166534',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#ffffff',
      text: '#ffffff',
      textActive: '#15803d',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },

    channel: {
      background: 'transparent',
      backgroundUnread: 'rgba(22, 101, 52, 0.08)',
      backgroundMention: 'rgba(244, 63, 94, 0.2)',
      text: '#ffffff',
      textUnread: '#ffffff',
      badge: '#f43f5e',
    },
    tab: {
      background: '#ffffff',
      backgroundHover: '#f0fdf4',
      backgroundActive: '#dcfce7',
      pills: {
        background: '#dcfce7',
      },
      underline: {
        borderBottom: '#15803d',
      },
      borderBottom: '#e5e7eb',
    },
    button: {
      background: '#15803d',
      backgroundDisable: '#9ca3af',
    },
    status: {
      success: {
        border: '#bbf7d0',
        backgroundColor: '#f0fdf4',
        color: '#15803d',
      },
      error: {
        border: '#fecaca',
        backgroundColor: '#fef2f2',
        color: '#dc2626',
      },
    },
  },

  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    focus: '0 0 0 2px rgba(21, 128, 61, 0.3)',
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
});

// 5. 테마 맵핑
export const themes = {
  default: aubergineTheme,
  light: lightTheme,
  dark: darkTheme,
  green: greenTheme,
  purpleTheme: purpleTheme,
} as const;

export type ThemeType = keyof typeof themes;
