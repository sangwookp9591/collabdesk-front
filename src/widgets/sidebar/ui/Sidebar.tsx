'use client';

import * as styles from './sidebar.css';
import { useState, useRef } from 'react';
import {
  ArrowBottomIcon,
  ArrowRightIcon,
  ComposeIcon,
  HourglassIcon,
  SettingsIcon,
} from '@/shared/ui';
import ChannelSection from './ChannelSection';
import { Channel } from '@/entities/channel/model/types';
import { themeTokens } from '@/shared/styles/theme.css';

type ChannelWithoutCreateAt = Omit<Channel, 'createdAt'>;

const TestChannels: ChannelWithoutCreateAt[] = [
  {
    id: 1,
    name: '채널',
    workspaceId: 1,
  },
  {
    id: 2,
    name: '새 채널',
    workspaceId: 1,
  },
  {
    id: 3,
    name: '뉴 채널',
    workspaceId: 1,
  },
];

type DropDown = {
  channel: boolean;
  page: boolean;
  dm: boolean;
};
export default function Sidebar() {
  const [width, setWidth] = useState(300);
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
    <div>
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
            channels={TestChannels}
            isOpen={activeDropDowns?.channel}
            onToggle={() => toggleDropdown('channel')}
            onAddChannel={() => {}}
          />
        </section>
        {/* 드래그용 Resizer */}
        <div className={styles.resizerStyle} onMouseDown={onMouseDown} />
      </div>
    </div>
  );
}
