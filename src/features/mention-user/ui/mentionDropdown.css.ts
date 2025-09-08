import { style } from '@vanilla-extract/css';

export const mentionDropdown = style({
  position: 'absolute',
  backgroundColor: 'white',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  maxHeight: '200px',
  overflowY: 'auto',
  zIndex: 1000,
  minWidth: '250px',
});

export const mentionItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  cursor: 'pointer',
  gap: '8px',

  ':hover': {
    backgroundColor: '#f5f5f5',
  },
});

export const mentionItemSelected = style({
  backgroundColor: '#e3f2fd',
});

export const mentionAvatar = style({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#ddd',
});

export const mentionUserInfo = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export const mentionUserName = style({
  fontSize: '14px',
  fontWeight: '500',
  color: '#333',
});

export const mentionUserEmail = style({
  fontSize: '12px',
  color: '#666',
});
