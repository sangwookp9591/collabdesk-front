// stateView.css.ts
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  padding: '40px 20px',
  textAlign: 'center',
});

export const iconWrapper = recipe({
  base: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    fontSize: '24px',
  },
  variants: {
    status: {
      success: { backgroundColor: '#dcfce7', color: '#16a34a' },
      error: { backgroundColor: '#fee2e2', color: '#dc2626' },
      warning: { backgroundColor: '#fef3c7', color: '#ca8a04' },
      info: { backgroundColor: '#dbeafe', color: '#2563eb' },
    },
  },
  defaultVariants: {
    status: 'info',
  },
});

export const title = style({
  fontSize: '18px',
  fontWeight: 600,
  color: '#111827',
  marginBottom: '8px',
});

export const description = style({
  fontSize: '14px',
  color: '#6b7280',
});
