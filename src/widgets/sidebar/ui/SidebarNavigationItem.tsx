import * as styles from './sidebar-navigationitem.css';
import Link from 'next/link';

interface SidebarNavigationItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

export default function SidebarNavigationItem({
  href,
  icon,
  label,
  isActive,
}: SidebarNavigationItemProps) {
  return (
    <Link href={href} className={isActive ? styles.activeItem : styles.item}>
      {icon}
      {label}
    </Link>
  );
}
