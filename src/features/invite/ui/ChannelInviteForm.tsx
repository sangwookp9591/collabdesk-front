'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { buttonStyle, inputStyle, labelStyle, selectStyle } from '@/shared/styles/form-basic.css';
import * as styles from './channelInviteForm.css';
import { ChannelMember, ChannelRole } from '@/shared/types/channel';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { channelInviteAction } from '../model/channel-invite-action';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { apiFetch } from '@/shared/api';
import { WorkspaceMember } from '@/shared/types/workspace';
import { Avatar } from '@/entities/user';

interface RoleOption {
  value: ChannelRole;
  label: string;
  description: string;
}

const roleOptions: RoleOption[] = [
  {
    value: 'MEMBER',
    label: '멤버',
    description: '메시지 작성, 파일 공유 가능',
  },
  {
    value: 'ADMIN',
    label: '관리자',
    description: '멤버 관리, 채널 삭제 가능',
  },
];

type InviteMode = 'email' | 'members';

export default function ChannelInviteForm() {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(channelInviteAction, null);
  const [selectedRole, setSelectedRole] = useState<ChannelRole>('MEMBER');
  const [message, setMessage] = useState('');
  const [inviteMode, setInviteMode] = useState<InviteMode>('email');

  // 멤버 관련 상태
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<WorkspaceMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());

  const { currentChannel, currentWorkspace } = useWorkspaceStore();

  const params = useParams();

  const wsSlug = params?.wsSlug;
  const chSlug = params?.chSlug;
  const queryClient = useQueryClient();

  const fetchWorkspaceMember = async () => {
    const response = await apiFetch(`/workspace/${wsSlug}/members`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    return await response.json();
  };

  const fetchChannelMember = async () => {
    const response = await apiFetch(`/channel/${wsSlug}/members`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    return await response.json();
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ['invitable-members', wsSlug, chSlug],
    queryFn: async () => {
      const [workspaceMembers, channelMembers] = await Promise.all([
        queryClient.fetchQuery({
          queryKey: ['workspace-members', wsSlug],
          queryFn: () => fetchWorkspaceMember(),
        }),
        queryClient.fetchQuery({
          queryKey: ['channel-members', chSlug],
          queryFn: () => fetchChannelMember(),
        }),
      ]);
      const channelMemberIds = new Set(channelMembers.map((m: ChannelMember) => m.userId));

      console.log('channelMemberIds: ', channelMemberIds);
      return workspaceMembers.filter(
        (member: WorkspaceMember) => !channelMemberIds.has(member?.userId),
      );
    },
    enabled: !!(wsSlug && chSlug),
    staleTime: 2 * 60 * 1000, //
  });

  console.log('data : ', data);
  // 폼 제출
  const onSubmit = () => {
    if (!formRef.current) {
      return;
    }
    formRef.current.requestSubmit();
  };

  // 멤버 선택/해제
  const toggleMemberSelection = (memberId: string) => {
    const newSelected = new Set(selectedMembers);
    if (newSelected.has(memberId)) {
      newSelected.delete(memberId);
    } else {
      newSelected.add(memberId);
    }
    setSelectedMembers(newSelected);
  };

  useEffect(() => {
    if (data && !isLoading) {
      setMembers(data);
    }
  }, [data, isLoading]);

  // 멤버 검색 필터링
  useEffect(() => {
    if (searchTerm.trim()) {
      setFilteredMembers(
        members.filter(
          (member) =>
            (member.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (member.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }
  }, [searchTerm, members]);

  useEffect(() => {
    if (state?.status) {
      setMessage('초대에 성공했습니다.');
    }
  }, [state?.status]);

  // 선택된 역할의 설명 가져오기
  const selectedRoleOption = roleOptions.find((option) => option.value === selectedRole);

  /**Todo */
  const inviteSelectedMembers = async () => {};

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
          }}
        >
          채널 초대
        </div>
        <div style={{ borderBottom: '1px solid #2e2e2e' }}></div>
        {/* 탭 */}
        <div className={styles.tabContainer}>
          <button
            type="button"
            className={inviteMode === 'email' ? styles.tabButtonActive : styles.tabButton}
            onClick={() => setInviteMode('email')}
          >
            이메일로 초대
          </button>
          <button
            type="button"
            className={inviteMode === 'members' ? styles.tabButtonActive : styles.tabButton}
            onClick={() => setInviteMode('members')}
          >
            기존 멤버 초대
          </button>
        </div>

        {/* 이메일 초대 */}
        {inviteMode === 'email' && (
          <form
            ref={formRef}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            action={formAction}
          >
            <label className={labelStyle} htmlFor="email">
              Email
            </label>
            <input
              className={inputStyle}
              name="email"
              type="email"
              placeholder="colleague@example.com"
              required
            />

            <label className={labelStyle} htmlFor="workspaceRole">
              역할
            </label>
            <select
              className={selectStyle}
              name="workspaceRole"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as ChannelRole)}
              required
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {selectedRoleOption && (
              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: '#64748b',
                  marginBottom: '10px',
                }}
              >
                <strong style={{ color: '#334155' }}>{selectedRoleOption.label}:</strong>{' '}
                {selectedRoleOption.description}
              </div>
            )}

            <input type="text" name="channelId" value={currentChannel?.id} hidden readOnly />

            {isPending ? (
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>로딩중...</div>
            ) : (
              <div className={buttonStyle} onClick={onSubmit}>
                초대하기
              </div>
            )}
          </form>
        )}

        {/* 기존 멤버 초대 */}
        {inviteMode === 'members' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label className={labelStyle}>역할 선택</label>
            <select
              className={selectStyle}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as ChannelRole)}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {selectedRoleOption && (
              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: '#64748b',
                  marginBottom: '10px',
                }}
              >
                <strong style={{ color: '#334155' }}>{selectedRoleOption.label}:</strong>{' '}
                {selectedRoleOption.description}
              </div>
            )}

            <label className={labelStyle}>멤버 검색</label>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="이름 또는 이메일로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {selectedMembers.size > 0 && (
              <div className={styles.selectedCount}>{selectedMembers.size}명 선택됨</div>
            )}

            <div className={styles.memberListContainer}>
              {isLoading ? (
                <div className={styles.emptyState}>멤버 목록을 불러오는 중...</div>
              ) : filteredMembers.length === 0 ? (
                <div className={styles.emptyState}>
                  {searchTerm ? '검색 결과가 없습니다.' : '초대할 수 있는 멤버가 없습니다.'}
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className={
                      selectedMembers.has(member.id) ? styles.memberItemSelected : styles.memberItem
                    }
                    onClick={() => toggleMemberSelection(member.id)}
                  >
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedMembers.has(member.id)}
                      onChange={() => toggleMemberSelection(member.id)}
                    />

                    <Avatar
                      isActive={false}
                      profileImageUrl={member?.user?.profileImageUrl}
                      name={member?.user?.name || ''}
                      size={30}
                      isActiveIcon={false}
                    ></Avatar>

                    <div className={styles.memberInfo}>
                      <div className={styles.memberName}>{member?.user?.name}</div>
                      <div className={styles.memberEmail}>{member?.user?.email}</div>
                    </div>

                    <div className={styles.memberRole}>{member.role}</div>
                  </div>
                ))
              )}
            </div>

            {selectedMembers.size > 0 && (
              <div className={buttonStyle} onClick={() => {}} style={{ marginTop: '10px' }}>
                선택한 멤버 초대하기 ({selectedMembers.size}명)
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
