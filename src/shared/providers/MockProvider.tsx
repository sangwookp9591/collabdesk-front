'use client';

import { useEffect } from 'react';
import { worker } from '../lib/msw/browser';

export function MockProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (worker && process.env.NODE_ENV === 'development') {
      worker.start();
    }
  }, []);

  return <>{children}</>;
}
