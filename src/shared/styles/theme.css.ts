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
    primary: '#1264a3',
    primaryHover: 'rgba(255, 255, 255, 0.04)',
    primaryActive: '#094785',

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
    borderFocus: '#1264a3',
    borderError: '#e01e5a',
    borderSuccess: '#2eb67d',

    success: '#2eb67d',
    warning: '#ecb22e',
    error: '#e01e5a',
    info: '#36c5f0',

    sidebarMenu: {
      background: '#19171d',
      backgroundHover: 'rgba(255, 255, 255, 0.06)',
      backgroundActive: '#1264a3',
      text: '#d1d2d3',
      textActive: '#ffffff',
      border: 'rgba(255, 255, 255, 0.08)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.2)',
    },

    sidebar: {
      background: '#19171d',
      backgroundHover: 'rgba(255, 255, 255, 0.06)',
      backgroundActive: '#1264a3',
      text: '#d1d2d3',
      textActive: '#ffffff',
      border: 'rgba(255, 255, 255, 0.08)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.2)',
    },

    channel: {
      background: 'transparent',
      backgroundUnread: 'rgba(255, 255, 255, 0.06)',
      backgroundMention: 'rgba(224, 30, 90, 0.2)',
      text: '#d1d2d3',
      textUnread: '#ffffff',
      badge: '#e01e5a',
    },
    tab: {
      background: '#ffffff',
      backgroundHover: '#f3f4f6',
      backgroundActive: '#eff6ff',
      pills: {
        background: '#eff6ff',
      },
      underline: {
        borderBottom: '#ffffff',
      },
      borderBottom: '#ddd',
    },
  },

  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.4)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    focus: '0 0 0 2px rgba(18, 100, 163, 0.3)',
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
});

// 3. 라이트 테마 정의
export const lightTheme = createTheme(themeTokens, {
  colors: {
    primary: '#1264a3',
    primaryHover: '#0b5394',
    primaryActive: '#094785',

    background: '#ffffff',
    backgroundSecondary: '#f8f8f8',
    backgroundTertiary: '#f5f5f5',
    backgroundHover: 'rgba(29, 28, 29, 0.04)',
    backgroundActive: 'rgba(29, 28, 29, 0.08)',

    text: '#1d1c1d',
    textSecondary: '#616061',
    textMuted: '#868686',
    textDisabled: '#b9b9b9',
    textDate: 'rgb(173, 181, 189)',
    textInverse: '#ffffff',

    border: 'rgba(29, 28, 29, 0.13)',
    borderFocus: '#1264a3',
    borderError: '#e01e5a',
    borderSuccess: '#2eb67d',

    success: '#2eb67d',
    warning: '#ecb22e',
    error: '#e01e5a',
    info: '#36c5f0',

    sidebarMenu: {
      background: '#522653',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#1264a3',
      text: '#ffffff',
      textActive: '#ffffff',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },
    sidebar: {
      background: '#522653',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#1264a3',
      text: '#ffffff',
      textActive: '#ffffff',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },

    channel: {
      background: 'transparent',
      backgroundUnread: 'rgba(255, 255, 255, 0.13)',
      backgroundMention: 'rgba(224, 30, 90, 0.2)',
      text: '#ffffff',
      textUnread: '#ffffff',
      badge: '#e01e5a',
    },
    tab: {
      background: '#ffffff',
      backgroundHover: '#f3f4f6',
      backgroundActive: '#eff6ff',
      pills: {
        background: '#eff6ff',
      },
      underline: {
        borderBottom: '#ffffff',
      },
      borderBottom: '#ddd',
    },
  },

  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    focus: '0 0 0 2px rgba(18, 100, 163, 0.3)',
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
});

// 4. 커스텀 테마들 (Slack의 다양한 테마처럼)
export const aubergineTheme = createTheme(themeTokens, {
  colors: {
    primary: '#4a154b',
    primaryHover: '#3d1142',
    primaryActive: '#350e38',

    background: '#ffffff',
    backgroundSecondary: '#f8f8f8',
    backgroundTertiary: '#f5f5f5',
    backgroundHover: 'rgba(29, 28, 29, 0.04)',
    backgroundActive: 'rgba(29, 28, 29, 0.08)',

    text: '#1d1c1d',
    textSecondary: '#616061',
    textMuted: '#868686',
    textDisabled: '#b9b9b9',
    textDate: 'rgb(173, 181, 189)',
    textInverse: '#ffffff',

    border: 'rgba(29, 28, 29, 0.13)',
    borderFocus: '#4a154b',
    borderError: '#e01e5a',
    borderSuccess: '#2eb67d',

    success: '#2eb67d',
    warning: '#ecb22e',
    error: '#e01e5a',
    info: '#36c5f0',
    sidebarMenu: {
      background: '#4a154b',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#ffffff',
      text: '#ffffff',
      textActive: '#4a154b',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },
    sidebar: {
      background: '#4a154b',
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
      backgroundUnread: 'rgba(255, 255, 255, 0.13)',
      backgroundMention: 'rgba(224, 30, 90, 0.2)',
      text: '#ffffff',
      textUnread: '#ffffff',
      badge: '#e01e5a',
    },
    tab: {
      background: '#ffffff',
      backgroundHover: '#f3f4f6',
      backgroundActive: '#eff6ff',
      pills: {
        background: '#eff6ff',
      },
      underline: {
        borderBottom: '#ffffff',
      },
      borderBottom: '#ddd',
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

export const purpleTheme = createTheme(themeTokens, {
  colors: {
    primary: '#3f0e40',
    primaryHover: '#611f69',
    primaryActive: 'rgba(249,237,255, 1)',

    background: '#ffffff',
    backgroundSecondary: '#f8f8f8',
    backgroundTertiary: '#f5f5f5',
    backgroundHover: 'rgba(29, 28, 29, 0.04)',
    backgroundActive: 'rgba(81, 52, 81, 0.08)',

    text: '#3f0e40',
    textSecondary: '#ffffff',
    textMuted: '#6b7280',
    textDisabled: '#9ca3af',
    textDate: 'rgb(173, 181, 189)',
    textInverse: '#ffffff',

    border: 'rgba(29, 28, 29, 0.13)',
    borderFocus: '#4a154b',
    borderError: '#e01e5a',
    borderSuccess: '#2eb67d',

    success: '#2eb67d',
    warning: '#ecb22e',
    error: '#e01e5a',
    info: '#36c5f0',
    sidebarMenu: {
      background: '#350d36',
      backgroundHover: 'rgba(255, 255, 255, 0.13)',
      backgroundActive: '#611f69',
      text: '#ffffff',
      textActive: '#4a154b',
      border: 'rgba(255, 255, 255, 0.1)',
      resizer: 'transparent',
      resizerHover: 'rgba(255, 255, 255, 0.3)',
    },
    sidebar: {
      background: '#3f0e40',
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
      backgroundUnread: 'rgba(255, 255, 255, 0.13)',
      backgroundMention: 'rgba(224, 30, 90, 0.2)',
      text: '#ffffff',
      textUnread: '#ffffff',
      badge: '#e01e5a',
    },
    tab: {
      background: '#ffffff',
      backgroundHover: '#f3f4f6',
      backgroundActive: '#eff6ff',
      pills: {
        background: '#eff6ff',
      },
      underline: {
        borderBottom: '#ffffff',
      },
      borderBottom: '#ddd',
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

// 5. 테마 맵핑
export const themes = {
  default: purpleTheme,
  light: lightTheme,
  dark: darkTheme,
  aubergine: aubergineTheme,
} as const;

export type ThemeType = keyof typeof themes;
