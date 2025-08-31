import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const inviteButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: '8px',
  padding: '8px 12px 4px 12px',
  fontWeight: 'bold',
  fontSize: '1rem',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  color: themeTokens.colors.text,
  ':hover': {
    backgroundColor: themeTokens.colors.backgroundHover,
  },
});
