'use client';

import { loginAction } from '@/features/login/action';
import { redirect } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';

export default function Page() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.status) {
      redirect('/');
    }
  }, [state?.status]);

  const onSumbit = () => {
    formRef?.current?.requestSubmit();
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
        backgroundColor: '#f8f8f8',
      }}
    >
      {/* 왼쪽 브랜드 영역 */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#350d36',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
        }}
      >
        Collabdesk
      </div>

      {/* 오른쪽 로그인 폼 영역 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form
          ref={formRef}
          action={formAction}
          style={{
            width: '300px',
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label htmlFor="loginId" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
            ID
          </label>
          <input
            required
            type="text"
            name="loginId"
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              outline: 'none',
              fontSize: '1rem',
            }}
          />

          <label htmlFor="loginPw" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
            PW
          </label>
          <input
            required
            type="password"
            name="loginPw"
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              outline: 'none',
              fontSize: '1rem',
            }}
          />

          {isPending ? (
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>로딩중...</div>
          ) : (
            <div
              onClick={onSumbit}
              style={{
                padding: '10px',
                backgroundColor: '#611f69',
                color: 'white',
                textAlign: 'center',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              로그인
            </div>
          )}

          {!state?.status && state?.error && (
            <div style={{ color: 'red', marginTop: '10px', fontSize: '0.9rem' }}>
              {state?.error} {state?.el}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
