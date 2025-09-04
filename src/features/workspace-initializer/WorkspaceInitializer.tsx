'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { queries } from '@/entities/channel';
import { useWorkspaceInitBySlug, useWorkspaceMembersBySlug } from './model/workspace-init.queries';

export const WorkspaceInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const wsSlug = params?.wsSlug as string;

  const {
    isInitialized,
    setInitialized,
    reset,
    setWorkspaces,
    setCurrentWorkspace,
    setChannels,
    setWorkspaceMembers,
  } = useWorkspaceStore();

  // 워크스페이스 조회
  const {
    data: workspaceData,
    isLoading: wsLoading,
    isError: wsError,
  } = useWorkspaceInitBySlug(wsSlug);

  // 채널 조회 (wsSlug 기반)
  const {
    data: channelsData,
    isLoading: chLoading,
    isError: chError,
  } = queries.useChannels(workspaceData?.currentWorkspace?.slug);

  const {
    data: memberData,
    isLoading: mbLoading,
    isError: mbError,
  } = useWorkspaceMembersBySlug(wsSlug);

  // 둘 다 로딩 완료되면 zustand 업데이트
  useEffect(() => {
    if (
      workspaceData &&
      channelsData &&
      memberData &&
      !isInitialized &&
      !wsLoading &&
      !chLoading &&
      !mbLoading &&
      !wsError &&
      !chError &&
      !mbError
    ) {
      setWorkspaces(workspaceData.workspaces);
      setCurrentWorkspace(workspaceData.currentWorkspace);
      setChannels(channelsData);
      setWorkspaceMembers(memberData);
      setInitialized(true);
    }
  }, [
    workspaceData,
    channelsData,
    memberData,
    isInitialized,
    wsLoading,
    chLoading,
    mbLoading,
    wsError,
    chError,
    mbError,
    setWorkspaces,
    setCurrentWorkspace,
    setWorkspaceMembers,
    setChannels,
    setInitialized,
  ]);

  //워크스페이스 슬러그 변경시 데이터 패칭 초기화
  useEffect(() => {
    reset();
    setInitialized(false);
  }, [wsSlug, reset, setInitialized]);

  // 세션 미인증 처리
  useEffect(() => {
    if (status === 'unauthenticated') {
      reset();
      console.log('사인인으로 이동');
      router.replace('/signin');
    }
  }, [status, reset, router]);

  if (status === 'loading') {
    return null; // 로딩 화면 표시 가능
  }

  if (status === 'unauthenticated') {
    return null; // 페이지 렌더링 차단 후 useEffect에서 이동 처리
  }

  return <>{children}</>;
};
