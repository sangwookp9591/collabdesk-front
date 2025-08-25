import { apiFetch } from '@/shared/api';

export async function fetchSignup(formData: FormData) {
  return await apiFetch('/auth/signup', {
    method: 'POST',
    body: formData,
  });
}
