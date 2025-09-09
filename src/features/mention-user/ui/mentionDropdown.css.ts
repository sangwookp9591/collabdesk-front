import { style } from '@vanilla-extract/css';
export const mentionDropdown = style({
  background: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  border: '1px solid #e5e7eb',
  minWidth: '280px',
  maxWidth: '320px',
  maxHeight: '300px',
  overflow: 'hidden',
  animation: 'slideUp 0.15s ease-out',
});

export const mentionHeader = style({
  padding: '12px 16px 8px',
  fontSize: '12px',
  fontWeight: '600',
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderBottom: '1px solid #f3f4f6',
});

export const mentionList = style({
  maxHeight: '200px',
  overflowY: 'auto',
  padding: '4px',
});

export const mentionItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  gap: '12px',
  transition: 'all 0.15s ease',
  position: 'relative',

  ':hover': {
    backgroundColor: '#f9fafb',
  },
});

export const mentionItemActive = style({
  backgroundColor: '#eff6ff',
  borderLeft: '3px solid #3b82f6',

  ':hover': {
    backgroundColor: '#eff6ff',
  },
});

export const mentionUserInfo = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: 0, // 텍스트 오버플로우 처리
});

export const mentionUserName = style({
  fontWeight: '500',
  fontSize: '14px',
  color: '#111827',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const mentionUserEmail = style({
  fontSize: '12px',
  color: '#6b7280',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const activeIndicator = style({
  display: 'flex',
  alignItems: 'center',
});

export const keyboardShortcut = style({
  padding: '2px 6px',
  backgroundColor: '#f3f4f6',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: '500',
  color: '#374151',
  fontFamily: 'monospace',
});

export const mentionFooter = style({
  padding: '8px 16px',
  borderTop: '1px solid #f3f4f6',
  backgroundColor: '#f9fafb',
});

export const shortcutHints = style({
  display: 'flex',
  gap: '12px',
  fontSize: '11px',
  color: '#6b7280',
});

export const shortcutSpan = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const noResults = style({
  padding: '20px',
  textAlign: 'center',
  color: '#6b7280',
  fontSize: '14px',
});
