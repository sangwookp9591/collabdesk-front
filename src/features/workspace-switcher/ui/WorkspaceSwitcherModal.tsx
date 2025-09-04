'use client';

import { Avatar } from '@/entities/workspace';
import * as styles from './workspaceSwitcher.css';
import { useWorkspaceStore } from '@/shared/stores';
import { Workspace } from '@/shared/types/workspace';
import { useEffect, useRef, useState } from 'react';
import { WorkspaceCreateForm } from '@/features/workspace-create';
import { themeTokens } from '@/shared/styles';
import { ArrowLeftIcon, StatusView } from '@/shared/ui';
import { useRouter } from 'next/navigation';

export const WorkspaceSwitcherModal: React.FC = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { currentWorkspace, workspaces, addWorkspace, reset } = useWorkspaceStore();
  const [currentView, setCurrentView] = useState('list');
  const [slideDirection, setSlideDirection] = useState<'slideLeft' | 'slideRight' | 'init'>('init');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        resetAndClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleWorkspaceSelect = (workspace: Workspace) => {
    setIsOpen(false);
    router.push(`/workspace/${workspace.slug}`);
  };

  const showCreateForm = () => {
    setSlideDirection('slideLeft');
    setCurrentView('create');
  };

  const backToList = () => {
    setSlideDirection('slideRight');
    setCurrentView('list');
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setCurrentView('list');
    setSlideDirection('init');
  };

  const handleCreateForm = (newWorkspace: Workspace) => {
    console.log('newWorkspace : ', newWorkspace);
    setCurrentView('success');
    addWorkspace(newWorkspace);

    timeoutRef.current = setTimeout(() => {
      setCurrentView('list');
    }, 2000);
  };

  // 언마운트시 초기화
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
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
            <div className={styles.slideContainer}>
              <div className={styles.slideWrapper}>
                {currentView === 'list' && (
                  <div className={styles.slideContent[slideDirection]}>
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
                        <div className={styles.workspaceItemSlug}>/{currentWorkspace?.slug}</div>
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
                      <div onClick={showCreateForm} className={styles.buttonStyle}>
                        + 새 워크스페이스 만들기
                      </div>
                    </div>
                  </div>
                )}

                {currentView === 'create' && (
                  <div
                    className={`${styles.slideContent[slideDirection]} ${styles.createContainer}`}
                  >
                    <div>
                      <button onClick={backToList} className={styles.backButton}>
                        <ArrowLeftIcon size={20} color={themeTokens.colors.text} />
                      </button>
                    </div>

                    <WorkspaceCreateForm onSuccess={handleCreateForm} />
                  </div>
                )}

                {currentView === 'success' && (
                  <div className={styles.slideContent[slideDirection]}>
                    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                      <StatusView title={'생성 완료!'} status="success">
                        <>워크스페이스가 성공적으로 생성되었습니다.</>
                      </StatusView>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
