import { style } from '@vanilla-extract/css';
import { themeTokens } from '@/shared/styles/theme.css';

export const header = style({
  padding: '4px 4px',
  fontSize: '15px',
  fontWeight: '600',
});

export const newNoti = style({
  position: 'absolute',
  top: '3px',
  right: '0px',
  height: '6px',
  width: '6px',
  background: 'red',
  border: `1px solid ${themeTokens.colors.border}`,
  borderRadius: '50%',
});

export const notificationDropdown = style({
  background: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  border: '1px solid #e5e7eb',
  minWidth: '200px',
  maxWidth: '200px',
  maxHeight: '200px',
  padding: '5px',
  overflow: 'hidden',
  animation: 'slideDown 0.15s ease-out', // 위에서 아래로 나타나는 애니메이션으로 변경
  zIndex: 1000,
});

export const notificationList = style({
  overflowY: 'auto',
  padding: '4px',
});

export const notificationItem = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '10px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  gap: '2px',
  color: themeTokens.colors.text,
  transition: 'all 0.15s ease',
  position: 'relative',
  textDecoration: 'none',
  ':hover': {
    backgroundColor: themeTokens.colors.channel.backgroundMention,
  },
});

export const line = style({
  borderTop: `1px solid ${themeTokens.colors.border}`,
});

export const notificationTitle = style({
  fontWeight: '600',
  fontSize: '11px',
  color: themeTokens.colors.text,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textDecoration: 'none',
});

export const notificationMessage = style({
  fontSize: '8px',
  color: themeTokens.colors.textDate,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const empty = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '150px',
  fontSize: '14px',
  fontWeight: 'bold',
});
