import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 16px',
  borderBottom: `1px solid ${themeTokens.colors.tab.borderBottom}`,
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      gap: '20px',
      padding: '5px 8px',
    },
  },
});

export const buttonArea = style({
  display: 'flex',
  flex: '1',
  width: '100%',
});
