import { style, keyframes } from '@vanilla-extract/css';
import { themeTokens } from '@/shared/styles/theme.css';

// 애니메이션 정의
const slideDown = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-10px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

// 멤버 섹션 컨테이너
export const memberSection = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  padding: '8px 0',
  borderTop: '1px solid rgba(220, 214, 223, 0.3)',
  marginTop: '16px',
});

// 섹션 헤더
export const sectionHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 12px',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
  },
});

// 헤더 좌측 영역
export const headerLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

// 화살표 아이콘 컨테이너
export const arrowIcon = style({
  transition: 'transform 0.2s',
});

export const arrowIconExpanded = style([
  arrowIcon,
  {
    transform: 'rotate(90deg)',
  },
]);

// 섹션 타이틀
export const sectionTitle = style({
  fontSize: '14px',
  fontWeight: '600',
  color: themeTokens.colors.textSecondary,
});

// 배지 (대기중인 초대 수)
export const badge = style({
  backgroundColor: '#3B82F6',
  color: 'white',
  borderRadius: '10px',
  padding: '2px 8px',
  fontSize: '11px',
  fontWeight: '600',
  minWidth: '18px',
  textAlign: 'center',
});

// 확장된 메뉴 컨테이너
export const expandedMenu = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  paddingLeft: '32px',
  marginTop: '8px',
  animation: `${slideDown} 0.2s ease-out`,
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

// 새 멤버 초대 버튼
export const inviteButton = style([
  menuButton,
  {
    ':hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      color: '#3B82F6',
    },
  },
]);

// 멤버 관리 버튼
export const managementButton = style([
  menuButton,
  {
    ':hover': {
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
      color: '#374151',
    },
  },
]);

// 대기중인 초대 알림
export const pendingInviteNotice = style({
  padding: '8px 12px',
  fontSize: '12px',
  color: '#6B7280',
  backgroundColor: 'rgba(251, 191, 36, 0.1)',
  borderRadius: '6px',
  border: '1px solid rgba(251, 191, 36, 0.2)',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
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
