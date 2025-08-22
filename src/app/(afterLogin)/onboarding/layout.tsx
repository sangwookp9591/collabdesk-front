import { LogoutButton } from '@/features/auth';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
          <LogoutButton />
        </div>
      </header>
      {children}
    </>
  );
}
