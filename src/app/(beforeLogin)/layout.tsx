import { ReactNode } from 'react';
import * as styles from '@/app/(beforeLogin)/auth-layout.css';
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      {/* 왼쪽 브랜드 영역 */}
      <section className={styles.leftSection}>Collabdesk</section>

      {/* 오른쪽 로그인 폼 영역 */}
      <div className={styles.rightSection}>{children}</div>
    </div>
  );
}
