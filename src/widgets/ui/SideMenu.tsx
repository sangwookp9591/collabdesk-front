import React from 'react';
import * as styles from './sidemenu.css';
import { DirectMessageIcon, EllipsisIcon, HomeIcon } from '@/shared/ui/IconSvg';

const SideMenu = () => {
  const isActive = true;
  return (
    <div className={styles.sideMenu}>
      <div className={styles.topSection}>
        <div className={styles.wsAvatar}>BLInk</div>
        <div className={styles.wsWrapper}>
          <div className={styles.workspace}>
            <div>
              <HomeIcon size={20} />
            </div>
            SW
          </div>
          <div className={styles.workspace}>
            <div>
              <DirectMessageIcon size={20} />
            </div>
            DM
          </div>
          <div className={styles.workspace}>
            <div>
              <EllipsisIcon size={20} />
            </div>
            더 보기
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
