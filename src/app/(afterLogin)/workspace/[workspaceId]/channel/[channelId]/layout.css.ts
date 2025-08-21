import { themeTokens } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const chatPage = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  color: themeTokens.colors.text,
});

export const topBar = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  borderBottom: `1px solid ${themeTokens.colors.tab.borderBottom}`,
  fontWeight: 'bold',
});

export const channelName = style({
  marginLeft: '8px',
});
