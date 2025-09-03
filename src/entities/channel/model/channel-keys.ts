export const CHANNEL_QUERY_KEYS = {
  all: ['channels'] as const,
  allByWsId: (workspaceId: string) => [...CHANNEL_QUERY_KEYS.all, workspaceId] as const,
  allByWsSlug: (wsSlug: string) => [...CHANNEL_QUERY_KEYS.all, wsSlug] as const,
  bySlug: (wsSlug: string, chSlug: string) => [...CHANNEL_QUERY_KEYS.all, wsSlug, chSlug] as const,
  membersBySlug: (wsSlug: string, chSlug: string) =>
    [...CHANNEL_QUERY_KEYS.bySlug(wsSlug, chSlug), 'members'] as const,
  byId: (id: string) => [...CHANNEL_QUERY_KEYS.all, id] as const,
} as const;
