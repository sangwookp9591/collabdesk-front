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

export const tabBar = style({
  display: 'flex',
  padding: '8px 16px',
  borderBottom: '1px solid #ddd',
  gap: '16px',
});

export const tabItem = style({
  cursor: 'pointer',
});

export const messageList = style({
  flex: 1,
  overflowY: 'auto',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const messageItem = style({
  padding: '8px 12px',
  borderRadius: '8px',
  maxWidth: '60%',
});

export const sendMessage = style({
  display: 'flex',
  padding: '12px 16px',
  borderTop: '1px solid #ddd',
  gap: '8px',
});

export const inputBox = style({
  flex: 1,
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
});

export const sendButton = style({
  padding: '8px 16px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#007a5a',
  color: '#fff',
  cursor: 'pointer',
});
