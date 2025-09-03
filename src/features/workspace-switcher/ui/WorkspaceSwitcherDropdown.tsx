'use client';

import { Avatar } from '@/entities/workspace';
import * as styles from './workspaceSwitcher.css';
import { useWorkspaceStore } from '@/shared/stores';
import { useState } from 'react';

interface Workspace {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
}

export const WorkspaceSwitcherDropdown: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentWorkspace, workspaces } = useWorkspaceStore();

  const handleWorkspaceSelect = (workspace: Workspace) => {
    // Here you would typically navigate to the new workspace
    // router.push(`/workspace/${workspace.slug}`);
    setIsExpanded(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      {/* Current Workspace Header */}
      <button onClick={() => setIsExpanded(!isExpanded)} className={styles.dropdownHeader}>
        <Avatar url={currentWorkspace?.imageUrl} name={currentWorkspace?.name || ''} size={36} />
        <div className={styles.dropdownHeaderInfo}>
          <div className={styles.dropdownHeaderName}>{currentWorkspace?.name}</div>
          <div className={styles.dropdownHeaderSlug}>/{currentWorkspace?.slug}</div>
        </div>
        <div className={styles.dropdownArrow({ expanded: isExpanded })}>▼</div>
      </button>

      {/* Dropdown Content */}
      <div className={styles.dropdownContent({ expanded: isExpanded })}>
        <div className={styles.dropdownList}>
          <div className={styles.dropdownListHeader}>워크스페이스 전환</div>

          {/* Workspace List */}
          <div className={styles.dropdownWorkspacesList}>
            {workspaces?.map((workspace) => (
              <button
                key={workspace.id}
                onClick={() => handleWorkspaceSelect(workspace)}
                className={styles.dropdownWorkspaceItem({
                  current: workspace.id === currentWorkspace?.id,
                })}
              >
                <Avatar url={workspace.imageUrl} name={workspace.name} size={28} />
                <div className={styles.dropdownWorkspaceItemInfo}>
                  <div className={styles.dropdownWorkspaceItemName}>{workspace.name}</div>
                  <div className={styles.dropdownWorkspaceItemSlug}>/{workspace.slug}</div>
                </div>
                {workspace.id === currentWorkspace?.id && (
                  <div className={styles.dropdownCurrentIndicator} />
                )}
              </button>
            ))}
          </div>

          {/* Add New Workspace Button */}
          <div className={styles.dropdownDivider}>
            <button className={styles.dropdownCreateButton}>
              <div className={styles.dropdownCreateButtonIcon}>+</div>새 워크스페이스 만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
