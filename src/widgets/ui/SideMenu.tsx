import React from 'react';
import * as styles from './sidemenu.css';

const SideMenu = () => {
  const isActive = true;
  return (
    <div className={styles.sideMenu}>
      <div className={styles.topSection}>
        <div className={styles.wsAvatar}>BLInk</div>
        <div>
          <div className={styles.workspace}>
            <div>
              <svg
                className={styles.svgIconSize}
                data-hlc="true"
                data-qa="home-filled"
                aria-hidden="true"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="m3 7.649-.33.223a.75.75 0 0 1-.84-1.244l7.191-4.852a1.75 1.75 0 0 1 1.958 0l7.19 4.852a.75.75 0 1 1-.838 1.244L17 7.649v7.011c0 2.071-1.679 3.84-3.75 3.84h-6.5C4.679 18.5 3 16.731 3 14.66zM11 11a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            SW
          </div>
          <div className={styles.workspace}>
            <div>
              <svg
                className={styles.svgIconSize}
                data-hlc="true"
                data-qa="direct-messages"
                aria-hidden="true"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M7.675 6.468a4.75 4.75 0 1 1 8.807 3.441.75.75 0 0 0-.067.489l.379 1.896-1.896-.38a.75.75 0 0 0-.489.068 5 5 0 0 1-.648.273.75.75 0 1 0 .478 1.422q.314-.105.611-.242l2.753.55a.75.75 0 0 0 .882-.882l-.55-2.753A6.25 6.25 0 1 0 6.23 6.064a.75.75 0 1 0 1.445.404M6.5 8.5a5 5 0 0 0-4.57 7.03l-.415 2.073a.75.75 0 0 0 .882.882l2.074-.414A5 5 0 1 0 6.5 8.5m-3.5 5a3.5 3.5 0 1 1 1.91 3.119.75.75 0 0 0-.49-.068l-1.214.243.243-1.215a.75.75 0 0 0-.068-.488A3.5 3.5 0 0 1 3 13.5"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            DM
          </div>
          <div className={styles.workspace}>
            <div>
              <svg
                className={styles.svgIconSize}
                data-hlc="true"
                data-qa="ellipsis-horizontal-filled"
                aria-hidden="true"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M14.5 10a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m-6.25 0a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0M2 10a1.75 1.75 0 1 1 3.5 0A1.75 1.75 0 0 1 2 10"
                ></path>
              </svg>
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
