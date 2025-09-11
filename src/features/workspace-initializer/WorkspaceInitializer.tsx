'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { queries } from '@/entities/channel';
import { useWorkspaceInitBySlug, useWorkspaceMembersBySlug } from './model/workspace-init.queries';
import { LoadingConent } from '@/shared/ui';

function contentsLoadingMessage(ws: boolean, ch: boolean, mb: boolean) {
  if (ws) {
    return '워크스페이스를 불러오는 중입니다.';
  } else if (ch) {
    return '채널을 불러오는 중입니다.';
  } else {
    return '멤버를 불러오는 중입니다.';
  }
}

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
    setNotifications,
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
      setNotifications(workspaceData.notifications);
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
    setNotifications,
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
      router.replace('/signin');
    }
  }, [status, reset, router]);

  if (wsLoading || chLoading || mbLoading) {
    return (
      <LoadingConent
        mainTitle="이용자 정보를 불러오는 중..."
        subTitle="잠시만 기다려 주세요"
        cardTitle="컨텐츠 로딩"
        cardSubtitle={contentsLoadingMessage(wsLoading, chLoading, mbLoading)}
      />
    );
  }

  return <>{children}</>;
};
