import * as styles from './sidebar-dropdown.css';

type SidebarDropdownProps = {
  title: string;
  isOpen: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
};

export default function SidebarDropdown({
  title,
  isOpen,
  onToggle,
  children,
}: SidebarDropdownProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div className={styles.dropdownIcon({ active: isOpen })} onClick={onToggle}>
          ▶
        </div>
        <div>{title}</div>
      </div>

      {isOpen && <>{children}</>}
    </div>
  );
}
