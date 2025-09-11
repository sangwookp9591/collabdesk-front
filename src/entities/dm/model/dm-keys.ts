export const DM_QUERY_KEYS = {
  all: ['dm'] as const,
  dms: (wsSlug: string) => [...DM_QUERY_KEYS.all, wsSlug] as const,
  dmsRecent: (wsSlug: string) => [...DM_QUERY_KEYS.all, wsSlug, 'recent'] as const,
  dm: (wsSlug: string, conversationId: string) =>
    [...DM_QUERY_KEYS.dms(wsSlug), conversationId] as const,
  dmMessages: (wsSlug: string, conversationId: string, cursor?: string) =>
    [...DM_QUERY_KEYS.dm(wsSlug, conversationId), cursor, 'messages'] as const,
  dmAroundMessage: (wsSlug: string, conversationId: string, messageId: string) => [
    ...DM_QUERY_KEYS.dmMessages(wsSlug, conversationId, ''),
    'around',
    messageId,
  ],
  dmInfiniteMessages: (wsSlug: string, conversationId: string) =>
    [...DM_QUERY_KEYS.dm(wsSlug, conversationId), 'messages', 'infinite'] as const,
};
