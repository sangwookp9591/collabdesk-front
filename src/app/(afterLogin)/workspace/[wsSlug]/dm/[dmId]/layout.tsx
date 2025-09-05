'use client';

import * as styles from './layout.css';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import DmInitializer from '@/features/dm-initializer/DmInitializer';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDmDetail = /\/dm\/[^/]+$/.test(pathname);

  if (!isDmDetail) {
    return null;
  }

  return (
    <>
      <DmInitializer>
        <div className={styles.dmPage}>{children}</div>
      </DmInitializer>
    </>
  );
}
