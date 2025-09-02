import { getSession } from '@/shared/lib';

export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, options);
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = await getSession();
  const token = session?.user?.accessToken;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = '에러 발생';
    try {
      const data = await response.json();
      errorMessage = data?.message || errorMessage;
    } catch (err) {
      console.error('서버 에러:', err);
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
