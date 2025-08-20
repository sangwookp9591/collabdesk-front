import Sidebar from '@/widgets/ui/Sidebar';
import SideMenu from '@/widgets/ui/SideMenu';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <header style={{ height: '40px', flexShrink: 0, backgroundColor: 'red' }}></header>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SideMenu />
        <Sidebar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>{children}</main>
      </div>
    </div>
  );
}
