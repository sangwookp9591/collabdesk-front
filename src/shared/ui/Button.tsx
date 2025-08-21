import * as styles from './button.css';

type buttonProps = {
  title: string;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onDoubleClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  role?: string; // 기본은 button
  tabIndex?: number; // 기본은 0
};

export default function Button({
  title,
  width,
  height,
  backgroundColor,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onDoubleClick,
  onFocus,
  onBlur,
  role = 'button',
  tabIndex = 0,
}: buttonProps) {
  const buttonBaseStyle: React.CSSProperties = {
    width,
    height,
    backgroundColor,
    ...style,
  };
  return (
    <div
      className={styles.button}
      style={buttonBaseStyle}
      role={role}
      tabIndex={tabIndex}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDoubleClick={onDoubleClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(); // 키보드에서도 클릭되게
        }
      }}
    >
      {title}
    </div>
  );
}
