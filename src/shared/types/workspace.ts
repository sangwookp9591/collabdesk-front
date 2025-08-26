import type { User } from './user';

export type WorkspaceRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  members?: WorkspaceMember[];
  owner?: User;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
  joinedAt: Date;
  user?: User;
  workspace?: Workspace;
}
