import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const createButton = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  fontSize: '13px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  color: themeTokens.colors.textSecondary,
  ':hover': {
    backgroundColor: themeTokens.colors.backgroundHover,
  },
});

export const plusBox = style({
  borderRadius: '2px',
  padding: '2.5px',
  backgroundColor: themeTokens.colors.primaryHover,
  color: themeTokens.colors.textSecondary,
  cursor: 'pointer',
});
