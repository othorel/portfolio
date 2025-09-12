import { User } from "./User";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (login: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  checkEmail: (email: string) => Promise<boolean>;
  checkLogin: (login: string) => Promise<boolean>;
}
