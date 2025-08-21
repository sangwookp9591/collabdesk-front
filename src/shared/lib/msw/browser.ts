// shared/lib/msw/browser.ts
import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth';
import { oauthHandlers } from './handlers/oauth';

export let worker: ReturnType<typeof setupWorker> | undefined;

if (typeof window !== 'undefined') {
  worker = setupWorker(...authHandlers, ...oauthHandlers);
}
