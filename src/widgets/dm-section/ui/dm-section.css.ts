import { style } from '@vanilla-extract/css';
import { themeTokens } from '@/shared/styles/theme.css';

export const dmSectionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '12px',
});

export const dmSectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  cursor: 'pointer',
  borderRadius: '6px',
  color: themeTokens.colors.textSecondary,
  fontSize: '14px',
  fontWeight: '600',

  ':hover': {
    backgroundColor: themeTokens.colors.backgroundHover,
  },
});

export const dmSectionTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const dmCounter = style({
  backgroundColor: themeTokens.colors.background,
  color: themeTokens.colors.text,
  borderRadius: '12px',
  padding: '2px 6px',
  fontSize: '11px',
  fontWeight: '600',
  minWidth: '16px',
  textAlign: 'center',
});

export const dmListContainer = style({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '8px',
  marginTop: '4px',
});

export const dmItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  color: themeTokens.colors.textSecondary,
  fontSize: '14px',
  position: 'relative',

  ':hover': {
    backgroundColor: themeTokens.colors.backgroundHover,
    color: themeTokens.colors.text,
  },
});

export const dmItemActive = style({
  backgroundColor: themeTokens.colors.background,
  color: themeTokens.colors.text,
  fontWeight: '600',

  ':hover': {
    backgroundColor: themeTokens.colors.background,
  },
});

export const dmItemUnread = style({
  fontWeight: '600',
  color: themeTokens.colors.text,
});

export const userAvatar = style({
  width: '20px',
  height: '20px',
  borderRadius: '4px',
  position: 'relative',
  flexShrink: 0,
});

export const statusIndicator = style({
  position: 'absolute',
  bottom: '-2px',
  right: '-2px',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  border: `2px solid ${themeTokens.colors.backgroundHover}`,
});

export const statusOnline = style({
  backgroundColor: '#28a745',
});

export const statusAway = style({
  backgroundColor: '#ffc107',
});

export const statusOffline = style({
  backgroundColor: '#6c757d',
});

export const dmUserInfo = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
});

export const dmUserName = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const dmLastMessage = style({
  fontSize: '12px',
  color: themeTokens.colors.textSecondary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginTop: '2px',
});

export const dmTimestamp = style({
  fontSize: '11px',
  color: themeTokens.colors.textSecondary,
  flexShrink: 0,
});

export const dmUnreadBadge = style({
  backgroundColor: themeTokens.colors.backgroundSecondary,
  color: themeTokens.colors.text,
  borderRadius: '8px',
  padding: '1px 4px',
  fontSize: '10px',
  fontWeight: '600',
  minWidth: '12px',
  textAlign: 'center',
  flexShrink: 0,
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px 16px',
  color: themeTokens.colors.text,
  fontSize: '13px',
  textAlign: 'center',
});

export const emptyIcon = style({
  marginBottom: '8px',
  opacity: 0.5,
});

export const addDMButton = style({
  padding: '4px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: 'transparent',
  color: themeTokens.colors.textSecondary,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.15s ease',

  ':hover': {
    backgroundColor: themeTokens.colors.backgroundHover,
    color: themeTokens.colors.textSecondary,
  },
});
