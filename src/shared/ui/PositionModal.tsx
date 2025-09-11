'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as styles from './modal.css';
import { CloseIcon } from './IconSvg';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  hasClose?: boolean;
}

export function PositionModal({
  children,
  open,
  onClose,
  hasClose = true,
  top,
  left,
  right,
  bottom,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className={styles.positionOverlay} onClick={onClose}>
      <div
        className={styles.positionFadeModal[open ? 'in' : 'out']}
        style={{ top: top, right: right, bottom: bottom, left: left }}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록
      >
        {hasClose && (
          <div
            style={{
              position: 'absolute',
              right: '10px',
              top: '25px',
              cursor: 'pointer',
            }}
          >
            <div onClick={onClose}>
              <CloseIcon size={25} color="black" />
            </div>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
