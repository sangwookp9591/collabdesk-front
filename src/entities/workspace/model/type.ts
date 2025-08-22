import { Channel } from '@/entities/channel';

export interface Workspace {
  id: string;
  name: string;
}

export interface WorkspaceSidebar {
  id: string;
  name: string;
  channels: Channel[];
  dms: { id: string; name: string; email: string }[];
}
