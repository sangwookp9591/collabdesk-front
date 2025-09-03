import { style } from '@vanilla-extract/css';

export const statsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px',
  marginBottom: '48px',
});

export const statCard = style({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '24px',
  border: '1px solid #e5e5e5',
  textAlign: 'center',
});

export const statNumber = style({
  fontSize: '2rem',
  fontWeight: 700,
  color: '#007acc',
  marginBottom: '8px',
});

export const statLabel = style({
  fontSize: '0.875rem',
  color: '#6a6a6a',
});
