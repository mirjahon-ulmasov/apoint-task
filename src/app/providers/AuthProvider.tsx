import React, { useEffect, useReducer } from "react";
import { AuthContext } from "../../shared/lib/context/AuthContext";
import type { AuthAction, AuthState } from "../../shared/lib/types/auth";
import { setTokenGetter } from "../../shared/api/base";

const getInitialState = (): AuthState => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    return {
        token: token || null,
        user: user ? JSON.parse(user) : null,
    };
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            return {
                token: action.payload.token,
                user: action.payload.user,
            };
        case 'LOGOUT':
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return { token: null, user: null };
        default:
            return state;
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, undefined, getInitialState);

    useEffect(() => {
        setTokenGetter(() => state.token); // reactive
    }, [state.token]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
