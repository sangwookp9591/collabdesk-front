import Image from 'next/image';
import * as styles from './avatar.css';

type AvatarProps = {
  url?: string;
  name: string;
  size: number;
};

export function Avatar({ url, name, size }: AvatarProps) {
  return (
    <div
      className={url ? styles.imageIcon : styles.workspaceIcon}
      style={{ width: size, height: size, position: 'relative' }}
    >
      {url ? (
        <Image
          src={url}
          width={size}
          height={size}
          alt="workspace-image"
          style={{ borderRadius: '20px' }}
        />
      ) : (
        <div className={styles.workspaceIcon}>{name[0].toUpperCase()}</div>
      )}
    </div>
  );
}
