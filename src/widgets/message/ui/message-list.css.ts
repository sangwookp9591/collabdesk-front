import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const messageList = style({
  flex: 1,
  overflowY: 'auto',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
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
