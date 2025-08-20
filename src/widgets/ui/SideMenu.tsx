'use client';

import React, { useState } from 'react';
import * as styles from './sidemenu.css';
import { DirectMessageIcon, EllipsisIcon, HomeIcon } from '@/shared/ui/IconSvg';

type MenuItem = 'home' | 'dm' | 'more';

const SideMenu = () => {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('home');
  const isActive = true;

  return (
    <div className={styles.sideMenu}>
      <div className={styles.topSection}>
        <div className={styles.wsAvatar}>BLInk</div>
        <div className={styles.wsWrapper}>
          <div
            className={styles.workspace({ active: activeMenu === 'home' })}
            onClick={() => setActiveMenu('home')}
          >
            <HomeIcon size={20} />
            SW
          </div>

          <div
            className={styles.workspace({ active: activeMenu === 'dm' })}
            onClick={() => setActiveMenu('dm')}
          >
            <DirectMessageIcon size={20} />
            DM
          </div>

          <div
            className={styles.workspace({ active: activeMenu === 'more' })}
            onClick={() => setActiveMenu('more')}
          >
            <EllipsisIcon size={20} />더 보기
          </div>
        </div>
      </div>

      <div className={styles.BottomSection}>
        <div className={styles.userIcon}>
          상욱
          <div className={isActive ? styles.loginLight : styles.userIconInactive}></div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
