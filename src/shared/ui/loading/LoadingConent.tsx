// UserLoadingSpinner.tsx
import React from 'react';
import * as styles from './loadingConent.css';

interface LoadingContentProps {
  mainTitle: string;
  subTitle: string;
  cardTitle: string;
  cardSubtitle: string;
}
// 용자 정보를 불러오는 중..
export function LoadingConent({
  mainTitle,
  subTitle,
  cardTitle,
  cardSubtitle,
}: LoadingContentProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 스피너 */}
        <div className={styles.spinnerContainer}>
          <div className={styles.mainSpinner}></div>
          <div className={styles.pulseSpinner}></div>
        </div>

        {/* 로딩 텍스트 */}
        <div className={styles.textContainer}>
          <h2 className={styles.mainTitle}>{mainTitle}</h2>
          <div className={styles.dotsContainer}>
            <span className={styles.dot1}></span>
            <span className={styles.dot2}></span>
            <span className={styles.dot3}></span>
          </div>
          <p className={styles.subtitle}>{subTitle}</p>
        </div>

        {/* 추가 정보 카드 */}
        <div className={styles.infoCard}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.iconContainer}>
                <svg className={styles.icon} viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className={styles.textInfo}>
                <p className={styles.cardTitle}>{cardTitle}</p>
                <p className={styles.cardSubtitle}>{cardSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
