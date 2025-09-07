// UserLoadingSpinner.css.ts
import { style, keyframes } from '@vanilla-extract/css';

// 키프레임 애니메이션 정의
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const pulse = keyframes({
  '0%, 100%': { opacity: '1' },
  '50%': { opacity: '0.5' },
});

const bounce = keyframes({
  '0%, 20%, 53%, 80%, 100%': {
    transform: 'translate3d(0,0,0)',
  },
  '40%, 43%': {
    transform: 'translate3d(0, -8px, 0)',
  },
  '70%': {
    transform: 'translate3d(0, -4px, 0)',
  },
  '90%': {
    transform: 'translate3d(0, -2px, 0)',
  },
});

// 스타일 정의
export const container = style({
  minHeight: '100vh',
  backgroundColor: '#f9fafb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const content = style({
  textAlign: 'center',
});

export const spinnerContainer = style({
  position: 'relative',
  marginBottom: '24px',
});

export const mainSpinner = style({
  width: '64px',
  height: '64px',
  border: '4px solid #bfdbfe',
  borderTop: '4px solid #2563eb',
  borderRadius: '50%',
  margin: '0 auto',
  animation: `${spin} 1s linear infinite`,
});

export const pulseSpinner = style({
  position: 'absolute',
  inset: '0',
  width: '64px',
  height: '64px',
  border: '4px solid transparent',
  borderTop: '4px solid #60a5fa',
  borderRadius: '50%',
  margin: '0 auto',
  animation: `${pulse} 1s ease-in-out infinite`,
  animationDelay: '0.5s',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const mainTitle = style({
  fontSize: '20px',
  fontWeight: '600',
  color: '#1f2937',
  lineHeight: '28px',
});

export const dotsContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  color: '#4b5563',
});

export const dot = style({
  width: '8px',
  height: '8px',
  backgroundColor: '#2563eb',
  borderRadius: '50%',
  animation: `${bounce} 1.4s ease-in-out infinite both`,
});

export const dot1 = style([
  dot,
  {
    animationDelay: '0s',
  },
]);

export const dot2 = style([
  dot,
  {
    animationDelay: '0.1s',
  },
]);

export const dot3 = style([
  dot,
  {
    animationDelay: '0.2s',
  },
]);

export const subtitle = style({
  fontSize: '14px',
  color: '#6b7280',
  marginTop: '12px',
});

export const infoCard = style({
  marginTop: '32px',
  maxWidth: '384px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const card = style({
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  border: '1px solid #e5e7eb',
  padding: '16px',
});

export const cardContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const iconContainer = style({
  width: '32px',
  height: '32px',
  backgroundColor: '#dbeafe',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const icon = style({
  width: '16px',
  height: '16px',
  color: '#2563eb',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

export const textInfo = style({
  textAlign: 'left',
});

export const cardTitle = style({
  fontSize: '14px',
  fontWeight: '500',
  color: '#1f2937',
  margin: 0,
});

export const cardSubtitle = style({
  fontSize: '12px',
  color: '#6b7280',
  margin: 0,
});
