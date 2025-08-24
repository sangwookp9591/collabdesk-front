'use client';

import { redirect } from 'next/navigation';
import { useActionState, useEffect, useRef, useState } from 'react';

import { signupAction } from '@/features/signup/action';
import Image from 'next/image';
import { formBasicStyle as styles } from '@/shared/styles';

export default function SignupForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(signupAction, null);

  // 프로필 이미지 관련 상태
  const [imagePreview, setImagePreview] = useState<string>('https://i.pravatar.cc/100?img=4');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (state?.status) {
      redirect('/');
    }
  }, [state?.status]);

  // 이미지 선택 시 미리보기 업데이트
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 폼 제출
  const onSubmit = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    if (imageFile) {
      formData.append('profileImage', imageFile); // 파일 추가
    }

    // action 실행
    formAction(formData);
  };

  return (
    <form ref={formRef} action={formAction} className={styles.formStyle}>
      {/* 프로필 이미지 */}
      <div
        className={styles.profileWrapper}
        onClick={() => fileInputRef.current?.click()}
        style={{ cursor: 'pointer', marginBottom: '20px' }}
      >
        <Image
          src={imagePreview}
          alt="profile"
          className={styles.profileImage}
          width={80}
          height={80}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
          name="profile"
        />
      </div>

      {/* email */}
      <label className={styles.labelStyle} htmlFor="email">
        EMAIL
      </label>
      <input required className={styles.inputStyle} type="text" name="email" />

      {/* name */}
      <label className={styles.labelStyle}>Nickname</label>
      <input required className={styles.inputStyle} type="text" name="name" />

      {/* Password */}
      <label className={styles.labelStyle} htmlFor="password">
        Password
      </label>
      <input required className={styles.inputStyle} type="password" name="password" />

      {/* Check Password */}
      <label className={styles.labelStyle} htmlFor="confirmPassword">
        Check Password
      </label>
      <input required className={styles.inputStyle} type="password" name="confirmPassword" />

      {/* 버튼 */}
      {isPending ? (
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>로딩중...</div>
      ) : (
        <div className={styles.buttonStyle} onClick={onSubmit}>
          회원가입
        </div>
      )}

      {/* 에러 메시지 */}
      {!state?.status && state?.error && (
        <div style={{ color: 'red', marginTop: '10px', fontSize: '0.9rem' }}>
          {state?.error} {state?.el}
        </div>
      )}
    </form>
  );
}
