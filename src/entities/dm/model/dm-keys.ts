export const DM_QUERY_KEYS = {
  all: ['dm'] as const,
  dms: (wsSlug: string) => [...DM_QUERY_KEYS.all, wsSlug] as const,
  dmsRecent: (wsSlug: string) => [...DM_QUERY_KEYS.all, wsSlug, 'recent'] as const,
  dm: (wsSlug: string, conversationId: string) =>
    [...DM_QUERY_KEYS.dms(wsSlug), conversationId] as const,
  dmMessages: (wsSlug: string, conversationId: string, page?: number) =>
    [...DM_QUERY_KEYS.dm(wsSlug, conversationId), page, 'messages'] as const,
};
