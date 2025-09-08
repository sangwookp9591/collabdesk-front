'use client';

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Workspace, WorkspaceMember } from '../types/workspace';
import { Channel } from '../types/channel';
import { DMConversation } from '@/entities/dm';
import { UserStatus } from '../types/user';
interface Status {
  userId: string;
  status: UserStatus;
  customMessage?: string;
  lastActiveAt: Date;
}
interface WorkspaceState {
  // State
  isInitialized: boolean;
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  workspaceMembers: WorkspaceMember[];
  channels: Channel[];
  currentChannel: Channel | null;
  dms: DMConversation[];
  currentDm: DMConversation | null;
  userStatuses: Record<string, Status>;

  // Actions
  setInitialized: (flag: boolean) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setCurrentWorkspace: (workspace: Workspace) => void;
  setWorkspaceMembers: (workspaceMembers: WorkspaceMember[]) => void;
  addWorkspace: (workspace: Workspace) => void;
  setChannels: (channels: Channel[]) => void;
  setCurrentChannel: (channel: Channel | null) => void;
  addChannel: (channel: Channel) => void;
  deleteChannel: (channelId: string) => void;
  setDms: (dms: DMConversation[]) => void;
  setCurrentDm: (dm: DMConversation | null) => void;
  addDm: (dm: DMConversation) => void;
  deleteDm: (dmId: string) => void;
  setUserStatuses: (userStatuses: Record<string, Status>) => void;
  updateUserStatus: (updateData: Status) => void;

  // Async Actions
  //   loadWorkspaces: () => Promise<void>;

  // Getters
  getCurrentWorkspaceId: () => string | null;
  getCurrentChannelId: () => string | null;
  getCurrentDmId: () => string | null;
  getMemberStatus: (userId: string) => UserStatus;
  // Reset
  reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        isInitialized: false,
        workspaces: [],
        workspaceMembers: [],
        currentWorkspace: null,
        channels: [],
        currentChannel: null,
        dms: [],
        currentDm: null,
        userStatuses: {},
        setInitialized: (flag) =>
          set((state) => {
            state.isInitialized = flag;
          }),
        setWorkspaces: (workspaces) =>
          set((state) => {
            state.workspaces = workspaces;
          }),
        setCurrentWorkspace: (workspace) =>
          set((state) => {
            state.currentWorkspace = workspace;
          }),
        setWorkspaceMembers: (workspaceMembers) =>
          set((state) => {
            state.workspaceMembers = workspaceMembers;
          }),
        addWorkspace: (workspace) =>
          set((state) => {
            const exists = state.workspaces.some((ws) => ws.id === workspace.id);
            if (!exists) {
              state.workspaces.push(workspace);
            }
          }),
        setChannels: (channels) =>
          set((state) => {
            state.channels = channels;
          }),
        setCurrentChannel: (channel) =>
          set((state) => {
            state.currentChannel = channel;
          }),
        addChannel: (channel) =>
          set((state) => {
            const exists = state.channels.some((ch) => ch.id === channel.id);
            if (!exists) {
              state.channels.push(channel);
            }
          }),
        deleteChannel: (channelId: string) =>
          set((state) => {
            const fitlerChannels = state.channels.filter((ch) => ch.id !== channelId);
            state.channels = fitlerChannels;
          }),
        setDms: (dms) =>
          set((state) => {
            state.dms = dms;
          }),
        setCurrentDm: (dm) =>
          set((state) => {
            state.currentDm = dm;
          }),
        addDm: (conversation) =>
          set((state) => {
            const exists = state.dms.some((dm) => dm.id === conversation.id);
            if (!exists) {
              state.dms.push(conversation);
            }
          }),
        deleteDm: (dmId: string) =>
          set((state) => {
            const fitlerDms = state.dms.filter((dm) => dm.id !== dmId);
            state.dms = fitlerDms;
          }),
        setUserStatuses: (userStatuses: Record<string, Status>) =>
          set((state) => {
            state.userStatuses = userStatuses ?? {};
          }),
        updateUserStatus: (updateData) =>
          set((state) => {
            state.userStatuses[updateData.userId] = {
              ...(state.userStatuses[updateData.userId] ?? {}),
              ...updateData,
            };
          }),
        getCurrentWorkspaceId() {
          const { currentWorkspace } = get();
          return currentWorkspace?.id ?? null;
        },
        getCurrentChannelId() {
          const { currentChannel } = get();
          return currentChannel?.id ?? null;
        },
        getCurrentDmId() {
          const { currentDm } = get();
          return currentDm?.id ?? null;
        },
        getWorkspaceMember(userId: string) {
          const { workspaceMembers } = get();
          workspaceMembers.find((member) => member.userId === userId);
          return workspaceMembers.find((member) => member.userId === userId);
        },
        getMemberStatus(userId: string) {
          const { userStatuses } = get();
          return userStatuses[userId]?.status ?? 'OFFLINE';
        },

        // Reset State
        reset: () =>
          set((state) => {
            state.isInitialized = false;
            state.workspaces = [];
            state.currentWorkspace = null;
            state.workspaceMembers = [];
            state.channels = [];
            state.currentChannel = null;
            state.dms = [];
            state.currentDm = null;
            state.userStatuses = {};
          }),
      })),
    ),
    {
      name: 'workspace-store',
    },
  ),
);
