import Image from 'next/image';
import * as styles from './avatar.css';

type AvatarProps = {
  isActive: boolean;
  profileImageUrl?: string;
  name: string;
  size: number;
  isActiveIcon?: boolean;
  borderRadius?: string;
};

export function Avatar({
  isActive,
  profileImageUrl,
  name,
  size,
  isActiveIcon = true,
  borderRadius = '20px',
}: AvatarProps) {
  return (
    <div
      className={profileImageUrl ? styles.profileIcon : styles.userIcon}
      style={{ width: size, height: size, position: 'relative' }}
    >
      {profileImageUrl ? (
        <Image
          src={profileImageUrl}
          width={size}
          height={size}
          alt="user-profile"
          style={{ borderRadius: borderRadius }}
        />
      ) : (
        <div className={styles.userIcon}>{name && name[0].toUpperCase()}</div>
      )}

      {/* 상태 표시 */}
      {isActiveIcon && (
        <div className={isActive ? styles.loginLight : styles.userIconInactive}></div>
      )}
    </div>
  );
}
