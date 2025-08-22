'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from './options';

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
