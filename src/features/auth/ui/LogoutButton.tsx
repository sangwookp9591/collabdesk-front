'use client';

import { Button } from '@/shared/ui';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function LogoutButton() {
  const onClick = () => {
    signOut();
    redirect('/signin');
  };
  return <Button title="logout" onClick={onClick}></Button>;
}
