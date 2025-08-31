'use client';

import { buttonStyle, inputStyle, labelStyle, selectStyle } from '@/shared/styles/form-basic.css';
import { useActionState, useEffect, useRef, useState } from 'react';
import { ChannelRole } from '@/shared/types/channel';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { channelInviteAction } from '../model/channel-invite-action';

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

export default function ChannelInviteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(channelInviteAction, null);
  const [selectedRole, setSelectedRole] = useState<ChannelRole>('MEMBER');
  const [message, setMessage] = useState('');

  const { currentChannel } = useWorkspaceStore();
  // 폼 제출
  const onSubmit = () => {
    if (!formRef.current) {
      return;
    }
    formRef.current.requestSubmit();
  };

  useEffect(() => {
    if (state?.status) {
      setMessage('초대에 성공했습니다.');
    }
  }, [state?.status]);

  // 선택된 역할의 설명 가져오기
  const selectedRoleOption = roleOptions.find((option) => option.value === selectedRole);

  return (
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
      <form
        ref={formRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'none',
          gap: '10px',
        }}
        action={formAction}
      >
        <label className={labelStyle} htmlFor="email">
          Email
        </label>
        <input className={inputStyle} name="email" />

        {/* 역할 선택 */}
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

        {/* 선택된 역할 설명 */}
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
        {/* 버튼 */}
        {isPending ? (
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>로딩중...</div>
        ) : (
          <div className={buttonStyle} onClick={onSubmit}>
            초대하기
          </div>
        )}
      </form>
    </div>
  );
}
