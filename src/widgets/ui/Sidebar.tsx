'use client';

import * as styles from './sidebar.css';
import { useState, useRef } from 'react';

export default function Sidebar() {
  const [width, setWidth] = useState(300);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const newWidth = e.clientX;
    if (newWidth > 100 && newWidth < 300) {
      // 최소/최대 너비 제한
      setWidth(newWidth);
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  // 이벤트 등록
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  return (
    <div>
      <div ref={sidebarRef} className={styles.sidebarStyle} style={{ width }}>
        {/* Workspace 아이콘 등 */}
        <div style={{ marginBottom: '20px', color: 'white' }}>Ws Name</div>

        {/* 드래그용 Resizer */}
        <div className={styles.resizerStyle} onMouseDown={onMouseDown} />
      </div>
    </div>
  );
}
