export interface User {
  id: number;
  username: string;
  password: string;
  active?: boolean;
}

export interface UserFilter {
  username: string;
  active?: boolean;
}

export interface AddUserDataPayload {
  username: string;
  password: string;
  active?: boolean;
}

export interface UpdateUserDataPayload {
  id: string | number;
  params: {
    username?: string;
    password?: string;
    active?: boolean;
  };
}
