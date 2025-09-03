import { useMutation } from '@tanstack/react-query';
import { inviteApi } from '../api/invite.api';

export function useWorkspaceInviteJoin(
  dto: {
    code: string;
  },
  onSuccess?: () => void,
) {
  return useMutation({
    mutationFn: () => inviteApi.workspaceInviteJoin(dto),
    onSuccess: () => onSuccess?.(),
  });
}
