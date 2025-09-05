export const dmKeys = {
  all: ['dm'] as const,
  dms: (wsSlug: string) => [...dmKeys.all, wsSlug] as const,
  dm: (wsSlug: string, conversationId: string) => [...dmKeys.dms(wsSlug), conversationId] as const,
  dmMessages: (wsSlug: string, conversationId: string, page?: number) =>
    [...dmKeys.dm(wsSlug, conversationId), page, 'messages'] as const,
};
