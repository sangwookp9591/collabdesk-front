export const fetchLogin = ({ loginId, loginPw }: { loginId: string; loginPw: string }): Promise<{ ok: boolean }> => {
    console.log('loginId, loginPw  : ', loginId, loginPw);
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
