'use client';

import { useState } from 'react';
import { Modal, UserIcon } from '@/shared/ui';
import * as styles from './memberSection.css';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { themeTokens } from '@/shared/styles';
import SidebarDropdown from './SidebarDropdown';
import WorkspaceInviteForm from '@/features/invite/ui/WorkspaceInvite';
import { Avatar } from '@/entities/user';
import { useSession } from 'next-auth/react';

export function MemberSection() {
  const { data: session } = useSession();
  const { currentWorkspace, workspaceMembers } = useWorkspaceStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SidebarDropdown
      title={'멤버 관리'}
      isOpen={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
      handleAdd={() => setIsModalOpen(true)}
      hasButton={true}
    >
      {isExpanded && (
        <div className={styles.expandedMenu}>
          {/* 멤버 현황 카드 */}

          <div className={styles.workspaceMemberList}>
            {workspaceMembers
              ?.filter((item) => item.userId !== session?.user?.id)
              ?.map((member) => {
                return (
                  <div className={styles.workspaceMemberCard} key={member.id}>
                    <Avatar
                      userId={member?.userId}
                      size={35}
                      isActiveIcon={true}
                      profileImageUrl={member?.user?.profileImageUrl}
                      name={member?.user?.name || ''}
                      borderRadius="10px"
                    ></Avatar>
                    <div className={styles.infoCard}>
                      <div className={styles.workspaceMemberName}>{member.user?.name}</div>
                      <div className={styles.workspaceMemberRole[member.role]}>{member.role}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={styles.memberStatusCard}>
            <div className={styles.statusRow}>
              <UserIcon size={15} color={themeTokens.colors.text} />
              <span className={styles.statusLabel}>전체 멤버:</span>
              <span className={styles.statusValue}>{`${workspaceMembers?.length}` || '0'}명</span>
            </div>
          </div>
        </div>
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <WorkspaceInviteForm workspaceId={currentWorkspace?.id} />
      </Modal>
    </SidebarDropdown>
  );
}
