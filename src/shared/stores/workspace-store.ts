'use client';

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Workspace } from '../types/workspace';

interface WorkspaceState {
  // State
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;

  // Actions
  setWorkspaces: (workspaces: Workspace[]) => void;
  setCurrentWorkspace: (workspaces: Workspace) => void;

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
        setWorkspaces: (workspaces) =>
          set((state) => {
            state.workspaces = workspaces;
          }),

        setCurrentWorkspace: (workspace) =>
          set((state) => {
            state.currentWorkspace = workspace;
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
