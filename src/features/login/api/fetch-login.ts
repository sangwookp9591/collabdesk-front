'use server';

import { signIn } from 'next-auth/react';
import { LoginDTO } from '../model/type';

export async function fetchLogin({ email, password }: LoginDTO): Promise<any> {
  const res = await signIn('credentials', {
    redirect: false,
    email,
    password,
  });
  return res;
}
