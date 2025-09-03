'use client';

import { useState } from 'react';
import { ArrowRightIcon, MessageIcon, UserIcon } from '@/shared/ui';
import * as styles from './memberSection.css';
import { InviteMemberButton } from '@/features/invite';
import { MemberManagementButton } from '@/features/member-management/indext';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { themeTokens } from '@/shared/styles';

export function MemberSection() {
  const { currentWorkspace, workspaceMembers } = useWorkspaceStore();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className={styles.memberSection}>
      {/* 섹션 헤더 */}
      <div className={styles.sectionHeader} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.headerLeft}>
          <div className={isExpanded ? styles.arrowIconExpanded : styles.arrowIcon}>
            <ArrowRightIcon size={16} />
          </div>
          <MessageIcon size={16} />
          <span className={styles.sectionTitle}>멤버 관리</span>
        </div>
      </div>

      {/* 확장된 메뉴 */}
      {isExpanded && (
        <div className={styles.expandedMenu}>
          {/* Features 레이어의 컴포넌트 사용 */}
          <InviteMemberButton
            workspaceId={currentWorkspace?.id}
            onSuccess={() => {
              /* 성공 시 stats 새로고침 */
            }}
          />
          <MemberManagementButton workspaceId={currentWorkspace?.id} />

          {/* 멤버 현황 카드 */}
          <div className={styles.memberStatusCard}>
            <div className={styles.statusRow}>
              <UserIcon size={15} color={themeTokens.colors.text} />
              <span className={styles.statusLabel}>전체 멤버:</span>
              <span className={styles.statusValue}>{`${workspaceMembers?.length}` || '0'}명</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
