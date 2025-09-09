import { style } from '@vanilla-extract/css';

export const mentionHighlight = style({
  backgroundColor: '#e3f2fd',
  color: '#1976d2',
  borderRadius: '4px',
  padding: '1px 4px',
  fontWeight: '500',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: '#bbdefb',
  },
});
