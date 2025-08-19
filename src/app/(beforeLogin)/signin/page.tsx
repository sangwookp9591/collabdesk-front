'use client';

import { loginAction } from '@/features/login/action';
import { redirect } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';
import * as styles from '@/app/(beforeLogin)/form.css';
import Link from 'next/link';

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
    <>
      <form ref={formRef} action={formAction} className={styles.formStyle}>
        <label htmlFor="loginId" className={styles.labelStyle}>
          ID
        </label>
        <input required className={styles.inputStyle} type="text" name="loginId" />

        <label htmlFor="loginPw" className={styles.labelStyle}>
          Password
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
        <Link
          href={'/signup'}
          style={{
            textDecoration: 'none',
            fontSize: '0.8rem',
            color: 'gray',
            textAlign: 'center',
            marginTop: '10px',
          }}
        >
          회원가입
        </Link>
      </form>
    </>
  );
}
