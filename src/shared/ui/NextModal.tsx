'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as styles from './modal.css';
import { useRouter } from 'next/navigation';
import { CloseIcon } from './IconSvg';

interface ModalProps {
  children: ReactNode;
}

export function NextModal({ children }: ModalProps) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const closeModal = useCallback(() => {
    router.back(); // 이전 페이지로 돌아가면서 Modal 닫기
  }, [router]);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록
      >
        <div
          style={{
            position: 'absolute',
            right: '10px',
            top: '25px',
          }}
        >
          <div onClick={closeModal}>
            <CloseIcon size={25} color="black" />
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
