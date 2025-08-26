'use client';

import { WorkspaceCreateForm } from '@/features/workspace-create';
import { NextModal } from '@/shared/ui';

export default function Page() {
  return (
    <div>
      <NextModal>
        <WorkspaceCreateForm />
      </NextModal>
    </div>
  );
}
