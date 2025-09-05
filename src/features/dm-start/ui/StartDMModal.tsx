'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import * as styles from './startDMModal.css';
import { Button, CloseIcon, MessageIcon, Modal, SearchIcon } from '@/shared/ui';
import { themeTokens } from '@/shared/styles';
import { Avatar } from '@/entities/user';
import { useDebounce } from '@/shared/hooks';
import { useCreateDMConversation, useDMConversationsRecent } from '@/entities/dm';
import { useWorkspaceMembers } from '@/entities/workspace';
import { WorkspaceMember } from '@/shared/types/workspace';
import { User } from '@/shared/types/user';
import { customButton } from '@/shared/ui/button.css';

interface StartDMModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StartDMModal({ isOpen, onClose }: StartDMModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const params = useParams();
  const router = useRouter();
  const wsSlug = params.wsSlug as string;

  // 워크스페이스 멤버 검색

  const { data: searchResults, isLoading } = useWorkspaceMembers(wsSlug, debouncedSearchQuery);

  // 최근 대화한 사용자들
  const { data: recentUsers } = useDMConversationsRecent(wsSlug);
  // DM 대화방 생성
  const { mutate: createDMConversation, isPending } = useCreateDMConversation(
    wsSlug,
    (result: any) => {
      router.push(`/workspace/${wsSlug}/dm/${result.id}`);
    },
  );

  const handleUserSelect = (user: User) => {
    if (selectedUsers.find((u) => u.id === user.id)) {
      setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
    } else {
      // 일단은 1:1 DM만 지원
      setSelectedUsers([user]);
    }
  };

  const handleStartDM = () => {
    if (selectedUsers.length === 1) {
      createDMConversation(selectedUsers[0].id);
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedUsers([]);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedUsers([]);
    }
  }, [isOpen]);

  const displayUsers = debouncedSearchQuery.length >= 2 ? searchResults : recentUsers;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className={styles.modalBody}>
        {/* 검색 입력 */}
        <div className={styles.searchSection}>
          <div className={styles.searchInputWrapper}>
            <div className={styles.searchIcon}>
              <SearchIcon size={25} color={themeTokens.colors.text} />
            </div>
            <input
              placeholder="이름이나 이메일로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />
          </div>

          {/* 선택된 사용자들 */}
          {selectedUsers.length > 0 && (
            <div className={styles.selectedUsers}>
              {selectedUsers.map((user) => (
                <div key={user.id} className={styles.selectedUserChip}>
                  <div
                    style={{
                      display: 'flex',
                      gap: '5px',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar
                      isActive={user?.status === 'ONLINE'}
                      profileImageUrl={user?.profileImageUrl ?? '/images/default_profile.png'}
                      name={user?.name || ''}
                      size={44}
                      borderRadius="18px"
                    />
                    <span className={styles.selectedUserName}>{user.name}</span>
                  </div>
                  <div onClick={() => handleUserSelect(user)} className={styles.removeUserButton}>
                    <CloseIcon size={20} color={themeTokens.colors.text} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 사용자 목록 */}
        <div className={styles.usersList}>
          {!debouncedSearchQuery && <div className={styles.sectionHeader}>최근 대화한 사용자</div>}

          {isLoading ? (
            <div className={styles.loading}>검색 중...</div>
          ) : displayUsers?.length === 0 ? (
            <div className={styles.emptyState}>
              {debouncedSearchQuery ? (
                <>
                  <SearchIcon size={50} color={themeTokens.colors.text} />
                  <p>{`"${debouncedSearchQuery}"`} 에 대한 검색 결과가 없습니다.</p>
                  <p className={styles.emptyHint}>다른 검색어를 시도해보거나</p>
                  <p className={styles.emptyHint}>정확한 이메일 주소를 입력해보세요.</p>
                </>
              ) : (
                <>
                  <MessageIcon size={50} color={themeTokens.colors.text} />
                  <p>아직 DM 대화가 없습니다.</p>
                  <p className={styles.emptyHint}>팀원의 이름을 검색하여 대화를 시작해보세요.</p>
                </>
              )}
            </div>
          ) : (
            <div className={styles.usersGrid}>
              {displayUsers?.map((member: WorkspaceMember) => {
                const isSelected = selectedUsers.some((u) => u.id === member.user!.id);

                return (
                  <div
                    key={member?.id}
                    className={`${styles.userItem} ${isSelected ? styles.userItemSelected : ''}`}
                    onClick={() => handleUserSelect(member.user!)}
                  >
                    <div className={styles.userAvatar}>
                      <Avatar
                        isActive={member?.user?.status === 'ONLINE'}
                        profileImageUrl={
                          member?.user?.profileImageUrl ?? '/images/default_profile.png'
                        }
                        name={member?.user?.name || ''}
                        size={44}
                        borderRadius="18px"
                      />
                      <div
                        className={`${styles.statusIndicator} ${
                          styles[`status${member.user!.status}`]
                        }`}
                      />
                    </div>

                    <div className={styles.userInfo}>
                      <div className={styles.userName}>
                        {member.user!.name}
                        {member.role === 'OWNER' && '소유자'}
                        {member.role === 'ADMIN' && '관리자'}
                      </div>
                      <div className={styles.userEmail}>{member?.user!.email}</div>
                      <div className={styles.userStatus}>
                        {member?.user!.status === 'ONLINE' && '🟢 온라인'}
                        {member?.user!.status === 'AWAY' && '🟡 자리비움'}
                        {member?.user!.status === 'DO_NOT_DISTURB' && '🔴 방해금지'}
                        {member?.user!.status === 'OFFLINE' && '⚪ 오프라인'}
                      </div>
                    </div>

                    {isSelected && <div className={styles.selectedCheck}>✓</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className={styles.modalFooter}>
        <button className={customButton.primary} onClick={handleClose}>
          {'취소'}
        </button>
        <button
          className={customButton.primary}
          onClick={handleStartDM}
          disabled={selectedUsers.length === 0 || isPending}
        >
          {isPending ? '생성 중...' : `메시지 시작 (${selectedUsers.length})`}
        </button>
      </div>
    </Modal>
  );
}
