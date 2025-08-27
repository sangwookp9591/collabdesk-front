'use client';

import { ChannelIcon, PlusIcon } from '@/shared/ui';
import * as styles from './sidebar-dropdown.css';
import SidebarNavigationItem from './SidebarNavigationItem';
import { Channel } from '@/entities/channel/model/types';
import SidebarDropdown from './SidebarDropdown';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { themeTokens } from '@/shared/styles';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';

type ChannelSectionProps = {
  // channels: Omit<Channel, 'createdAt'>[];
  isOpen: boolean;
  onToggle: () => void;
  onAddChannel: () => void;
};

export default function ChannelSection({ isOpen, onToggle, onAddChannel }: ChannelSectionProps) {
  const pathname = usePathname();

  const channels = useWorkspaceStore((state) => state.channels);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  const currentChannel = useMemo(
    () =>
      channels?.find(
        (channel) => pathname === `/workspace/${currentWorkspace?.slug}/channel/${channel.slug}`,
      ),
    [channels, pathname, currentWorkspace],
  );

  return (
    <SidebarDropdown title={'채널'} isOpen={isOpen} onToggle={onToggle}>
      {isOpen ? (
        <div className={styles.wrapper}>
          {channels.map((channel) => {
            const currentPath = `/workspace/${currentWorkspace?.slug}/channel/${channel.slug}`;
            const isActiveItem = `${pathname}` === currentPath;
            return (
              <SidebarNavigationItem
                key={channel.id}
                href={currentPath}
                label={channel?.name}
                icon={
                  <ChannelIcon
                    size={20}
                    color={
                      isActiveItem
                        ? `${themeTokens.colors.primary}`
                        : `${themeTokens.colors.textSecondary}`
                    }
                  />
                }
                isActive={isActiveItem}
              />
            );
          })}

          <div className={styles.addRow}>
            <div className={styles.plusBox} onClick={onAddChannel}>
              <PlusIcon size={15} />
            </div>
            채널 추가
          </div>
        </div>
      ) : (
        <div>
          {currentChannel ? (
            <div className={styles.activeItem}>
              <ChannelIcon size={20} color="rgba(57,6,58, 1)" />
              {currentChannel?.name as unknown as string}
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
    </SidebarDropdown>
  );
}
