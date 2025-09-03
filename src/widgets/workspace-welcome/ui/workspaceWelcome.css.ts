import { style } from '@vanilla-extract/css';
import * as styles from '@/shared/styles/form-basic.css';

export const workspaceOverview = style({
  padding: '32px 0',
});

export const welcomeSection = style({
  textAlign: 'center',
  marginBottom: '48px',
  padding: '32px',
  backgroundColor: '#f9f9f9',
  borderRadius: '12px',
});

export const workspaceName = style({
  marginBottom: '8px',
});

export const workspaceDescription = style({
  marginBottom: '24px',
  maxWidth: '600px',
  margin: '0 auto 24px',
});

export const actionButtons = style({
  display: 'flex',
  marginTop: '20px',
  width: '100%',
  gap: '20px',
  justifyContent: 'center',
});
