'use client';

import { useEffect } from 'react';

export function MockProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // 동적 import로 번들 사이즈 최적화
      import('../../shared/lib/msw/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass',
        });
      });
    }
  }, []);

  return <>{children}</>;
}
