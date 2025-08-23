import { LogoutButton } from '@/features/auth';
import { ReactNode } from 'react';
import * as styles from './layout.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.hedaer}>
          <div>
            <LogoutButton />
          </div>
        </header>
        <div className={styles.mainContainer}>
          {/* 왼쪽 브랜드 영역 */}
          <section className={styles.leftSection}>Collabdesk</section>

          {/* 오른쪽 로그인 폼 영역 */}
          <div className={styles.rightSection}>{children}</div>
        </div>
      </div>
    </>
  );
}
