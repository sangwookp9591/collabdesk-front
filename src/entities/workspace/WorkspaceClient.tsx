'use client';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { useEffect } from 'react';

export function WorkspaceClient({ workspace, children }: any) {
  const { currentWorkspace, setCurrentWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (!currentWorkspace || currentWorkspace?.id !== workspace.id) {
      setCurrentWorkspace(workspace);
    }
  }, [workspace, currentWorkspace, setCurrentWorkspace]);

  return <>{children}</>;
}
