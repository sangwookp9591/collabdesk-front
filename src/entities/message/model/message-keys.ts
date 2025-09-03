export const messageKeys = {
  all: ['messages'] as const,
  channels: (wsSlug: string) => [...messageKeys.all, wsSlug, 'channels'] as const,
  channel: (wsSlug: string, chSlug: string) => [...messageKeys.channels(wsSlug), chSlug] as const,
  channelMessages: (wsSlug: string, chSlug: string, page?: number) =>
    [...messageKeys.channel(wsSlug, chSlug), page, 'messages'] as const,
};
