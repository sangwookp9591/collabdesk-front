import { style } from '@vanilla-extract/css';

export const messagePreview = style({
  display: 'flex',
  gap: '12px',
  padding: '12px 0',
  borderBottom: '1px solid #f0f0f0',
  alignItems: 'center',

  ':last-child': {
    borderBottom: 'none',
  },
});

export const avatar = style({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#e5e5e5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 600,
  color: '#007acc',
  flexShrink: 0,
});

export const messageContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flex: 1,
  minWidth: 0,
});

export const messageHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const channelLink = style({
  color: '#007acc',
  textDecoration: 'none',
  fontSize: '0.75rem',

  ':hover': {
    textDecoration: 'underline',
  },
});

export const messageText = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});
