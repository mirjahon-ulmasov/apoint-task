import { useState } from "react";
import { instance } from "../../../shared/api/base";
import { useAuth } from "../../../shared/lib/context/AuthContext";

type LoginPayload = {
    username: string;
    password: string;
};

type LoginResponse = {
    id: number;
    username: string;
    status: number;
    token: {
        token: string;
        [key: string]: any;
    };
};

export function useLogin() {
    const { dispatch } = useAuth();
    const [loading, setLoading] = useState(false);

    const login = async ({ username, password }: LoginPayload): Promise<boolean> => {
        setLoading(true);

        try {
            const response = await instance.post<LoginResponse>(
                "/hr/user/sign-in?include=token",
                { username, password }
            );

            const { token, ...user } = response.data;

            dispatch({
                type: "LOGIN",
                payload: {
                    token: token.token,
                    user,
                },
            });

            localStorage.setItem("token", token.token);
            return true;
        } catch (err: any) {
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        loading,
    };
}
