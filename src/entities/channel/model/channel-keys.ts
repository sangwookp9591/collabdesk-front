export const CHANNEL_QUERY_KEYS = {
  all: ['channels'] as const,
  allByWsId: (workspaceId: string) => [...CHANNEL_QUERY_KEYS.all, workspaceId] as const,
  bySlug: (slug: string) => [...CHANNEL_QUERY_KEYS.all, slug] as const,
  byId: (id: string) => [...CHANNEL_QUERY_KEYS.all, id] as const,
} as const;
