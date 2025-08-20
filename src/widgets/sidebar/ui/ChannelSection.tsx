'use client';

import { ChannelIcon, PlusIcon } from '@/shared/ui/IconSvg';
import * as styles from './sidebar-dropdown.css';
import SidebarNavigationItem from './SidebarNavigationItem';
import { Channel } from '@/entities/channel/model/types';
import SidebarDropdown from './SidebarDropdown';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type ChannelSectionProps = {
  channels: Omit<Channel, 'createdAt'>[];
  isOpen: boolean;
  onToggle: () => void;
  onAddChannel: () => void;
};

export default function ChannelSection({
  channels,
  isOpen,
  onToggle,
  onAddChannel,
}: ChannelSectionProps) {
  const pathname = usePathname();

  const currentChannel = useMemo(
    () => channels.find((channel) => pathname === `/workspace/1/channel/${channel.id}`),
    [channels, pathname],
  );

  return (
    <section
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <SidebarDropdown title={'채널'} isOpen={isOpen} onToggle={onToggle}>
        {isOpen ? (
          <div className={styles.wrapper}>
            {channels.map((channel) => {
              const currentPath = `/workspace/${channel?.workspaceId}/channel/${channel.id}`;
              const isActiveItem = `${pathname}` === currentPath;
              return (
                <SidebarNavigationItem
                  key={channel.id}
                  href={currentPath}
                  label={channel?.name}
                  icon={
                    <ChannelIcon size={20} color={isActiveItem ? 'rgba(57,6,58, 1)' : '#ffffff'} />
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
    </section>
  );
}
