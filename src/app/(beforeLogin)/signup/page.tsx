'use client';

import { redirect } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';
import * as styles from '@/app/(beforeLogin)/form.css';
import { signupAction } from '@/features/signup/action';

export default function Page() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(signupAction, null);

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
        <label className={styles.labelStyle} htmlFor="loginId">
          ID
        </label>
        <input required className={styles.inputStyle} type="text" name="loginId" />

        <label className={styles.labelStyle}>Nickname</label>
        <input required className={styles.inputStyle} type="text" name="nickname" />

        <label className={styles.labelStyle} htmlFor="loginPw">
          Password
        </label>
        <input required className={styles.inputStyle} type="password" name="loginPw" />

        <label className={styles.labelStyle} htmlFor="checkPw">
          Check Password
        </label>
        <input required className={styles.inputStyle} type="password" name="checkPw" />

        {isPending ? (
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>로딩중...</div>
        ) : (
          <div className={styles.buttonStyle} onClick={onSumbit}>
            회원가입
          </div>
        )}

        {!state?.status && state?.error && (
          <div style={{ color: 'red', marginTop: '10px', fontSize: '0.9rem' }}>
            {state?.error} {state?.el}
          </div>
        )}
      </form>
    </>
  );
}
