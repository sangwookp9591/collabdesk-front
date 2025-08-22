import { style } from '@vanilla-extract/css';
import { themeTokens } from '@/shared/styles';

export const skeletonContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
});

export const workspaceContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
});

export const workspaceInfo = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '4px',
});

export const workspaceName = style({
  fontSize: '1rem',
  fontWeight: 600,
  color: themeTokens.colors.text,
});

export const workspaceMemberCount = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '0.85rem',
  fontWeight: 800,
  color: themeTokens.colors.text,
});
