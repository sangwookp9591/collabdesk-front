import { style, keyframes, styleVariants } from '@vanilla-extract/css';
import { themeTokens } from '@/shared/styles/theme.css';

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const fadeOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
});

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  border: '1px solid rgba(220, 214, 223, 0.42)',
  backgroundColor: 'rgba(231, 224, 234, 0.25)',
  borderRadius: '8px',
  fontSize: '13px',
  color: themeTokens.colors.textSecondary,
});

export const typingContainer = styleVariants({
  in: [container, { animation: `${fadeIn} 0.4s ease forwards` }],
  out: [container, { animation: `${fadeOut} 0.8s ease forwards` }],
});

export const typingAvatars = style({
  display: 'flex',
  marginLeft: '-4px',
  gap: '5px',
});

export const typingAvatar = style({
  width: '20px',
  height: '20px',
  marginLeft: '-4px',
  border: `2px solid ${themeTokens.colors.background}`,
});

export const typingText = style({
  fontWeight: '500',
  fontSize: '13px',
  color: themeTokens.colors.text,
});
