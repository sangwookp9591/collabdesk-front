import { DMConversation } from '@/entities/dm';
import { User } from '@/entities/user';
import { Channel } from '@/shared/types/channel';
import { Message } from '@/shared/types/message';
import { Workspace } from '@/shared/types/workspace';

/**
 *  MENTION        // 멘션 알림 (@user, @here, @everyone)
  SYSTEM         // 시스템 알림 (워크스페이스 초대, 채널 초대, 역할 변경 등)
  NEW_MESSAGE    // 새 메시지 알림 (DM, 채널 메시지)
  REACTION       // 내 메시지에 반응 달렸을 때
 */
export type NotificationType = 'MENTION' | 'SYSTEM' | 'NEW_MESSAGE' | 'REACTION';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  messageId?: string;
  workspaceId?: string;
  channelId?: string;
  dmConversationId?: string;
  isRead?: boolean;
  readAt?: Date;
  data: any;
  createdAt: Date;
  user?: User;
  message?: Message;
  workspace?: Workspace;
  channel?: Channel;
  dmConversation?: DMConversation;
}
