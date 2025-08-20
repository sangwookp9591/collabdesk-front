import { style } from '@vanilla-extract/css';

export const sidebarStyle = style({
  backgroundColor: '#3f0e40',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '20px',
  height: '100vh',
  position: 'relative',
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
