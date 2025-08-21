import { themeTokens } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const messageList = style({
  flex: 1,
  overflowY: 'auto',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const messageItem = style({
  padding: '8px 12px',
  borderRadius: '8px',
  maxWidth: '60%',
});

export const sendMessage = style({
  display: 'flex',
  padding: '12px 16px',
  borderTop: '1px solid #ddd',
  gap: '8px',
});

export const inputBox = style({
  flex: 1,
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
