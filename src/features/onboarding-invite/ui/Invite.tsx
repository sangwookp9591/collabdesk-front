'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowRightIcon } from '@/shared/ui';
import * as styles from './invite.css';
import { useRouter } from 'next/navigation';

interface InviteProps {
  initialCode?: string;
}

export function Invite({ initialCode = '' }: InviteProps) {
  const [values, setValues] = useState(Array(6).fill(''));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const router = useRouter();

  // 초기값이 있으면 넣어주기
  useEffect(() => {
    if (initialCode) {
      const chars = initialCode.split('').slice(0, 6);
      setValues([...chars, ...Array(6 - chars.length).fill('')]);
    }
  }, [initialCode]);

  // 한 칸 입력 시
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9a-zA-Z]/, '');

    const newValues = [...values];

    if (!val) {
      // 삭제 처리
      newValues[idx] = '';
      setValues(newValues);
      return;
    }

    // 일반 입력 처리
    newValues[idx] = val[0];
    setValues(newValues);

    // 다음 input 포커스
    if (idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    } else {
      handleSubmit(newValues.join(''));
    }
  };

  // Backspace 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newValues = [...values];
      if (values[idx]) {
        newValues[idx] = '';
        setValues(newValues);
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        newValues[idx - 1] = '';
        setValues(newValues);
      }
    }
  };

  // 붙여넣기 처리
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').slice(0, 6);
    const chars = paste.split('');
    const newValues = [...values];
    chars.forEach((c, i) => (newValues[i] = c));
    setValues(newValues);
    handleSubmit(newValues.join(''));
    e.preventDefault();
  };

  const handleSubmit = (code: string) => {
    console.log('인증코드 제출:', code);
  };

  const onClick = (e: any) => {
    if (values.join('').length === 6) {
      const code = values.join('');
      router.replace(`/onboarding/invite?code=${code}`);
    }
  };

  return (
    <div className={styles.boxStyle}>
      <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
        {values.map((v, idx) => (
          <input
            key={idx}
            className={styles.inputStyle}
            onPaste={handlePaste}
            type="text"
            maxLength={1}
            value={v}
            ref={(el: any) => (inputsRef.current[idx] = el!)}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          />
        ))}
        <div className={styles.buttonStyle} onClick={onClick}>
          <ArrowRightIcon size={50} color="black" />
        </div>
      </div>
    </div>
  );
}
