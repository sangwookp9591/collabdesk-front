// 📁 shared/lib/msw/browser.ts
import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth';
import { oauthHandlers } from './handlers/oauth';

export const worker = setupWorker(...[...authHandlers, ...oauthHandlers]);

// 개발 환경에서만 실행
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass', // 핸들링되지 않은 요청은 그대로 통과
  });
}
