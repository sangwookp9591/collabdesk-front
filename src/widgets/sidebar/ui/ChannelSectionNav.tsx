'use client';

import { ChannelIcon, LockIcon, MoreIcon } from '@/shared/ui';
import SidebarNavigationItem from './SidebarNavigationItem';
import * as styles from './sidebar-navigationitem.css';
import { Channel } from '@/shared/types/channel';
import { useRef, useState } from 'react';
import { themeTokens } from '@/shared/styles';
import { ChannelDeleteButton } from '@/features/channel-delete/ui/ChannelDeleteButton';
import { ChannelInviteMemberButton } from '@/features/invite';

type ChannelSectionNavProps = {
  channel: Channel;
  path: string;
  activeColor: string;
  isActive: boolean;
};
export default function ChannelSectionNav({
  channel,
  path,
  activeColor,
  isActive,
}: ChannelSectionNavProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const openMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setMenuPos({ top: rect.top + window.scrollY - 10, left: rect.right + 5 - 100 }); // 버튼 오른쪽에 위치
      }
      setMenuOpen(true);
    }
  };
  return (
    <>
      <SidebarNavigationItem
        href={path}
        label={channel?.name}
        icon={
          channel?.isPublic ? (
            <ChannelIcon size={20} color={activeColor} />
          ) : (
            <LockIcon size={20} color={activeColor} />
          )
        }
        isActive={isActive}
      >
        <div ref={buttonRef} onClick={openMenu} style={{ cursor: 'pointer' }}>
          <MoreIcon
            size={20}
            color={
              isActive ? `${themeTokens.colors.primary}` : `${themeTokens.colors.textSecondary}`
            }
          />
        </div>
        {menuOpen && (
          <div
            ref={menuRef}
            className={styles.menu}
            style={{
              left: menuPos.left,
              top: menuPos.top,
            }}
          >
            <div className={styles.menuItem}>
              <ChannelDeleteButton id={channel?.id} name={channel?.name} />
            </div>
            <div className={styles.menuItem}>
              <ChannelInviteMemberButton />
            </div>
          </div>
        )}
      </SidebarNavigationItem>
    </>
  );
}
