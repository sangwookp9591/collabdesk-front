import { userApi } from '@/entities/user/api/userApi';
import { getSession } from 'next-auth/react';

export default async function Page() {
  const session = await getSession();

  if (!session?.user) {
    return (
      <div>
        <div>보유한 workspace 없음</div>
      </div>
    );
  }
  const workspaces = await userApi.getUserWorkspaces(session.user.id);
  return (
    <div>
      <div>보유한 workspace있음.</div>
      <div>
        {workspaces?.map((item: any) => (
          <div key={item?.id}>{item?.name}</div>
        ))}
      </div>
    </div>
  );
}
