export interface SignupDTO {
  loginId: string;
  loginPw: string;
  nickname: string;
  email: string;
  profileFile?: File | null;
}
