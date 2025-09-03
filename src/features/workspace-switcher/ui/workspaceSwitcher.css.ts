// workspaceSwitcher.css.ts
import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// Animations
const slideIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-10px) scale(0.95)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0) scale(1)',
  },
});

const slideDown = keyframes({
  from: {
    opacity: 0,
    maxHeight: 0,
    transform: 'translateY(-10px)',
  },
  to: {
    opacity: 1,
    maxHeight: '320px',
    transform: 'translateY(0)',
  },
});

// Base styles
export const sideMenu = style({
  height: '100vh',
  width: '64px',
  backgroundColor: '#1f2937',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 0',
  '@media': {
    '(min-width: 768px)': {
      width: '256px',
      alignItems: 'stretch',
      padding: '16px',
    },
  },
});

export const topSection = style({
  marginBottom: '24px',
  width: '100%',
});

export const workspaceAvatarContainer = style({
  position: 'relative',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  },
});

export const statusIndicator = style({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '16px',
  height: '16px',
  backgroundColor: '#10b981',
  borderRadius: '50%',
  border: '2px solid white',
});

// Modal styles (for first approach)
export const modalBackdrop = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  zIndex: 50,
});

export const modalContainer = style({
  position: 'absolute',
  left: '64px',
  top: '16px',
  width: '320px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  border: '1px solid #e5e7eb',
  overflow: 'hidden',
  animation: `${slideIn} 0.2s ease-out`,
});

export const modalHeader = style({
  padding: '12px 16px',
  borderBottom: '1px solid #f3f4f6',
});

export const modalTitle = style({
  fontSize: '14px',
  fontWeight: '600',
  color: '#111827',
});

export const currentWorkspaceSection = style({
  padding: '12px 16px',
  backgroundColor: '#eff6ff',
  borderBottom: '1px solid #f3f4f6',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const currentWorkspaceInfo = style({
  flex: 1,
});

export const currentWorkspaceName = style({
  fontWeight: '500',
  color: '#111827',
});

export const currentWorkspaceLabel = style({
  fontSize: '12px',
  color: '#2563eb',
});

export const currentWorkspaceIndicator = style({
  width: '8px',
  height: '8px',
  backgroundColor: '#3b82f6',
  borderRadius: '50%',
});

export const workspaceList = style({
  maxHeight: '256px',
  overflowY: 'auto',
});

export const workspaceItem = style({
  width: '100%',
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  ':hover': {
    backgroundColor: '#f9fafb',
  },
});

export const workspaceItemInfo = style({
  textAlign: 'left',
  flex: 1,
});

export const workspaceItemName = style({
  fontWeight: '500',
  color: '#111827',
});

export const workspaceItemSlug = style({
  fontSize: '12px',
  color: '#6b7280',
});

export const modalFooter = style({
  padding: '12px 16px',
  borderTop: '1px solid #f3f4f6',
  backgroundColor: '#f9fafb',
});

export const createWorkspaceButton = style({
  width: '100%',
  padding: '8px 12px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#374151',
  backgroundColor: 'white',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  ':hover': {
    backgroundColor: '#f9fafb',
  },
});

// Dropdown styles (for second approach)
export const dropdownContainer = style({
  width: '100%',
});

export const dropdownHeader = style({
  width: '100%',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: '#374151',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: '#4b5563',
  },
});

export const dropdownHeaderInfo = style({
  flex: 1,
  textAlign: 'left',
});

export const dropdownHeaderName = style({
  color: 'white',
  fontWeight: '500',
  fontSize: '14px',
});

export const dropdownHeaderSlug = style({
  color: '#9ca3af',
  fontSize: '12px',
});

export const dropdownArrow = recipe({
  base: {
    color: '#9ca3af',
    transition: 'transform 0.2s ease',
  },
  variants: {
    expanded: {
      true: { transform: 'rotate(180deg)' },
      false: { transform: 'rotate(0deg)' },
    },
  },
});

export const dropdownContent = recipe({
  base: {
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
  },
  variants: {
    expanded: {
      true: {
        maxHeight: '320px',
        opacity: 1,
        animation: `${slideDown} 0.3s ease-out`,
      },
      false: {
        maxHeight: 0,
        opacity: 0,
      },
    },
  },
});

export const dropdownList = style({
  marginTop: '8px',
  backgroundColor: '#374151',
  borderRadius: '8px',
  border: '1px solid #4b5563',
  padding: '8px',
});

export const dropdownListHeader = style({
  fontSize: '12px',
  color: '#9ca3af',
  padding: '4px 8px',
  fontWeight: '500',
});

export const dropdownWorkspacesList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  maxHeight: '192px',
  overflowY: 'auto',
});

export const dropdownWorkspaceItem = recipe({
  base: {
    width: '100%',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    backgroundColor: 'transparent',
  },
  variants: {
    current: {
      true: {
        backgroundColor: '#2563eb',
        color: 'white',
      },
      false: {
        color: '#d1d5db',
        ':hover': {
          backgroundColor: '#4b5563',
        },
      },
    },
  },
});

export const dropdownWorkspaceItemInfo = style({
  flex: 1,
  textAlign: 'left',
});

export const dropdownWorkspaceItemName = style({
  fontSize: '14px',
  fontWeight: '500',
});

export const dropdownWorkspaceItemSlug = style({
  fontSize: '12px',
  opacity: 0.7,
});

export const dropdownCurrentIndicator = style({
  width: '8px',
  height: '8px',
  backgroundColor: 'white',
  borderRadius: '50%',
});

export const dropdownDivider = style({
  borderTop: '1px solid #4b5563',
  marginTop: '8px',
  paddingTop: '8px',
});

export const dropdownCreateButton = style({
  width: '100%',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: '#d1d5db',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.15s ease',
  ':hover': {
    backgroundColor: '#4b5563',
  },
});

export const dropdownCreateButtonIcon = style({
  width: '28px',
  height: '28px',
  backgroundColor: '#6b7280',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Menu items
export const menuItems = style({
  padding: '0 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flex: 1,
});

export const menuItem = recipe({
  base: {
    width: '100%',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    '@media': {
      '(max-width: 767px)': {
        justifyContent: 'center',
        gap: 0,
      },
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: '#2563eb',
        color: 'white',
        boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.25)',
      },
      false: {
        color: '#d1d5db',
        ':hover': {
          backgroundColor: '#374151',
        },
      },
    },
  },
});

export const menuItemIcon = style({
  fontSize: '18px',
  '@media': {
    '(max-width: 767px)': {
      fontSize: '20px',
    },
  },
});

export const menuItemLabel = style({
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
});

// Bottom section
export const bottomSection = style({
  padding: '12px',
  borderTop: '1px solid #4b5563',
  '@media': {
    '(max-width: 767px)': {
      borderTop: 'none',
      padding: '0',
    },
  },
});

export const userSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  ':hover': {
    backgroundColor: '#374151',
  },
  '@media': {
    '(max-width: 767px)': {
      justifyContent: 'center',
      padding: 0,
      ':hover': {
        backgroundColor: 'transparent',
      },
    },
  },
});

export const userInfo = style({
  flex: 1,
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
});

export const userName = style({
  color: 'white',
  fontWeight: '500',
  fontSize: '14px',
});

export const userStatus = style({
  color: '#10b981',
  fontSize: '12px',
});

export const settingsButton = style({
  color: '#9ca3af',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '4px',
  transition: 'color 0.15s ease',
  ':hover': {
    color: '#d1d5db',
  },
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
});
