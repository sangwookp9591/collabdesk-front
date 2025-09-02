export const WORKSPACE_QUERY_KEYS = {
  all: ['workspaces'] as const,
  initBySlug: (slug: string) => [...WORKSPACE_QUERY_KEYS.all, 'init', slug] as const,
  bySlug: (slug: string) => [...WORKSPACE_QUERY_KEYS.all, slug] as const,
  byId: (id: string) => [...WORKSPACE_QUERY_KEYS.all, id] as const,
} as const;
