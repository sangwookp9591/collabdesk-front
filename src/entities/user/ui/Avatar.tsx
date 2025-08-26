import Image from 'next/image';
import * as styles from './avatar.css';

type AvatarProps = {
  isActive: boolean;
  profileImageUrl?: string;
  name: string;
  size: number;
};

export function Avatar({ isActive, profileImageUrl, name, size }: AvatarProps) {
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
          style={{ borderRadius: '20px' }}
        />
      ) : (
        <div className={styles.userIcon}>{name && name[0].toUpperCase()}</div>
      )}

      {/* 상태 표시 */}
      <div className={isActive ? styles.loginLight : styles.userIconInactive}></div>
    </div>
  );
}
