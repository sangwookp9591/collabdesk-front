import { style } from '@vanilla-extract/css';

export const emptyState = style({
  textAlign: 'center',
  padding: '40px 20px',
  color: '#8a8a8a',
});

export const channelsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const sectionsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '32px',

  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

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
