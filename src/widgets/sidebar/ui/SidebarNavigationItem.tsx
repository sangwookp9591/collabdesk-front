import * as styles from './sidebar-navigationitem.css';
import Link from 'next/link';

interface SidebarNavigationItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  children?: React.ReactNode;
}

export default function SidebarNavigationItem({
  href,
  icon,
  label,
  isActive,
  children,
}: SidebarNavigationItemProps) {
  return (
    <>
      <div className={isActive ? styles.activeItem : styles.item}>
        <Link href={href} className={isActive ? styles.activeLinkStyle : styles.linkStyle}>
          {icon}
          {label}
        </Link>
        {children}
      </div>
    </>
  );
}
