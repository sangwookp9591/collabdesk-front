'use client';

import * as styles from './sidebar.css';
import { useState, useRef } from 'react';
import {
  ArrowBottomIcon,
  ArrowRightIcon,
  ChannelIcon,
  ComposeIcon,
  HourglassIcon,
  PlusIcon,
  SettingsIcon,
} from '../../shared/ui/IconSvg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TestChannels = [
  {
    id: 1,
    name: '채널',
  },
  {
    id: 2,
    name: '새 채널',
  },
  {
    id: 3,
    name: '뉴 채널',
  },
];

type DropDown = {
  channel: boolean;
  page: boolean;
  dm: boolean;
};
export default function Sidebar() {
  const [width, setWidth] = useState(300);
  const pathname = usePathname();
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
            color: 'white',
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
            color: 'white',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'white' }}>
            <div
              style={{
                display: 'flex',
                fontWeight: 'bold',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              <div
                className={styles.dropdownIcon({ active: activeDropDowns?.channel })}
                onClick={() => toggleDropdown('channel')}
              >
                {'▶'}
              </div>
              <div>채널</div>
            </div>
            {activeDropDowns?.channel ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {TestChannels?.map((item) => {
                  const isAtive = `${pathname}` === `/workspace/1/channel/${item?.id}`;
                  const color = isAtive ? 'rgba(57,6,58, 1)' : '#ffffff';
                  const backgroundColor = isAtive ? 'rgba(249,237,255, 1)' : '#3f0e40';
                  return (
                    <Link
                      key={item?.id}
                      href={`/workspace/1/channel/${item?.id}`}
                      style={{
                        display: 'flex',
                        gap: '5px',
                        borderRadius: '15px',
                        textDecoration: 'none',
                        color: color,
                        padding: '5px 10px',
                        backgroundColor: backgroundColor,
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                      }}
                    >
                      <ChannelIcon size={20} color={color} />
                      {item?.name}
                    </Link>
                  );
                })}

                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 10px' }}
                >
                  <div
                    style={{
                      borderRadius: '2px',
                      padding: '2.5px',
                      backgroundColor: '#611f69',
                      color: 'white',
                    }}
                  >
                    <PlusIcon size={15} />
                  </div>
                  채널 추가
                </div>
              </div>
            ) : (
              <div>
                {TestChannels.some(
                  (item) => `${pathname}` === `/workspace/1/channel/${item?.id}`,
                ) ? (
                  <div
                    style={{
                      display: 'flex',
                      gap: '5px',
                      textDecoration: 'none',
                      color: 'rgba(57,6,58, 1)',
                      backgroundColor: 'rgba(249,237,255, 1)',
                      borderRadius: '15px',
                      padding: '3px 10px',
                    }}
                  >
                    <ChannelIcon size={20} color="rgba(57,6,58, 1)" />
                    {
                      TestChannels?.find(
                        (item) => `${pathname}` === `/workspace/1/channel/${item?.id}`,
                      )?.name
                    }
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 드래그용 Resizer */}
        <div className={styles.resizerStyle} onMouseDown={onMouseDown} />
      </div>
    </div>
  );
}
