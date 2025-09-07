import { style, keyframes } from '@vanilla-extract/css';

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

export const dotsContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  color: '#4b5563',
});

export const dot = style({
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
