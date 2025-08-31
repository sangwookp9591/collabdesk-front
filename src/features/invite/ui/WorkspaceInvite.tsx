'use client';

import { buttonStyle, inputStyle, labelStyle } from '@/shared/styles/form-basic.css';
import { useActionState, useEffect, useRef } from 'react';
import { workspaceInviteAction } from '../model/workspace-invite-action';

export default function WorkspaceInviteForm({ workspaceId }: { workspaceId?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(workspaceInviteAction, null);

  // 폼 제출
  const onSubmit = () => {
    if (!formRef.current) {
      return;
    }
    formRef.current.requestSubmit();
  };

  useEffect(() => {
    if (state?.status) {
    }
  }, [state?.status]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 800,
        }}
      >
        워크스페이스 초대
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
        <input type="text" name="workspaceId" value={workspaceId} hidden />
        {/* 버튼 */}
        {isPending ? (
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>로딩중...</div>
        ) : (
          <div className={buttonStyle} onClick={onSubmit}>
            초대기
          </div>
        )}
      </form>
    </div>
  );
}
