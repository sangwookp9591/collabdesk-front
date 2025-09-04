'use client';

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Workspace, WorkspaceMember } from '../types/workspace';
import { Channel } from '../types/channel';

interface WorkspaceState {
  // State
  isInitialized: boolean;
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  workspaceMembers: WorkspaceMember[];
  channels: Channel[];
  currentChannel: Channel | null;

  // Actions
  setInitialized: (flag: boolean) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setCurrentWorkspace: (workspace: Workspace) => void;
  setWorkspaceMembers: (workspaceMembers: WorkspaceMember[]) => void;
  addWorkspace: (workspace: Workspace) => void;
  setChannels: (channels: Channel[]) => void;
  setCurrentChannel: (channel: Channel | null) => void;
  addChannel: (chaanel: Channel) => void;
  deleteChannel: (chaanelId: string) => void;

  // Async Actions
  //   loadWorkspaces: () => Promise<void>;

  // Getters
  getCurrentWorkspaceId: () => string | null;
  getCurrentChannelId: () => string | null;
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
        getCurrentWorkspaceId() {
          const { currentWorkspace } = get();
          return currentWorkspace?.id ?? null;
        },
        getCurrentChannelId() {
          const { currentChannel } = get();
          return currentChannel?.id ?? null;
        },
        getWorkspaceMember(userId: string) {
          const { workspaceMembers } = get();
          workspaceMembers.find((member) => member.userId === userId);
          return workspaceMembers.find((member) => member.userId === userId);
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
          }),
      })),
    ),
    {
      name: 'workspace-store',
    },
  ),
);
