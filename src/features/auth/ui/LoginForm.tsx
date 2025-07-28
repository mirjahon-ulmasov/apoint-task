import { useLoginForm } from "../model/useLoginForm";
import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
    const {
        username,
        password,
        setUsername,
        setPassword,
        handleSubmit,
        loading,
    } = useLoginForm();

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Войти..." : "Войти"}
            </button>
        </form>
    );
};