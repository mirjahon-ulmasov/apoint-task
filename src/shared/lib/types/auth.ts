export interface TokenData {
    id: number;
    user_id: number;
    created_at: number;
    updated_at: number | null;
    last_used_at: number;
    expires: number;
    token: string;
    status: number;
    user_agent: string | null;
    type: string | null;
    data: unknown;
    phone: string | null;
    position_id: number | null;
}

export interface User {
    id: number;
    username: string;
    status: number;
    token: TokenData;
}

export interface AuthState {
    token: string | null;
    user: {
        id: number;
        username: string;
    } | null;
}

export type AuthAction =
    | {
          type: "LOGIN";
          payload: { token: string; user: { id: number; username: string } };
      }
    | { type: "LOGOUT" };

export interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}
