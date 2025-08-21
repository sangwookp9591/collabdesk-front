import { Sidebar, SideMenu } from '@/widgets/sidebar';
import { Header } from '@/widgets/layout';
import { ReactNode } from 'react';
import { themeTokens } from '@/shared/styles';

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
      <Header />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SideMenu />
        <Sidebar />
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            backgroundColor: themeTokens.colors.background,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
