'use client';

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Workspace } from '../types/workspace';
import { Channel } from '../types/channel';

interface WorkspaceState {
  // State
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  channels: Channel[];
  currentChannel: Channel | null;

  // Actions
  setWorkspaces: (workspaces: Workspace[]) => void;
  setCurrentWorkspace: (workspace: Workspace) => void;
  setChannels: (channels: Channel[]) => void;
  setCurrentChannel: (channel: Channel | null) => void;

  // Async Actions
  //   loadWorkspaces: () => Promise<void>;

  // Reset
  reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        workspaces: [],
        currentWorkspace: null,
        channels: [],
        currentChannel: null,
        setWorkspaces: (workspaces) =>
          set((state) => {
            state.workspaces = workspaces;
          }),
        setCurrentWorkspace: (workspace) =>
          set((state) => {
            state.currentWorkspace = workspace;
          }),
        setChannels: (channels) =>
          set((state) => {
            state.channels = channels;
          }),
        setCurrentChannel: (channel) =>
          set((state) => {
            state.currentChannel = channel;
          }),
        // Reset State
        reset: () =>
          set((state) => {
            state.workspaces = [];
            state.currentWorkspace = null;
          }),
      })),
    ),
    { name: 'workspace-store' },
  ),
);
