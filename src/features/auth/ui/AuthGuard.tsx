'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('session?.user : ', session?.user, status);

    if (status === 'loading') {
      return;
    }
    if (!session?.user) {
      if (
        pathname === '/onboarding/invite' &&
        searchParams.get('type') &&
        searchParams.get('code')
      ) {
        localStorage.setItem(
          'invite-path',
          `${pathname}?type=${searchParams.get('type')}&code=${searchParams.get('code')}`,
        );
      }
      console.log('리다이렉트');
      router.replace('/signin');
    }
  }, [session, status, router, pathname, searchParams]);

  if (status === 'loading') {
    return null; // 로딩 화면 표시 가능
  }

  if (status === 'unauthenticated') {
    return null; // 페이지 렌더링 차단 후 useEffect에서 이동 처리
  }

  return <>{children}</>;
}
