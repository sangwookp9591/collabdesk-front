'use client';

import { ChannelIcon, Modal } from '@/shared/ui';
import * as styles from './sidebar-dropdown.css';
import SidebarDropdown from './SidebarDropdown';
import { usePathname, useParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { themeTokens } from '@/shared/styles';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import ChannelSectionNav from './ChannelSectionNav';
import ChannelCreateForm from '@/features/channel-create/ui/ChannelCreateForm';

type ChannelSectionProps = {
  // channels: Omit<Channel, 'createdAt'>[];
  isOpen: boolean;
  onToggle: () => void;
};

export default function ChannelSection({ isOpen, onToggle }: ChannelSectionProps) {
  const pathname = usePathname();
  const params = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { channels } = useWorkspaceStore();

  const currentChannel = useMemo(
    () => channels?.find((channel) => channel?.slug === params?.chSlug),
    [channels, params],
  );

  const modalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const modalClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <div>
      <SidebarDropdown
        title={'채널'}
        isOpen={isOpen}
        onToggle={onToggle}
        handleAdd={modalOpen}
        hasButton={true}
      >
        <div className={styles.wrapper}>
          {channels.map((channel) => {
            const currentPath = `/workspace/${params?.wsSlug}/channel/${channel.slug}`;
            const isActiveItem = `${pathname}` === currentPath;
            const activeColor = isActiveItem
              ? `${themeTokens.colors.primary}`
              : `${themeTokens.colors.textSecondary}`;
            return (
              <ChannelSectionNav
                key={channel?.id}
                channel={channel}
                path={currentPath}
                isActive={isActiveItem}
                activeColor={activeColor}
              />
            );
          })}

          <Modal open={isModalOpen} onClose={modalClose}>
            <ChannelCreateForm onSuccess={modalClose} />
          </Modal>
        </div>
      </SidebarDropdown>

      {!isOpen && (
        <div
          style={{
            marginTop: '10px',
          }}
        >
          {currentChannel ? (
            <div className={styles.activeItem}>
              <ChannelIcon size={20} color="rgba(57,6,58, 1)" />
              {currentChannel?.name as unknown as string}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
