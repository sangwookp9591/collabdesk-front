import { ReactNode } from 'react';
import AuthGuard from '../../features/auth/ui/AuthGuard';

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
