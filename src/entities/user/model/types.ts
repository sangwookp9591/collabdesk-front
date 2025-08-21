export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  profileImgUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface UpsertUserData {
  email: string;
  name: string;
  profileImgUrl?: string;
}
