'use client';

import { Avatar } from '@/entities/workspace';
import * as styles from './workspaceSwitcher.css';
import { useWorkspaceStore } from '@/shared/stores';
import { Workspace } from '@/shared/types/workspace';
import { useEffect, useRef, useState } from 'react';

export const WorkspaceSwitcherModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentWorkspace, workspaces } = useWorkspaceStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleWorkspaceSelect = (workspace: Workspace) => {
    // Here you would typically navigate to the new workspace
    // router.push(`/workspace/${workspace.slug}`);
    setIsOpen(false);
  };

  return (
    <div className={styles.topSection}>
      <Avatar
        url={currentWorkspace?.imageUrl}
        name={currentWorkspace?.name || ''}
        size={48}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.workspaceAvatarContainer}
      />

      {isOpen && (
        <div className={styles.modalBackdrop}>
          <div ref={modalRef} className={styles.modalContainer}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>워크스페이스</h3>
            </div>

            {/* Current Workspace */}
            <div className={styles.currentWorkspaceSection}>
              <Avatar
                url={currentWorkspace?.imageUrl}
                name={currentWorkspace?.name || ''}
                size={32}
              />
              <div className={styles.currentWorkspaceInfo}>
                <div className={styles.currentWorkspaceName}>{currentWorkspace?.name}</div>
                <div className={styles.currentWorkspaceLabel}>현재 워크스페이스</div>
              </div>
              <div className={styles.currentWorkspaceIndicator} />
            </div>

            {/* Workspace List */}
            <div className={styles.workspaceList}>
              {workspaces
                ?.filter((ws) => ws.id !== currentWorkspace?.id)
                .map(
                  (workspace) =>
                    workspace?.id && (
                      <button
                        key={workspace.id}
                        onClick={() => handleWorkspaceSelect(workspace)}
                        className={styles.workspaceItem}
                      >
                        <Avatar url={workspace.imageUrl} name={workspace.name} size={32} />
                        <div className={styles.workspaceItemInfo}>
                          <div className={styles.workspaceItemName}>{workspace.name}</div>
                          <div className={styles.workspaceItemSlug}>/{workspace.slug}</div>
                        </div>
                      </button>
                    ),
                )}
            </div>

            {/* Footer */}
            <div className={styles.modalFooter}>
              <button className={styles.createWorkspaceButton}>+ 새 워크스페이스 만들기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
