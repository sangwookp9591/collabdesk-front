'use client';

import { InfoCard, InfoCardSkeleton, useUserWorkspaces } from '@/entities/workspace';
import * as styles from './workspace-setup.css';
import { PlusIcon } from '@/shared/ui';
import { themeTokens } from '@/shared/styles';
import { useRouter } from 'next/navigation';
import { Workspace } from '@/shared/types/workspace';
import { useUpdateLastWorkspace } from '@/entities/user';

export default function WorkspaceSetup() {
  const router = useRouter();

  const { data: workspaces, isLoading, error } = useUserWorkspaces();

  const { mutate: updateLastWorkspace, isPending } = useUpdateLastWorkspace(() => {
    // 성공 후 처리 (예: 리다이렉트)
    console.log('워크스페이스 업데이트 성공');
  });

  const onClick = (workspace: Workspace, slug: string) => {
    updateLastWorkspace(workspace.id, {
      onSuccess: () => {
        router.replace(`/workspace/${slug}`);
      },
    });
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
