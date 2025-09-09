import { style } from '@vanilla-extract/css';
import { themeTokens } from '@/shared/styles/theme.css';

export const modalContent = style({
  width: '520px',
  maxWidth: '90vw',
  maxHeight: '80vh',
  padding: 0,
});

export const modalTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '20px 24px 0',
  fontSize: '18px',
  fontWeight: '600',
  color: themeTokens.colors.text,
});

export const modalBody = style({
  paddingTop: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxHeight: '500px',
});

export const searchSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const searchInputWrapper = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
});

export const searchIcon = style({
  top: '8px',
  left: '10px',
  position: 'absolute',
  color: themeTokens.colors.text,
  pointerEvents: 'none',
});

export const searchInput = style({
  display: 'flex',
  padding: '10px 10px 10px 40px',
  fontSize: '1rem',
  width: '100%',
  borderRadius: '10px',
  border: `2px solid ${themeTokens.colors.border}`,

  ':focus': {
    borderColor: themeTokens.colors.primary,
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  },
});

export const selectedUsers = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  padding: '12px',
  backgroundColor: themeTokens.colors.backgroundHover,
  borderRadius: '8px',
  border: `1px solid ${themeTokens.colors.border}`,
});

export const selectedUserChip = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '6px',
  padding: '4px 8px',
  backgroundColor: themeTokens.colors.background,
  color: themeTokens.colors.text,
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: '500',
  justifyContent: 'space-between',
});

export const selectedUserName = style({
  fontSize: '1rem',
});

export const removeUserButton = style({
  padding: '2px',
  minWidth: 'auto',
  height: 'auto',
  cursor: 'pointer',
  borderRadius: '5px',

  selectors: {
    '&:hover': {
      // backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backgroundColor: themeTokens.colors.backgroundHover,
    },
  },
});

export const usersList = style({
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

export const sectionHeader = style({
  fontSize: '13px',
  fontWeight: '600',
  color: themeTokens.colors.textSecondary,
  marginBottom: '8px',
  paddingLeft: '4px',
});

export const loading = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px',
  color: themeTokens.colors.textSecondary,
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '40px 20px',
  color: themeTokens.colors.textSecondary,
});

export const emptyIcon = style({
  marginBottom: '12px',
  opacity: 0.5,
});

export const emptyHint = style({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: themeTokens.colors.text,
  marginTop: '4px',
});

export const usersGrid = style({
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const userItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  border: '2px solid transparent',

  ':hover': {
    backgroundColor: themeTokens.colors.backgroundHover,
  },
});

export const userItemSelected = style({
  backgroundColor: themeTokens.colors.backgroundHover,
  borderColor: themeTokens.colors.primary,
});

export const userAvatar = style({
  position: 'relative',
  flexShrink: 0,
});

export const statusIndicator = style({
  position: 'absolute',
  bottom: '-2px',
  right: '-2px',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  border: `2px solid ${themeTokens.colors.border}`,
});

export const userInfo = style({
  flex: 1,
  minWidth: 0,
});

export const userName = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '14px',
  fontWeight: '500',
  color: themeTokens.colors.text,
  marginBottom: '2px',
});

export const roleBadge = style({
  fontSize: '10px',
  padding: '2px 6px',
});

export const userEmail = style({
  fontSize: '12px',
  color: themeTokens.colors.textDate,
  marginBottom: '2px',
});

export const userStatus = style({
  fontSize: '11px',
  color: themeTokens.colors.textDate,
});

export const selectedCheck = style({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: themeTokens.colors.primary,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 'bold',
});

export const modalFooter = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  padding: '20px 24px',
  borderTop: `1px solid ${themeTokens.colors.border}`,
});
