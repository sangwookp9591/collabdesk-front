'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import * as styles from './sidemenu.css';
import { DirectMessageIcon, EllipsisIcon, HomeIcon } from '@/shared/ui';
import { Avatar } from '@/entities/user';
import { Avatar as WorkspaceAvatar } from '@/entities/workspace';
import { useSession } from 'next-auth/react';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { apiFetch } from '@/shared/api';

const SideMenu = () => {
  const { data: session } = useSession();
  const params = useParams();
  const { workspaces, setWorkspaces, currentWorkspace, setCurrentWorkspace } = useWorkspaceStore();

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

  console.log('pathname : ', pathname);
  console.log('params: ', params);
  // 초기 워크스페이스 로드
  useEffect(() => {
    if (workspaces.length === 0 && session?.user) {
      const wsSlug = params?.wsSlug as string;

      const fn = async () => {
        const res = await apiFetch(`/workspace/${wsSlug}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.user?.accessToken}`,
          },
        });
        const result = await res.json();
        console.log('result : ', result);
        setWorkspaces(result?.data.workspaces);
        setCurrentWorkspace(result?.data.currentWorkspace);
      };
      fn();
    }
  }, [session?.user, params?.wsSlug, setWorkspaces, setCurrentWorkspace]);

  return (
    <div className={styles.sideMenu}>
      <div className={styles.topSection}>
        {/* <div className={styles.wsAvatar}>BLInk</div> */}
        <WorkspaceAvatar
          url={currentWorkspace?.imageUrl}
          name={currentWorkspace?.name || ''}
          size={48}
        />
        <div className={styles.wsWrapper}>
          <Link
            href="/workspace/1/channel/1"
            className={styles.workspace({ active: path === '/' })}
          >
            <HomeIcon size={20} />
            SW
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
