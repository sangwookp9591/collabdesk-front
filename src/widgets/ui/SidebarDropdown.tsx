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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'white' }}>
      <div
        style={{
          display: 'flex',
          fontWeight: 'bold',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
        }}
      >
        <div className={styles.dropdownIcon({ active: isActive })} onClick={onClick}>
          {'▶'}
        </div>
        <div>{title}</div>
      </div>
      {isActive ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {items?.map((item) => {
            const label = item[keyName] as unknown as string;

            const isAtive = `${pathname}` === `/workspace/1/${type}/${item?.id}`;
            const color = isAtive ? 'rgba(57,6,58, 1)' : '#ffffff';
            const backgroundColor = isAtive ? 'rgba(249,237,255, 1)' : '#3f0e40';
            return (
              <Link
                key={item?.id}
                href={`/workspace/1/${type}/${item?.id}`}
                style={{
                  display: 'flex',
                  gap: '5px',
                  borderRadius: '15px',
                  textDecoration: 'none',
                  color: color,
                  padding: '5px 10px',
                  backgroundColor: backgroundColor,
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
              >
                <ChannelIcon size={20} color={color} />
                {label}
              </Link>
            );
          })}

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 10px' }}>
            <div
              style={{
                borderRadius: '2px',
                padding: '2.5px',
                backgroundColor: '#611f69',
                color: 'white',
              }}
            >
              <PlusIcon size={15} />
            </div>
            채널 추가
          </div>
        </div>
      ) : (
        <div>
          {currentItem ? (
            <div
              style={{
                display: 'flex',
                gap: '5px',
                textDecoration: 'none',
                color: 'rgba(57,6,58, 1)',
                backgroundColor: 'rgba(249,237,255, 1)',
                borderRadius: '15px',
                padding: '3px 10px',
              }}
            >
              <ChannelIcon size={20} color="rgba(57,6,58, 1)" />
              {currentItem?.[keyName] as unknown as string}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
