import { themeTokens } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const sidebarStyle = style({
  backgroundColor: themeTokens.colors.sidebar.background,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  padding: '15px 10px',
  gap: '10px',
  width: '100%',
});

export const resizerStyle = style({
  width: '5px',
  cursor: 'ew-resize',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'transparent',
});
