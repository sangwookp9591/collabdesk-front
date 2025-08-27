'use client';

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Workspace } from '../types/workspace';
import { Channel } from '../types/channel';

interface WorkspaceState {
  // State
  isInitialized: boolean;
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  channels: Channel[];
  currentChannel: Channel | null;

  // Actions
  setInitialized: (flag: boolean) => void;
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
        isInitialized: false,
        workspaces: [],
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
            state.isInitialized = false;
            state.workspaces = [];
            state.currentWorkspace = null;
            state.channels = [];
            state.currentChannel = null;
          }),
      })),
    ),
    { name: 'workspace-store' },
  ),
);
