// shared/ui/dropdown/Dropdown.tsx - 순수한 UI 컴포넌트
interface DropdownProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function Dropdown({ title, isOpen, onToggle, children }: DropdownProps) {
  return (
    <div className="dropdown">
      <button onClick={onToggle} className="dropdown-trigger">
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▶</span>
        {title}
      </button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
}
