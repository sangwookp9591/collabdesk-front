'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './sidemenu.css';
import { DirectMessageIcon, EllipsisIcon, HomeIcon } from '@/shared/ui';
import { Avatar } from '@/entities/user';
import { useSession } from 'next-auth/react';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { WorkspaceSwitcherModal } from '@/features/workspace-switcher';

const SideMenu = () => {
  const { data: session } = useSession();
  const { currentWorkspace } = useWorkspaceStore();

  const pathname = usePathname(); // 현재 URL 가져오기

  const path = useMemo(() => {
    if (!pathname.includes('dm') && !pathname.includes('page')) {
      return '/';
    } else if (pathname.includes('dm')) {
      return '/dm';
    } else if (pathname.includes('page')) {
      return '/page';
    }
  }, [pathname]);

  return (
    <div className={styles.sideMenu}>
      <div className={styles.topSection}>
        <div>
          <WorkspaceSwitcherModal />
        </div>
        <div className={styles.wsWrapper}>
          <Link
            href={`/workspace/${currentWorkspace?.slug}`}
            className={styles.workspace({ active: path === '/' })}
          >
            <HomeIcon size={20} />
            Home
          </Link>

          <Link href="/workspace/1/dm/1" className={styles.workspace({ active: path === '/dm' })}>
            <DirectMessageIcon size={20} />
            DM
          </Link>

          <Link
            href="/workspace/1/page/2"
            className={styles.workspace({ active: path === '/page' })}
          >
            <EllipsisIcon size={20} />더 보기
          </Link>
        </div>
      </div>

      <div className={styles.BottomSection}>
        <Avatar
          isActive={session?.user?.status === 'ONLINE'}
          profileImageUrl={session?.user?.profileImageUrl}
          name={session?.user?.name || ''}
          size={48}
        />
      </div>
    </div>
  );
};

export default SideMenu;
