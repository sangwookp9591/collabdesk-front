import { AuthGuard } from '@/features/auth';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthGuard fallback={<div>loading</div>}>{children}</AuthGuard>;
}
