import { PlusIcon } from '@/shared/ui';
import * as styles from './sidebar-dropdown.css';

type SidebarDropdownProps = {
  title: string;
  isOpen: boolean;
  onToggle?: () => void;
  handleAdd?: () => void;
  hasButton?: boolean;
  children: React.ReactNode;
};

export default function SidebarDropdown({
  title,
  isOpen,
  onToggle,
  handleAdd,
  hasButton,
  children,
}: SidebarDropdownProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div className={styles.titleWrapper}>
          <div className={styles.dropdownIcon({ active: isOpen })} onClick={onToggle}>
            ▶
          </div>
          <div>{title}</div>
        </div>
        {hasButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAdd?.();
            }}
            className={styles.addDMButton}
          >
            <PlusIcon size={16} />
          </button>
        )}
      </div>

      {isOpen && <>{children}</>}
    </div>
  );
}
