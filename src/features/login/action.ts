'use server';

export async function loginAction(_: any, formData: FormData) {
    const loginId = formData.get('loginId');
    const loginPw = formData.get('loginPw');

    if (!loginId) {
        return {
            state: false,
            el: 'loginId',
            error: 'Id를 입력해주세요.',
        };
    }

    if (!loginPw) {
        return {
            state: false,
            el: 'loginPw',
            error: 'PW를 입력해주세요.',
        };
    }
    // const res = await fetch(`${process.env}`,{})

    try {
        const fetchLogin = (): Promise<{ ok: boolean }> => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // 랜덤으로 실패 시뮬레이션
                    if (Math.random() < 0.1) {
                        reject(new Error('메시지 로딩 실패!'));
                    } else {
                        resolve({ ok: true });
                    }
                }, 1000); // 1초 후 응답
            });
        };
        const res = await fetchLogin();
        if (res?.ok) {
            return {
                state: true,
                error: '',
            };
        }
    } catch (err: any) {
        return {
            status: false,
            error: '로그인에 실패했습니다.',
        };
    }
}
