import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/lib/context/AuthContext";

export const useLogout = () => {
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
        navigate("/login");
    };

    return { logout };
};
