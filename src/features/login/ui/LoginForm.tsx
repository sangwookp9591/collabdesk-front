'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { formBasicStyle as styles } from '@/shared/styles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await signIn('credentials', {
        redirect: false, // NextAuth 자동 리다이렉트 막기
        email: formData.get('email'),
        password: formData.get('password'),
      });

      console.log('res : ', res);

      if (res?.ok) {
        const invitePath = localStorage.getItem('invite-path');

        console.log('invitePath : ', invitePath);
        if (!invitePath) {
          router.replace('/');
        } else {
          localStorage.removeItem('invite-path');
          router.replace(invitePath);
        }
      }

      if (res?.error) {
        setError(res?.error || '로그인 실패');
        return;
      }
    } catch (error: any) {
      console.log('error :', error);
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

      {error && <div className={styles.errorMessageStyle}>{error}</div>}

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
