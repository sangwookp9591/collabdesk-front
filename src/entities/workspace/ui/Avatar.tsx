import Image from 'next/image';
import * as styles from './avatar.css';
import { colorUtils } from '@/shared/lib';

interface AvatarProps {
  url?: string;
  name: string;
  size?: 28 | 32 | 36 | 48;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Avatar({
  url,
  name,
  size = 48,
  isActive = false,
  onClick,
  className = '',
}: AvatarProps) {
  const bgColor = colorUtils.stringToColor(name || '');
  const bgColorGradient = colorUtils.stringToGradient(name || '');

  const initials =
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || '?';
  const fontSize = size * 0.4;

  return (
    <div className={`${styles.avatar({ size })} ${className}`} onClick={onClick}>
      {url ? (
        <Image
          src={url}
          width={size}
          height={size}
          alt="workspace-image"
          className={styles.avatarImage}
        />
      ) : (
        <>
          <div
            className={styles.avatarFallback}
            style={{
              fontSize: `${fontSize}px`,
              background: `linear-gradient(135deg, ${bgColorGradient.color1} 0%, ${bgColorGradient.color2} 100%)`,
              color: colorUtils.getContrastColor(bgColor),
            }}
          >
            {initials}
          </div>
          <div
            style={{
              color: colorUtils.getContrastColor(bgColor),
            }}
          >
            {name && name[0].toUpperCase()}
          </div>
        </>
      )}
      {isActive && <div className={styles.statusIndicator} />}
    </div>
  );
}
