export interface SignupDTO {
  email: string;
  loginPw: string;
  name: string;
  profileFile?: File | null;
}
