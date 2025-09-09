import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const messageItem = style({
  padding: '8px 12px',
  borderRadius: '8px',
  maxWidth: '80%',

  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
});

export const mentionHighlight = style({
  backgroundColor: themeTokens.colors.channel.backgroundMention,
  borderRadius: '10px',
  padding: '4px 10px',
  fontWeight: 'bold',
  color: '#34495e',
});
