import * as styles from './dotLoading.css';

export const DotLoading = ({ size }: { size: number }) => {
  return (
    <div className={styles.dotsContainer}>
      <span
        className={styles.dot1}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></span>
      <span
        className={styles.dot2}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></span>
      <span
        className={styles.dot3}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></span>
    </div>
  );
};
