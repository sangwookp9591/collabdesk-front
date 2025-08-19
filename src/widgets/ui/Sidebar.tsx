'use client';

import { style } from '@vanilla-extract/css';
import { useState, useRef } from 'react';

export const sidebarStyle = style({
  backgroundColor: '#350d36',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '20px',
  position: 'relative',
});

export const resizerStyle = style({
  width: '5px',
  cursor: 'ew-resize',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'transparent',
});

export default function Sidebar() {
  const [width, setWidth] = useState(80);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const newWidth = e.clientX;
    if (newWidth > 50 && newWidth < 300) {
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
    <div ref={sidebarRef} className={sidebarStyle} style={{ width }}>
      {/* Workspace 아이콘 등 */}
      <div style={{ marginBottom: '20px', color: 'white' }}>WS</div>

      {/* 드래그용 Resizer */}
      <div className={resizerStyle} onMouseDown={onMouseDown} />
    </div>
  );
}
