import { ReactNode } from 'react';

export default function Layout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <>
      {/* 오른쪽 로그인 폼 영역 */}
      <div>
        {children}
        {modal}
      </div>
    </>
  );
}
