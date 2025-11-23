export interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  roles: string[];
  createdAt: string;
}

export type LoadingState = "idle" | "pending" | "succeeded" | "failed";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: LoadingState;
  error: string | null;
  lastFetched: number | null;
}

export interface LoginPayload {
  email: string;
  password?: string;
  phone?:string
}

export interface RegisterPayload {
  firstName:string
  lastName: string
  email: string;
  phone?:string

}

export interface AuthResponseData {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}


