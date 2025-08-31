import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 16px',
  borderBottom: `1px solid ${themeTokens.colors.tab.borderBottom}`,
});
