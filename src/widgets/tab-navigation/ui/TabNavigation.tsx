'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import * as styles from './tab-navigation.css';
import { clsx } from 'clsx';

interface Tab {
  label?: string;
  href: string;
  exact?: boolean; // 정확한 경로 매칭 여부
  badge?: number | string; // 알림 배지
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
}

export default function TabNavigation({
  tabs,
  variant = 'underline',
  size = 'md',
}: TabNavigationProps) {
  const pathname = usePathname();

  const isActiveTab = useMemo(
    () => (tab: Tab) => {
      if (tab.exact) {
        return pathname === tab.href;
      }
      return pathname.startsWith(tab.href);
    },
    [pathname],
  );

  return (
    <nav className={styles.tabNavigation({ variant, size })} role="tablist">
      {tabs.map((tab) => {
        const isActive = isActiveTab(tab);
        const isDisabled = tab.disabled;

        return (
          <Link
            key={tab.href}
            href={isDisabled ? '#' : tab.href}
            className={clsx(
              styles.tabItem({
                variant,
                size,
                active: isActive,
                disabled: isDisabled,
              }),
            )}
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
            onClick={isDisabled ? (e) => e.preventDefault() : undefined}
          >
            {/* 아이콘 */}
            {tab?.icon && <span className={styles.tabIcon}>{tab.icon}</span>}

            {/* 라벨 */}
            {tab?.label && <span className={styles.tabLabel}>{tab.label}</span>}

            {/* 배지 */}
            {tab?.badge && <span className={styles.tabBadge({ size })}>{tab.badge}</span>}

            {/* 활성 상태 인디케이터 */}
            {isActive && variant === 'underline' && <span className={styles.activeIndicator} />}
          </Link>
        );
      })}
    </nav>
  );
}
