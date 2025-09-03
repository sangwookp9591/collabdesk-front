'use client';

import { buttonStyle, inputStyle, labelStyle } from '@/shared/styles/form-basic.css';
import Image from 'next/image';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createWorkspaceAction } from '../model/createWorkspaceAction';

export default function WorkspaceCreateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createWorkspaceAction, null);
  const [preview, setPreview] = useState<string | null>(null);

  // 파일 선택 핸들러
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 폼 제출
  const onSubmit = () => {
    if (!formRef.current) {
      return;
    }
    formRef.current.requestSubmit();
  };

  useEffect(() => {
    if (state?.status) {
      router.replace(`/workspace/${state.workspace?.slug}`);
    }
  }, [state?.status]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 800,
        }}
      >
        워크스페이스 생성
      </div>
      <div style={{ borderBottom: '1px solid #2e2e2e' }}></div>
      <form
        ref={formRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'none',
          gap: '10px',
        }}
        action={formAction}
      >
        {/* 이미지 업로드 */}
        <label className={labelStyle} htmlFor="image">
          Profile Image
        </label>
        <div style={{ display: 'flex' }}>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '12px',
              objectFit: 'cover',
              border: '2px solid rgba(0,0,0,0.1)',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.6rem',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={onFileChange}
              style={{
                display: 'none',
              }}
            />
            {preview && (
              <Image
                src={preview}
                alt="preview"
                width={70}
                height={70}
                style={{
                  borderRadius: '12px',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
        </div>
        <label className={labelStyle} htmlFor="name">
          Name
        </label>
        <input className={inputStyle} name="name" />
        {/* 버튼 */}
        {isPending ? (
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>로딩중...</div>
        ) : (
          <div className={buttonStyle} onClick={onSubmit}>
            생성하기
          </div>
        )}
      </form>
    </div>
  );
}
