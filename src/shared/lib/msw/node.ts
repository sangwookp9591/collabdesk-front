import { setupServer } from 'msw/node';
import { authHandlers } from './handlers/auth';
import { oauthHandlers } from './handlers/oauth';

export const server = setupServer(...authHandlers, ...oauthHandlers);
