import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const sendMessageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const sendMessage = style({
  display: 'flex',
  padding: '12px 16px',
  borderTop: '1px solid #ddd',
  gap: '8px',
  position: 'relative',
});

export const inputBox = style({
  flex: 1,
  background: 'transparent',
  color: 'black',
  zIndex: 1,
  resize: 'none',
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
});

export const sendButton = style({
  padding: '8px 16px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: themeTokens.colors.button.background,
  color: themeTokens.colors.textSecondary,
  cursor: 'pointer',
});

export const mentionHighlight = style({
  backgroundColor: 'yellow',
  color: 'black',
  borderRadius: '4px',
  padding: '0 2px',
});
