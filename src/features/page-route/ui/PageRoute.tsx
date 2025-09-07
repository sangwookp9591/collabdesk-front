'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function PageRoute({ path }: { path: string }) {
  const router = useRouter();
  useEffect(() => {
    if (path) {
      router.replace(path);
    }
  }, [path, router]);

  return <div></div>;
}
