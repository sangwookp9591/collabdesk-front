import { themeTokens } from '@/shared/styles';
import { inputStyle } from '@/shared/styles/form-basic.css';
import { style } from '@vanilla-extract/css';

// 탭 관련 스타일
export const tabContainer = style({
  display: 'flex',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '20px',
});

export const tabButton = style({
  padding: '10px 16px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#6b7280',
  borderBottom: '2px solid transparent',
  transition: 'all 0.2s',
  ':hover': {
    color: '#374151',
  },
});

export const tabButtonActive = style([
  tabButton,
  {
    color: themeTokens.colors.button.background,
    borderBottomColor: themeTokens.colors.button.background,
    fontWeight: '600',
  },
]);

// 멤버 목록 관련 스타일
export const memberListContainer = style({
  maxHeight: '300px',
  overflowY: 'auto',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  marginBottom: '20px',
});

export const memberItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  borderBottom: '1px solid #f3f4f6',
  ':hover': {
    backgroundColor: '#f9fafb',
  },
  ':last-child': {
    borderBottom: 'none',
  },
});

export const memberItemSelected = style([
  memberItem,
  {
    backgroundColor: '#eff6ff',
    borderColor: '#dbeafe',
  },
]);

export const memberAvatar = style({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: themeTokens.colors.button.background,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '0.875rem',
  fontWeight: '600',
  flexShrink: 0,
});

export const memberInfo = style({
  flex: 1,
  minWidth: 0,
});

export const memberName = style({
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#111827',
  marginBottom: '2px',
});

export const memberEmail = style({
  fontSize: '0.75rem',
  color: '#6b7280',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const memberRole = style({
  fontSize: '0.75rem',
  color: '#059669',
  backgroundColor: '#d1fae5',
  padding: '2px 6px',
  borderRadius: '12px',
  flexShrink: 0,
});

export const searchInput = style([
  inputStyle,
  {
    marginBottom: '12px',
  },
]);

export const emptyState = style({
  textAlign: 'center',
  padding: '40px 20px',
  color: '#6b7280',
  fontSize: '0.875rem',
});

export const selectedCount = style({
  fontSize: '0.875rem',
  color: '#374151',
  marginBottom: '12px',
  fontWeight: '500',
});

export const checkbox = style({
  width: '16px',
  height: '16px',
  accentColor: themeTokens.colors.button.background,
  cursor: 'pointer',
});
