import * as styles from './layout.css';
import { ChannelIcon, MessageIcon, PageIcon, PlusIcon } from '@/shared/ui';
import { TabNavigation } from '@/widgets/tab-navigation';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  // 아이콘과 배지가 있는 탭
  const tabsWithFeatures = [
    {
      label: '메세지',
      href: '/workspace/1/channel/1',
      icon: <MessageIcon size={16} color="" />,
      exact: true,
    },
    {
      label: '캔버스 추가',
      href: '/workspace/1/channel/2',
      icon: <PageIcon size={16} color="" />,
      badge: 5,
    },
    {
      label: '',
      href: '/workspace/1/channel/3',
      icon: <PlusIcon size={16} color="" />,
    },
    {
      label: '설정',
      href: '/workspace/1/channel/4',
      icon: <PlusIcon size={16} color="" />,
      disabled: true,
    },
  ];
  return (
    <>
      <div className={styles.chatPage}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <ChannelIcon size={20} color="" />
          <span className={styles.channelName}>채널이름</span>
        </div>
        <TabNavigation tabs={tabsWithFeatures} variant="underline" size="sm" />

        {children}
      </div>
    </>
  );
}
