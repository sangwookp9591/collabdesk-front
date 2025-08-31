'use client';

import { useSession } from 'next-auth/react';
import { redirect, useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
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
        redirect('/signin');
      }
      console.log('pathname : ', pathname);
      // router.push('/signin');
    }
  }, [session, status, router, pathname, searchParams]);

  return <>{children}</>;
}
