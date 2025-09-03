import { Workspace, WorkspaceMember } from './workspace';

// shared/types/user.ts
export type UserStatus = 'ONLINE' | 'AWAY' | 'OFFLINE' | 'DO_NOT_DISTURB';

export interface User {
  id: string;
  email: string;
  name?: string;
  password?: string;
  profileImageUrl?: string;
  profileImagePath?: string;
  status: UserStatus;
  lastActiveAt: Date;
  lastActiveWorkspaceId?: string;
  createdAt: Date;
  updatedAt: Date;
  accounts?: Account[];
  refreshTokens?: RefreshToken[];
  workspaceMembers?: WorkspaceMember[];
  ownedWorkspaces?: Workspace[];
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: number;
  tokenType?: string;
  scope?: string;
  idToken?: string;
  sessionState?: string;
  user?: User;
}

export interface RefreshToken {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  user?: User;
}
