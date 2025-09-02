import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const deleteButton = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
  gap: '20px',
  padding: '8px 0px',
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
