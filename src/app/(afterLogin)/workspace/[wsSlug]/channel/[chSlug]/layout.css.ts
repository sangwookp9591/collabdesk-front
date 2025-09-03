import { themeTokens } from '@/shared/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const chatPage = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  color: themeTokens.colors.text,
});
