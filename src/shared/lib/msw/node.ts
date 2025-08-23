import { setupServer } from 'msw/node';
import { authHandlers } from './handlers/auth';
import { oauthHandlers } from './handlers/oauth';
import { userHandlers } from './handlers/user';
import { workspaceHandlers } from './handlers/workspace';

export const server = setupServer(
  ...authHandlers,
  ...oauthHandlers,
  ...userHandlers,
  ...workspaceHandlers,
);
