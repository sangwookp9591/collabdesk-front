export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, options);
}
