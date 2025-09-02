'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { queries } from '@/entities/channel';
import { useWorkspaceInitBySlug } from './model/workspace-init.queries';

export const WorkspaceInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const wsSlug = params?.wsSlug as string;

  const { isInitialized, setInitialized, reset, setWorkspaces, setCurrentWorkspace, setChannels } =
    useWorkspaceStore();

  // 워크스페이스 조회
  const {
    data: workspaceData,
    isLoading: wsLoading,
    isError: wsError,
  } = useWorkspaceInitBySlug(wsSlug);

  console.log('workspaceData : ', workspaceData);
  // 채널 조회 (wsSlug 기반)
  const {
    data: channelsData,
    isLoading: chLoading,
    isError: chError,
  } = queries.useChannels(workspaceData?.currentWorkspace?.id);

  // 둘 다 로딩 완료되면 zustand 업데이트
  useEffect(() => {
    if (
      workspaceData &&
      channelsData &&
      !isInitialized &&
      !wsLoading &&
      !chLoading &&
      !wsError &&
      !chError
    ) {
      setWorkspaces(workspaceData.workspaces);
      setCurrentWorkspace(workspaceData.currentWorkspace);
      setChannels(channelsData);
      setInitialized(true);
    }
  }, [
    workspaceData,
    channelsData,
    isInitialized,
    wsLoading,
    chLoading,
    wsError,
    chError,
    setWorkspaces,
    setCurrentWorkspace,
    setChannels,
    setInitialized,
  ]);

  // 세션 미인증 처리
  useEffect(() => {
    if (status === 'unauthenticated') {
      reset();
      router.push('/signin');
    }
  }, [status, reset, router]);

  return <>{children}</>;
};
