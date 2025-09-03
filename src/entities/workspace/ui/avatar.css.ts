import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const avatar = recipe({
  base: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  variants: {
    size: {
      28: { width: '28px', height: '28px' },
      32: { width: '32px', height: '32px' },
      36: { width: '36px', height: '36px' },
      48: { width: '48px', height: '48px' },
    },
  },
  defaultVariants: {
    size: 48,
  },
});

export const avatarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const avatarFallback = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: '600',
});

export const statusIndicator = style({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '16px',
  height: '16px',
  backgroundColor: '#10b981',
  borderRadius: '50%',
  border: '2px solid white',
});
