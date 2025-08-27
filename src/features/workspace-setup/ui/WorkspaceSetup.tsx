'use client';

import { useEffect, useState } from 'react';
import { InfoCard, InfoCardSkeleton } from '@/entities/workspace';
import * as styles from './workspace-setup.css';
import { PlusIcon } from '@/shared/ui';
import { themeTokens } from '@/shared/styles';
import { Session } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
import fetchUserWorkspaces from '../api/user-workspaces';
import { updateLastWorkspace } from '@/shared/api';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { Workspace } from '@/shared/types/workspace';

export default function WorkspaceSetup({ session }: { session: Session }) {
  const router = useRouter();

  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const setWorkspacesStore = useWorkspaceStore((state) => state.setWorkspaces);
  const setCurrentWorkspace = useWorkspaceStore((state) => state.setCurrentWorkspace);

  useEffect(() => {
    const fn = async () => {
      if (session?.user) {
        const res = await fetchUserWorkspaces(session?.user?.accessToken);

        console.log('res : ', res);
        if (res?.ok) {
          const result = await res.json();
          console.log('workspaces : ', result);
          setWorkspaces(result?.data?.workspaces);
          setWorkspacesStore(result?.data?.workspaces);
          setIsLoading(false);
        }
      }
    };

    fn();
  }, [session?.user]);

  const onClick = async (workspace: Workspace, slug: string) => {
    await updateLastWorkspace(workspace?.id);
    setCurrentWorkspace(workspace);
    redirect(`/workspace/${slug}`);
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>워크스페이스 선택</h1>
        <div className={styles.boxContainer} onClick={() => router.push('/workspace/create')}>
          <PlusIcon size={30} color={themeTokens.colors.text} />
        </div>
      </div>
      <div className={styles.workspaceList}>
        {isLoading ? (
          <>
            {Array(3).map((_, i) => (
              <InfoCardSkeleton key={i} />
            ))}
          </>
        ) : (
          workspaces?.length > 0 &&
          workspaces?.map((item: any) => (
            <InfoCard
              key={item?.workspace?.id}
              className={styles.workspaceContainer}
              workspace={item?.workspace}
              onClick={onClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
