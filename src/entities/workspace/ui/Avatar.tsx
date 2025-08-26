import Image from 'next/image';
import * as styles from './avatar.css';
import { colorUtils } from '@/shared/lib';

type AvatarProps = {
  url?: string;
  name: string;
  size: number;
};

export function Avatar({ url, name, size }: AvatarProps) {
  const bgColor = colorUtils.stringToColor(name);
  return (
    <div
      className={url ? styles.imageIcon : styles.workspaceIcon}
      style={{
        width: size,
        height: size,
        position: 'relative',
        backgroundColor: url ? 'none' : bgColor,
      }}
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
        <div
          style={{
            color: colorUtils.getContrastColor(bgColor),
          }}
        >
          {name && name[0].toUpperCase()}
        </div>
      )}
    </div>
  );
}
