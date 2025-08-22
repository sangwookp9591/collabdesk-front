'use client';

import { buttonStyle, inputStyle, labelStyle } from '@/shared/styles/form-basic.css';
import { NextModal } from '@/shared/ui';
import { useActionState, useRef } from 'react';

export default function Page() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(async () => {}, null);

  // 폼 제출
  const onSubmit = () => {
    if (!formRef.current) return;
  };

  return (
    <div>
      <NextModal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
            }}
          >
            워크스페이스 생성
          </div>
          <div style={{ borderBottom: '1px solid #2e2e2e' }}></div>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'none',
            }}
            action={formAction}
          >
            <label className={labelStyle} htmlFor="name">
              Name
            </label>
            <input className={inputStyle} name="name"></input>
            <label className={labelStyle} htmlFor="slug">
              Slug
            </label>
            <input className={inputStyle} name={'slug'}></input>
            {/* 버튼 */}
            {isPending ? (
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>로딩중...</div>
            ) : (
              <div className={buttonStyle} onClick={onSubmit}>
                생성하기
              </div>
            )}
          </form>
        </div>
      </NextModal>
    </div>
  );
}
