import * as styles from './dotLoading.css';

export const DotLoading = ({
  size,
  backgroundColor = '#2563eb',
}: {
  size: number;
  backgroundColor?: string;
}) => {
  return (
    <div className={styles.dotsContainer}>
      <span
        className={styles.dot1}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: backgroundColor,
        }}
      ></span>
      <span
        className={styles.dot2}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: backgroundColor,
        }}
      ></span>
      <span
        className={styles.dot3}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: backgroundColor,
        }}
      ></span>
    </div>
  );
};
