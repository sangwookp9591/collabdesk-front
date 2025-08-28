export const messageKeys = {
  all: ['messages'] as const,
  channels: () => [...messageKeys.all, 'channels'] as const,
  channel: (slug: string) => [...messageKeys.channels(), slug] as const,
  channelMessages: (channelId: string, page?: number) =>
    [...messageKeys.channel(channelId), page, 'messages'] as const,
};
