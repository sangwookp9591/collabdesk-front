import { style } from '@vanilla-extract/css';

export const chatPage = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

export const topBar = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  borderBottom: '1px solid #ddd',
  fontWeight: 'bold',
});

export const channelName = style({
  marginLeft: '8px',
});
