/* message-send.css - 업데이트된 스타일 */
import { themeTokens } from '@/shared/styles';
import { style } from '@vanilla-extract/css';

export const sendMessageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const sendMessage = style({
  display: 'flex',
  padding: '12px 16px',
  borderTop: '1px solid #e5e7eb',
  gap: '12px',
  position: 'relative',
  alignItems: 'flex-end',
  backgroundColor: '#ffffff',
});

export const textareaContainer = style({
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const inputBox = style({
  flex: 1,
  background: 'transparent',
  color: '#1f2937',
  resize: 'none',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid #d1d5db',
  fontFamily: 'inherit',
  fontSize: '14px',
  lineHeight: '20px',
  outline: 'none',
  transition: 'all 0.2s ease',
  position: 'relative',
  zIndex: 2, // 하이라이트 오버레이보다 위에 위치

  ':focus': {
    borderColor: themeTokens.colors.backgroundSecondary,
    boxShadow: `0 0 0 3px ${themeTokens.colors.backgroundActive}`,
  },

  '::placeholder': {
    color: '#9ca3af',
  },
});

export const mentionOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  padding: '12px 16px',
  fontSize: '14px',
  lineHeight: '20px',
  fontFamily: 'inherit',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: 'transparent', // 입력된 글자는 보이지 않음
  pointerEvents: 'none',
  overflowWrap: 'break-word',
});

export const mentionHighlight = style({
  backgroundColor: themeTokens.colors.channel.backgroundMention,
  borderRadius: '10px',
  padding: '4px 2px',
  color: 'transparent', // 하이라이트된 글자 자체는 숨김
});

export const mirror = style({
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  visibility: 'hidden', // 실제로는 보이지 않음
  padding: '8px',
  fontSize: '14px',
  lineHeight: '20px',
  minHeight: '40px',
  border: '1px solid #ddd',
});

export const sendButton = style({
  padding: '10px 20px',
  borderRadius: '12px',
  border: 'none',
  backgroundColor: themeTokens.colors.button.background,
  color: 'white',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  minWidth: '70px',
  justifyContent: 'center',

  ':hover': {
    backgroundColor: '#2563eb',
    transform: 'translateY(-1px)',
  },

  ':active': {
    transform: 'translateY(0)',
  },

  ':disabled': {
    backgroundColor: '#d1d5db',
    color: '#9ca3af',
    cursor: 'not-allowed',
    transform: 'none',
  },
});

/* mentionDropdown.css - 업데이트된 스타일 */
export const mentionDropdown = style({
  background: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  border: '1px solid #e5e7eb',
  minWidth: '280px',
  maxWidth: '320px',
  maxHeight: '300px',
  overflow: 'hidden',
  animation: 'slideDown 0.15s ease-out', // 위에서 아래로 나타나는 애니메이션으로 변경
  zIndex: 1000,
});

export const mentionHeader = style({
  padding: '12px 16px 8px',
  fontSize: '12px',
  fontWeight: '600',
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderBottom: '1px solid #f3f4f6',
  backgroundColor: '#f9fafb',
});

export const mentionList = style({
  maxHeight: '200px',
  overflowY: 'auto',
  padding: '4px',
});

export const mentionItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  gap: '12px',
  transition: 'all 0.15s ease',
  position: 'relative',

  ':hover': {
    backgroundColor: '#f9fafb',
  },
});

export const mentionItemActive = style({
  backgroundColor: '#eff6ff',
  borderLeft: '3px solid #3b82f6',

  ':hover': {
    backgroundColor: '#eff6ff',
  },
});

export const mentionUserInfo = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: 0, // 텍스트 오버플로우 처리
});

export const mentionUserName = style({
  fontWeight: '500',
  fontSize: '14px',
  color: '#111827',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const mentionUserEmail = style({
  fontSize: '12px',
  color: '#6b7280',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const activeIndicator = style({
  display: 'flex',
  alignItems: 'center',
});

export const keyboardShortcut = style({
  padding: '2px 6px',
  backgroundColor: '#f3f4f6',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: '500',
  color: '#374151',
  fontFamily: 'monospace',
});

export const mentionFooter = style({
  padding: '8px 16px',
  borderTop: '1px solid #f3f4f6',
  backgroundColor: '#f9fafb',
});

export const shortcutHints = style({
  display: 'flex',
  gap: '12px',
  fontSize: '11px',
  color: '#6b7280',
});

export const shortcutSpan = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const noResults = style({
  padding: '20px',
  textAlign: 'center',
  color: '#6b7280',
  fontSize: '14px',
});

// 애니메이션 키프레임 추가
globalThis.document?.head.insertAdjacentHTML(
  'beforeend',
  `
<style>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
`,
);
