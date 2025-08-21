import Link from 'next/link';

// shared/ui/navigation-item/NavigationItem.tsx
interface NavigationItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onDelete?: () => void;
}

export function NavigationItem({ href, icon, label, isActive, onDelete }: NavigationItemProps) {
  return (
    <div className="nav-item-wrapper">
      <Link href={href} className={isActive ? 'nav-item active' : 'nav-item'}>
        {icon}
        {label}
      </Link>
      {onDelete && (
        <button className="delete-btn" onClick={onDelete}>
          🗑️
        </button>
      )}
    </div>
  );
}
