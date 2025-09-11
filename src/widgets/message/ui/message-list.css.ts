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
  borderBottom: '1px solid #e5e7eb',
});

export const newMessageIndicator = style({
  position: 'sticky',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '8px 16px',
  background: themeTokens.colors.primary,
  color: '#fff',
  borderRadius: '16px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
});
