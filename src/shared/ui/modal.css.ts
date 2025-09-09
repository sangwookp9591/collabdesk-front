import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { themeTokens } from '@/shared/styles/theme.css';

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: ' scale(0.85)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1)',
  },
});

const fadeOut = keyframes({
  from: {
    opacity: 1,
    transform: 'scale(1)',
  },
  to: {
    opacity: 1,
    transform: ' scale(0.8)',
  },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
});

export const modal = style({
  position: 'relative',
  backgroundColor: themeTokens.colors.background,
  padding: '24px',
  minWidth: '320px',
  maxWidth: '90%',
  borderRadius: '12px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  border: '1px solid #e5e7eb',
  overflow: 'hidden',
});

export const fadeModal = styleVariants({
  in: [modal, { animation: `${fadeIn} 0.2s ease forwards` }],
  out: [modal, { animation: `${fadeOut} 0.2s ease forwards` }],
});

export const close = style({
  backgroundColor: themeTokens.colors.background,
});

export const positionOverlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  zIndex: 50,
});

export const positionModal = style({
  position: 'absolute',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  border: '1px solid #e5e7eb',
  overflow: 'hidden',
  animation: `${fadeIn} 0.2s ease-out`,
});

export const positionFadeModal = styleVariants({
  in: [positionModal, { animation: `${fadeIn} 0.2s ease forwards` }],
  out: [positionModal, { animation: `${fadeOut} 0.2s ease forwards` }],
});
