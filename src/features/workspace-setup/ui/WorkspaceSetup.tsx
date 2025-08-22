'use client';

import { userApi } from '@/entities/user/api/userApi';
import { useEffect, useState } from 'react';
import { Avatar } from '@/entities/workspace';
import * as styles from './workspace-setup.css';
import Image from 'next/image';
import { PlusIcon } from '@/shared/ui';
import { themeTokens } from '@/shared/styles';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { Skeleton } from 'sw-skeleton';

export default function WorkspaceSetup({ session }: { session: Session }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      const workspaces = await userApi.getUserWorkspaces(session.user.id);
      console.log('workspaces : ', workspaces);
      setWorkspaces(workspaces?.workspaces);
      setIsLoading(false);
    };
    fn();
  }, [session?.user]);

  const onClick = (workspaceId: string) => {
    redirect(`/workspace/${workspaceId}`);
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>워크스페이스 선택</h1>
        <div className={styles.boxContainer}>
          <PlusIcon size={30} color={themeTokens.colors.text} />
        </div>
      </div>
      <div className={styles.workspaceList}>
        {!isLoading ? (
          <>
            {Array(3).map((_, i) => (
              <div key={i} className={styles.skeletonContainer}>
                <Skeleton width={50} height={50} style={{ borderRadius: '5px' }}></Skeleton>
                <div className={styles.workspaceInfo}>
                  <div className={styles.workspaceName}>
                    <Skeleton width={100} height={20} style={{ borderRadius: '5px' }}></Skeleton>
                  </div>
                  <div className={styles.workspaceMemberCount}>
                    <Skeleton width={40} height={20} style={{ borderRadius: '5px' }}></Skeleton>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          workspaces?.map((item: any) => (
            <div
              key={item?.id}
              className={styles.workspaceContainer}
              onClick={() => onClick(item?.id)}
            >
              <Avatar url={item?.image} name={item?.name} size={50} />
              <div className={styles.workspaceInfo}>
                <div className={styles.workspaceName}>{item?.name}</div>
                <div className={styles.workspaceMemberCount}>
                  <Image src={'/images/members-2.svg'} width={20} height={20} alt="" />
                  {item?.memberCount}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
