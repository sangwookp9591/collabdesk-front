'use client';

import { Button } from '@/shared/ui';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const onClick = async () => {
    await signOut({ callbackUrl: '/signin' }); // 로그아웃 후 /signin 이동
  };
  return <Button title="logout" onClick={onClick}></Button>;
}
