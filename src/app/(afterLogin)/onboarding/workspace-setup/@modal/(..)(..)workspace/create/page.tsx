'use client';

import WorkspaceCreateForm from '@/features/workspace-create/ui/WorkspaceCreateForm';
import { buttonStyle, inputStyle, labelStyle } from '@/shared/styles/form-basic.css';
import { NextModal } from '@/shared/ui';
import { useActionState, useRef } from 'react';

export default function Page() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(async () => {}, null);

  // 폼 제출
  const onSubmit = () => {
    if (!formRef.current) return;
  };

  return (
    <div>
      <NextModal>
        <WorkspaceCreateForm />
      </NextModal>
    </div>
  );
}
