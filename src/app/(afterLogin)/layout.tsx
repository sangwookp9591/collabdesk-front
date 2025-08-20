import Sidebar from '@/widgets/ui/Sidebar';
import SideMenu from '@/widgets/ui/SideMenu';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>
        <div
          style={{
            width: '100vh',
            height: '30px',
            backgroundColor: 'red',
          }}
        ></div>
      </header>
      <div style={{ display: 'flex', height: '100vh' }}>
        <SideMenu />
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
