export const messageKeys = {
  all: ['messages'] as const,
  channels: (wsSlug: string) => [...messageKeys.all, wsSlug, 'channels'] as const,
  channel: (wsSlug: string, chSlug: string) => [...messageKeys.channels(wsSlug), chSlug] as const,
  channelMessages: (wsSlug: string, chSlug: string, cursor?: string) =>
    [...messageKeys.channel(wsSlug, chSlug), cursor, 'messages'] as const,
  channelInfiniteMessages: (wsSlug: string, chSlug: string) =>
    [...messageKeys.channel(wsSlug, chSlug), 'infinite'] as const,
  messageAround: (wsSlug: string, chSlug: string, messageId: string) => [
    ...messageKeys.channelMessages(wsSlug, chSlug, ''),
    'around',
    messageId,
  ],
};
