import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const formStyle = style({
  width: '300px',
  padding: '40px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
});

export const labelStyle = style({
  marginBottom: '8px',
  fontWeight: 'bold',
  color: '#374151',
  fontSize: '0.875rem',
});

export const inputStyle = style({
  padding: '10px',
  marginBottom: '20px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  outline: 'none',
  fontSize: '1rem',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  ':focus': {
    borderColor: themeTokens.colors.button.background,
    boxShadow: `0 0 0 3px ${themeTokens.colors.button.background}33`,
  },
  ':hover': {
    borderColor: '#9ca3af',
  },
});

export const textAreaStyle = style({
  padding: '10px',
  marginBottom: '20px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  outline: 'none',
  fontSize: '1rem',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  ':focus': {
    borderColor: themeTokens.colors.button.background,
    boxShadow: `0 0 0 3px ${themeTokens.colors.button.background}33`,
  },
  ':hover': {
    borderColor: '#9ca3af',
  },
});

// 새로 추가된 select 스타일
export const selectStyle = style({
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  outline: 'none',
  fontSize: '1rem',
  backgroundColor: 'white',
  cursor: 'pointer',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  appearance: 'none', // 기본 화살표 제거
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: 'right 8px center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '16px',
  paddingRight: '40px', // 화살표 공간 확보
  ':focus': {
    borderColor: themeTokens.colors.button.background,
    boxShadow: `0 0 0 3px ${themeTokens.colors.button.background}33`,
  },
  ':hover': {
    borderColor: '#9ca3af',
  },
});

export const selectOptionDesc = style({
  padding: '12px',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '0.875rem',
  color: '#64748b',
  marginBottom: '10px',
});

export const buttonStyle = style({
  padding: '8px 12px',
  fontSize: '1rem',
  fontWeight: '500',
  textAlign: 'center',
  color: themeTokens.colors.text,
  backgroundColor: themeTokens.colors.background,
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, color 0.15s ease, transform 0.2s ease',
  ':hover': {
    backgroundColor: themeTokens.colors.backgroundSecondary,
    color: themeTokens.colors.textSecondary,
    border: `1px solid ${themeTokens.colors.border}`,
    transform: 'translateX(1px)',
  },
});
export const disableButtonStyle = style({
  padding: '10px',
  backgroundColor: themeTokens.colors.button.backgroundDisable,
  color: 'black',
  textAlign: 'center',
  borderRadius: '4px',
  fontWeight: 'bold',
  border: 'none',
  transition: 'background-color 0.5s ease, transform 0.1s ease',
});

export const profileWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
  overflow: 'hidden',
});

export const profileImage = style({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover',
  overflow: 'hidden',
});

// 추가 유틸리티 스타일들
export const deleteMessageStyle = style({
  padding: '12px',
  backgroundColor: themeTokens.colors.status.error.backgroundColor,
  border: `1px solid ${themeTokens.colors.status.error.border}`,
  borderRadius: '6px',
  color: themeTokens.colors.text,
  fontSize: '1rem',
  marginBottom: '10px',
});

export const errorMessageStyle = style({
  marginTop: '5px',
  display: 'flex',
  justifyContent: 'center',
  padding: '12px',
  backgroundColor: themeTokens.colors.status.error.backgroundColor,
  border: `1px solid ${themeTokens.colors.status.error.border}`,
  borderRadius: '6px',
  color: themeTokens.colors.status.error.color,
  fontSize: '0.875rem',
  marginBottom: '5px',
});

export const successMessageStyle = style({
  padding: '12px',
  backgroundColor: themeTokens.colors.status.success.backgroundColor,
  border: `1px solid ${themeTokens.colors.status.success.border}`,
  borderRadius: '6px',
  color: themeTokens.colors.status.success.color,
  fontSize: '0.875rem',
  textAlign: 'center',
});

export const infoBoxStyle = style({
  padding: '12px',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '0.875rem',
  color: '#64748b',
  marginBottom: '10px',
});

export const loadingStyle = style({
  textAlign: 'center',
  marginBottom: '10px',
  padding: '10px',
  backgroundColor: '#f3f4f6',
  borderRadius: '4px',
  color: '#6b7280',
});
