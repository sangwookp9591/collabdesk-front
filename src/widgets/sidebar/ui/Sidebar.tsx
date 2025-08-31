'use client';

import * as styles from './sidebar.css';
import { useState, useRef } from 'react';
import {
  ArrowBottomIcon,
  ArrowRightIcon,
  ComposeIcon,
  HourglassIcon,
  MessageIcon,
  Modal,
  PlusIcon,
  SettingsIcon,
} from '@/shared/ui';
import ChannelSection from './ChannelSection';
import { themeTokens } from '@/shared/styles/theme.css';
import WorkspaceInviteForm from '@/features/invite/ui/WorkspaceInvite';

type DropDown = {
  channel: boolean;
  page: boolean;
  dm: boolean;
};
export default function Sidebar() {
  const [width, setWidth] = useState(300);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [memberManagementOpen, setMemberManagementOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const [activeDropDowns, setActiveDropDowns] = useState<DropDown>({
    channel: false,
    page: false,
    dm: false,
  });

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const newWidth = e.clientX;
    if (newWidth > 100 && newWidth < 300) {
      // 최소/최대 너비 제한
      setWidth(newWidth);
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  // 이벤트 등록
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  const toggleDropdown = (key: keyof DropDown) => {
    setActiveDropDowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div ref={sidebarRef} className={styles.sidebarStyle} style={{ width }}>
      {/* Workspace 아이콘 등 */}
      <section
        style={{
          display: 'flex',
          color: themeTokens.colors.textSecondary,
          justifyContent: 'space-between',

          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Ws Name
          <ArrowBottomIcon size={20} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '4px',
              padding: '2px 2px',
              border: '1px solid #ffffff',
            }}
          >
            <SettingsIcon size={20} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '4px',
              padding: '2px 2px',
              border: '1px solid #ffffff',
            }}
          >
            <ComposeIcon size={20} />
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'flex',
          width: '90%',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: themeTokens.colors.textSecondary,
          padding: '12px',
          borderRadius: '12px',
          border: '1px solid rgba(220, 214, 223, 0.42)',
          backgroundColor: 'rgba(231, 224, 234, 0.25)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <HourglassIcon size={20} />
          <div>평가판이 28일 남았습니다.</div>
        </div>
        <ArrowRightIcon size={20} />
      </section>

      <section
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ChannelSection
          isOpen={activeDropDowns?.channel}
          onToggle={() => toggleDropdown('channel')}
          onAddChannel={() => {}}
        />
      </section>
      <section
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          padding: '8px 0',
          borderTop: '1px solid rgba(220, 214, 223, 0.3)',
          marginTop: '16px',
        }}
      >
        {/* 섹션 헤더 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'background-color 0.2s',
          }}
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(240, 240, 240, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            >
              <ArrowRightIcon size={16} />
            </div>
            <MessageIcon size={16} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: themeTokens.colors.textSecondary,
              }}
            >
              멤버 관리
            </span>
          </div>
        </div>

        {/* 확장된 메뉴 */}
        {isExpanded && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              paddingLeft: '32px',
              marginTop: '8px',
              animation: 'slideDown 0.2s ease-out',
            }}
          >
            {/* 새 멤버 초대 */}
            <button
              onClick={() => setInviteModalOpen((prev) => !prev)}
              style={{
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                e.currentTarget.style.color = '#3B82F6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = themeTokens.colors.textSecondary;
              }}
            >
              <PlusIcon size={14} />
              <span>새 멤버 초대</span>
            </button>

            {/* 멤버 관리 */}
            <button
              onClick={() => setMemberManagementOpen((prev) => !prev)}
              style={{
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(107, 114, 128, 0.1)';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = themeTokens.colors.textSecondary;
              }}
            >
              <SettingsIcon size={14} />
              <span>멤버 관리</span>
            </button>
          </div>
        )}

        <style jsx>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
      {/* 드래그용 Resizer */}
      <Modal open={inviteModalOpen} onClose={() => setInviteModalOpen(false)}>
        <WorkspaceInviteForm />
      </Modal>
      <div className={styles.resizerStyle} onMouseDown={onMouseDown} />
    </div>
  );
}
