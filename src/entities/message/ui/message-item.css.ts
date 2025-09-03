import { style } from '@vanilla-extract/css';

export const messageItem = style({
  padding: '8px 12px',
  borderRadius: '8px',
  maxWidth: '60%',

  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
});
