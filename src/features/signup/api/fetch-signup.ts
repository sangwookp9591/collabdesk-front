import { SignupDTO } from '../dto/type';

export const fetchSignup = ({
  loginId,
  loginPw,
  nickname,
  email,
  profileImage,
}: SignupDTO): Promise<{ ok: boolean }> => {
  console.log('loginId, loginPw  : ', loginId, loginPw, nickname, email, profileImage);
  //login 정보 포함해서 , workspace가 존재하는지 유무도 필요함.
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
