'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { apiFetch } from '@/shared/api';

export const WorkspaceInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();

  const { isInitialized, setInitialized, reset, setWorkspaces, setCurrentWorkspace, setChannels } =
    useWorkspaceStore();

  // 세션 변화 감지
  useEffect(() => {
    console.log('🔄 WorkspaceInitializer - 세션 상태:', { status, session: !!session });

    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      console.log('🚫 미인증 상태, 초기화 리셋');
      reset();
      router.push('/signin');
      return;
    }

    if (session && !isInitialized) {
      console.log('✅ 인증됨, 초기화 시작');
      // 여기서 워크스페이스 데이터 로딩 로직 추가 예정
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
        setChannels(result?.data?.currentWorkspace?.channels);
      };
      fn();
      setInitialized(true);
    }
  }, [
    params,
    session,
    status,
    isInitialized,
    reset,
    setInitialized,
    router,
    setWorkspaces,
    setCurrentWorkspace,
    setChannels,
  ]);

  // URL 변화 감지 (나중에 구현)
  useEffect(() => {
    if (isInitialized) {
      console.log('📍 URL 변화 감지:', params);
      // URL 기반 데이터 초기화 로직 추가 예정
    }
  }, [params, isInitialized]);

  return <>{children}</>;
};
