import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLogin } from "./useLogin";

export const useLoginForm = () => {
    const { login, loading } = useLogin();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await login({ username, password });

        if (!success) {
            toast.error("Не удалось войти", { duration: 2000 });
            return;
        }

        navigate("/");
    };

    return {
        username,
        password,
        setUsername,
        setPassword,
        handleSubmit,
        loading,
    };
};
