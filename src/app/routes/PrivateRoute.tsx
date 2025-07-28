import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../../shared/lib/context/AuthContext";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { state } = useAuth();

    if (!state.token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
