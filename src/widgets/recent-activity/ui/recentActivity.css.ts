import { style } from '@vanilla-extract/css';

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '20px',
});

export const loadingState = style({
  textAlign: 'center',
  marginBottom: '10px',
  padding: '10px',
  backgroundColor: '#f3f4f6',
  borderRadius: '4px',
  color: '#6b7280',
});

export const emptyState = style({
  textAlign: 'center',
  padding: '40px 20px',
  color: '#8a8a8a',
});

export const messagesList = style({
  maxHeight: '400px',
  overflowY: 'auto',
});
