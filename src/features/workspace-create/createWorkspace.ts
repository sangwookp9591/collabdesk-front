'use server';

export async function createWorkspaceAction(_: any, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const image = formData.get('image') as File | null;

    const body = new FormData();
    body.append('name', name);
    body.append('slug', slug);
    if (image) {
      body.append('image', image);
    }

    if (!name) {
      return {
        status: false,
        error: '워크스페이스 이름을 입력하세요',
      };
    }
    if (!slug) {
      return {
        status: false,
        error: 'Slug를 입력하세요.',
      };
    }
    // NestJS 백엔드 API 호출 (예: http://api.myapp.com/workspaces)
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces`, {
    //   method: 'POST',
    //   body,
    //   // NestJS에서 multipart/form-data 받을 수 있도록 설정 필요
    // });
    // if (!res.ok) {
    //   throw new Error('워크스페이스 생성 실패');
    // }
    // const workspace = await res.json();

    let imageUrl: string | null = null;
    if (image && image.size > 0) {
      imageUrl = `https://placehold.co/200x200?text=${encodeURIComponent(slug)}`;
    }

    // 가짜 워크스페이스 객체 (DB 대신 메모리에서 생성)
    const workspace = {
      id: Math.floor(Math.random() * 100000),
      name,
      slug,
      image: imageUrl,
      ownerId: 'mock-user-id',
      createdAt: new Date().toISOString(),
    };

    return { status: true, workspace };
  } catch (err) {
    console.error(err);
    return { status: false, error: '워크스페이스 생성 실패' };
  }
}
