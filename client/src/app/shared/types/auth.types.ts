export interface IUser {
  _id: string;
  username: string;
}

export interface IUserAuth {
  username: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}
