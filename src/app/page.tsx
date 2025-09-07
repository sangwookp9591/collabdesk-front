import { redirect } from 'next/navigation';
import { getSession } from '@/shared/lib';
import { userApi } from '@/entities/user';
import { Suspense } from 'react';
import { LoadingConent } from '@/shared/ui';
import { PageRoute } from '@/features/page-route';

export default async function HomePage() {
  const session = await getSession();

  console.log('session : ', session);
  if (!session?.user) {
    redirect('/signin');
  }

  const result = await userApi.lastworkspace();

  return (
    <Suspense
      fallback={
        <LoadingConent
          mainTitle="이용자 정보를 불러오는 중..."
          subTitle="잠시만 기다려 주세요"
          cardTitle="사용자 인증 확인"
          cardSubtitle="워크스페이스 정보를 가져오고 있습니다<"
        />
      }
    >
      <PageRoute
        path={
          result.data?.lastActiveWorkspaceId
            ? `/workspace/${result?.data?.workspaceSlug}`
            : '/onboarding/workspace-setup'
        }
      />
    </Suspense>
  );
}
