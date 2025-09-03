'use client';

import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { formBasicStyle as styles } from '@/shared/styles';
import Link from 'next/link';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn('credentials', {
      redirect: false, // NextAuth 자동 리다이렉트 막기
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (res?.ok) {
      const invitePath = localStorage.getItem('invite-path');
      if (!invitePath) {
        redirect('/');
      } else {
        localStorage.removeItem('invite-path');
        redirect(invitePath);
      }
    } else {
      setError(res?.error || '로그인 실패');
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.formStyle}>
      <label>Email</label>
      <input required className={styles.inputStyle} type="text" name="email" />

      <label>Password</label>
      <input required className={styles.inputStyle} type="password" name="password" />

      <button type="submit" className={styles.buttonStyle}>
        로그인
      </button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

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
  );
}
