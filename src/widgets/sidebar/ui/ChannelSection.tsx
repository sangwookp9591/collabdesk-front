'use client';

import { ChannelIcon } from '@/shared/ui';
import * as styles from './sidebar-dropdown.css';
import SidebarDropdown from './SidebarDropdown';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { themeTokens } from '@/shared/styles';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { ChannelCreateButton } from '@/features/channel-create';
import ChannelSectionNav from './ChannelSectionNav';

type ChannelSectionProps = {
  // channels: Omit<Channel, 'createdAt'>[];
  isOpen: boolean;
  onToggle: () => void;
  onAddChannel: () => void;
};

export default function ChannelSection({ isOpen, onToggle }: ChannelSectionProps) {
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
            const activeColor = isActiveItem
              ? `${themeTokens.colors.primary}`
              : `${themeTokens.colors.textSecondary}`;
            return (
              <>
                <ChannelSectionNav
                  key={channel?.id}
                  channel={channel}
                  path={currentPath}
                  isActive={isActiveItem}
                  activeColor={activeColor}
                />
              </>
            );
          })}

          <ChannelCreateButton />
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
