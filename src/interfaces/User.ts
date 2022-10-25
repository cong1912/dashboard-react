export interface User {
  id: string;
  email: string;
  img?: string;
  role: string;
  phone: string;
  first_name: string;
  last_name: string;
}

export interface UserInput extends Partial<User> {
  email: string;
  password: string;
}

export interface UserSession {
  token: string;
  user: User;
}

export interface Users {
  results: User[];
}
