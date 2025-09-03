import { style } from '@vanilla-extract/css';

export const workspaceOverview = style({
  padding: '32px 0',
});

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 24px',
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
