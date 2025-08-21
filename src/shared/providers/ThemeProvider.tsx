// 📁 shared/providers/ThemeProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { themes, ThemeType } from '../styles/theme.css';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  availableThemes: { key: ThemeType; name: string; description?: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeType;
}

export function ThemeProvider({ children, defaultTheme = 'default' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  console.log('theme', theme);
  // 사용 가능한 테마 목록
  const availableThemes = [
    {
      key: 'light' as ThemeType,
      name: 'Light',
      description: '밝은 테마',
    },
    {
      key: 'dark' as ThemeType,
      name: 'Dark',
      description: '어두운 테마',
    },
    {
      key: 'green' as ThemeType,
      name: 'Green',
      description: '초록색 클래식 테마',
    },
    {
      key: 'default' as ThemeType,
      name: 'Default',
      description: ' 기본 테마',
    },
  ];

  // 로컬스토리지에서 테마 불러오기
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  // 테마 변경 시 로컬스토리지에 저장
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  // 시스템 테마 감지 (선택사항)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!localStorage.getItem('theme')) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // HTML 요소에 테마 클래스 적용
  useEffect(() => {
    if (mounted) {
      // 기존 테마 클래스들 제거
      Object.keys(themes).forEach((themeKey) => {
        document.documentElement.classList.remove(themes[themeKey as ThemeType]);
      });

      // 새 테마 클래스 추가
      document.documentElement.classList.add(themes[theme]);

      // CSS 커스텀 프로퍼티 업데이트 (필요시)
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  // 하이드레이션 에러 방지
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        availableThemes,
      }}
    >
      <div className={themes[theme]}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  // 안전장치 추가
  if (context === undefined) {
    // 개발 환경에서는 에러 표시, 프로덕션에서는 기본값 반환
    if (process.env.NODE_ENV === 'development') {
      console.warn('useTheme이 ThemeProvider 외부에서 호출됨');
    }

    // 기본값 반환 (에러 대신) -> 하이드레이션 하기전 에러 발생되는것 방지용
    return {
      theme: 'default' as ThemeType,
      setTheme: () => {},
      availableThemes: [],
    };
  }

  return context;
}

// 테마별 값을 쉽게 가져오는 헬퍼 훅
export function useThemeValue<T>(values: Record<ThemeType, T>): T {
  const { theme } = useTheme();
  return values[theme];
}
