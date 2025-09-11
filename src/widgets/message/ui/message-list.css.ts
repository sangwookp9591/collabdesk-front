import { themeTokens } from '@/shared/styles';
import { keyframes, style, styleVariants } from '@vanilla-extract/css';

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

export const messageList = style({
  flex: 1,
  overflowY: 'auto',
  padding: '16px 1px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  position: 'relative',
});

export const loadMore = style({
  display: 'flex',
  flexDirection: 'column',
  height: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '10px',
});

export const hasPrevButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${themeTokens.colors.border}`,
  color: themeTokens.colors.text,
  fontSize: '1rem',
});

export const lastMessage = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: themeTokens.colors.textDisabled,
  fontSize: '1rem',
  width: '100%',
  padding: '10px',
  borderBottom: `1px solid ${themeTokens.colors.border}`,
});

export const loadMoreTop = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  borderBottom: '1px solid #e5e7eb',
});
export const loadMoreBottom = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
});

export const newMessageView = style({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  bottom: '100px',
  padding: '8px 10px',
  maxWidth: '63%',
  width: '100%',
  cursor: 'pointer',
  backgroundColor: themeTokens.colors.background,
  borderTop: `1px solid ${themeTokens.colors.border}`,
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  animation: `${fadeIn} 0.6s ease-in-out`,
});

export const newMessageCount = style({
  fontSize: '0.8rem',

  color: themeTokens.colors.text,
  backgroundColor: themeTokens.colors.channel.backgroundMention,
  padding: '4px 8px',
  borderRadius: '10px',
});

export const count = style({
  fontWeight: '600',
});
