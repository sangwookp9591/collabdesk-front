'use client';

import { userApi } from '@/entities/user/api/userApi';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Avatar } from '@/entities/workspace';

export default function Page() {
  const { data: session } = useSession();
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    if (session?.user) {
      const fn = async () => {
        const workspaces = await userApi.getUserWorkspaces(session.user.id);
        console.log('workspaces : ', workspaces);
        setWorkspaces(workspaces?.workspaces);
      };
      fn();
    }
  }, [session?.user]);

  if (!session?.user) {
    return (
      <div>
        <div>보유한 workspace 없음</div>
      </div>
    );
  }

  return (
    <div>
      <div>워크 스페이스 선택</div>
      <div>
        {workspaces?.map((item: any) => (
          <div key={item?.id}>
            <Avatar url={item?.imageUrl} name={item?.name} size={50} />
          </div>
        ))}
      </div>
    </div>
  );
}
