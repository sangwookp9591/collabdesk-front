import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const inviteButton = style({
  display: 'flex',
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
