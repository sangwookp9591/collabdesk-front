import { useMutation } from '@tanstack/react-query';
import { userApi } from '../api/user.api';

export function useUpdateLastWorkspace(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (workspaceId: string) => userApi.updatelastworkspace(workspaceId),
    onSuccess: () => onSuccess?.(),
  });
}
