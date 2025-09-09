import { style, styleVariants } from '@vanilla-extract/css';
import { themeTokens } from '@/shared/styles/theme.css';

// 확장된 메뉴 컨테이너
export const expandedMenu = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  paddingLeft: '8px',
  marginTop: '8px',
});

export const workspaceMemberList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '15px',
});

export const workspaceMemberCard = style({
  display: 'flex',
  padding: '6px 12px',
  flexDirection: 'row',
  gap: '8px',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
  },
});

export const infoCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const roleBase = style({
  color: themeTokens.colors.textSecondary,
  fontSize: '10px',
  fontWeight: 'bold',
  borderRadius: '10px',
  padding: '2px 5px',
});

export const workspaceMemberRole = styleVariants({
  OWNER: [
    roleBase,
    {
      border: `1px solid ${themeTokens.colors.role.owner.border}`,
      backgroundColor: themeTokens.colors.role.owner.backgound,
      color: themeTokens.colors.role.owner.color,
    },
  ],
  ADMIN: [
    roleBase,
    {
      border: `1px solid ${themeTokens.colors.role.admin.border}`,
      backgroundColor: themeTokens.colors.role.admin.backgound,
      color: themeTokens.colors.role.admin.color,
    },
  ],
  MEMBER: [
    roleBase,
    {
      border: `1px solid ${themeTokens.colors.role.member.border}`,
      backgroundColor: themeTokens.colors.role.member.backgound,
      color: themeTokens.colors.role.member.color,
    },
  ],
  GUEST: [
    roleBase,
    {
      border: `1px solid ${themeTokens.colors.role.guest.border}`,
      backgroundColor: themeTokens.colors.role.guest.backgound,
      color: themeTokens.colors.role.guest.color,
    },
  ],
});

export const workspaceMemberName = style({
  color: themeTokens.colors.textSecondary,
  fontSize: '14px',
  fontWeight: 'bold',
});

// 메뉴 버튼 기본 스타일
export const menuButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  fontSize: '13px',
  color: themeTokens.colors.textSecondary,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  textAlign: 'left',
  width: '100%',
});

// 멤버 현황 카드
export const memberStatusCard = style({
  padding: '8px 12px',
  backgroundColor: 'rgba(249, 250, 251, 0.8)',
  borderRadius: '6px',
  border: '1px solid rgba(229, 231, 235, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const statusRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '12px',
  color: '#6B7280',
});

export const statusLabel = style({
  fontWeight: '500',
});

export const statusValue = style({
  color: '#374151',
  fontWeight: '600',
});
