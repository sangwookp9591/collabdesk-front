import { Invite, WorkspaceJoinCard } from '@/features/onboarding-invite';

export default async function Page({ searchParams }: { searchParams: Promise<{ code: string }> }) {
  const { code } = await searchParams;

  if (code?.length === 6) {
    //초대 코드 서버에서 워크 스페이스 조회
    // 조회 실패 or 만료

    if (true) {
      return (
        <div>
          <h1>초대된 워크스페이스</h1>
          <WorkspaceJoinCard
            workspace={{
              id: '10',
              name: '심플 컴퍼니',
              image: '/images/workspace1.jpg',
              memberCount: 25,
              ownerId: '2',
            }}
          />
        </div>
      );
    }
  }

  return (
    <div>
      <h1>초대코드 직접입력</h1>
      <Invite initialCode={code} />
    </div>
  );
}
