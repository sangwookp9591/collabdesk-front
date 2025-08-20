import { ChannelIcon, PlusIcon } from '@/shared/ui/IconSvg';
import * as styles from './sidebar-dropdown.css';
import Link from 'next/link';

type SidebarDropdownProps<T extends { id: number | string }> = {
  title: string;
  type: 'channel' | 'dm' | 'page';
  items: T[];
  isActive: boolean;
  pathname: string;
  keyName: keyof T; //어떤 필드가 label로 쓰일지 알려주는 key
  onClick?: () => void;
};

export default function SidebarDropdown<T extends { id: number | string }>({
  title,
  type,
  items,
  isActive,
  pathname,
  keyName,
  onClick,
}: SidebarDropdownProps<T>) {
  const currentItem = items?.find((item) => `${pathname}` === `/workspace/1/channel/${item?.id}`);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div className={styles.dropdownIcon({ active: isActive })} onClick={onClick}>
          ▶
        </div>
        <div>{title}</div>
      </div>

      {isActive ? (
        <div className={styles.wrapper}>
          {items.map((item) => {
            const label = item[keyName] as unknown as string;
            const isActiveItem = `${pathname}` === `/workspace/1/${type}/${item.id}`;
            return (
              <Link
                key={item.id}
                href={`/workspace/1/${type}/${item.id}`}
                className={isActiveItem ? styles.activeItem : styles.item}
              >
                <ChannelIcon size={20} color={isActiveItem ? 'rgba(57,6,58, 1)' : '#ffffff'} />
                {label}
              </Link>
            );
          })}

          <div className={styles.addRow}>
            <div className={styles.plusBox}>
              <PlusIcon size={15} />
            </div>
            {title} 추가
          </div>
        </div>
      ) : (
        <div>
          {currentItem ? (
            <div className={styles.activeItem}>
              <ChannelIcon size={20} color="rgba(57,6,58, 1)" />
              {currentItem[keyName] as unknown as string}
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}
