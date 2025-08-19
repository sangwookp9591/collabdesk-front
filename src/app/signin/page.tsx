'use client';

import { loginAction } from '@/features/login/action';
import { redirect } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';
import * as styles from './login.css';

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
    <div className={styles.container}>
      {/* 왼쪽 브랜드 영역 */}
      <section className={styles.leftSection}>Collabdesk</section>

      {/* 오른쪽 로그인 폼 영역 */}
      <div className={styles.rightSection}>
        <form ref={formRef} action={formAction} className={styles.formStyle}>
          <label htmlFor="loginId" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
            ID
          </label>
          <input required className={styles.inputStyle} type="text" name="loginId" />

          <label htmlFor="loginPw" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
            PW
          </label>
          <input required className={styles.inputStyle} type="password" name="loginPw" />

          {isPending ? (
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>로딩중...</div>
          ) : (
            <div className={styles.buttonStyle} onClick={onSumbit}>
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
