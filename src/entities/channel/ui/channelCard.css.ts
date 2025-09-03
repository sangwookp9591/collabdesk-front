import { style } from '@vanilla-extract/css';

export const channelCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '1px solid #e5e5e5',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  ':hover': {
    backgroundColor: '#f9f9f9',
    borderColor: '#007acc',
  },
});

export const channelHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const channelName = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontWeight: 600,
  color: '#1a1a1a',
});

export const channelBadge = style({
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 500,
  backgroundColor: '#e3f2fd',
  color: '#1976d2',
});

export const memberCount = style({
  fontSize: '0.75rem',
  color: '#8a8a8a',
});
