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

export const hasPrevButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${themeTokens.colors.border}`,
  color: themeTokens.colors.text,
  fontSize: '1rem',
});

export const fetchPrevLoading = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${themeTokens.colors.border}`,
  color: themeTokens.colors.textDisabled,
  fontSize: '1rem',
});
