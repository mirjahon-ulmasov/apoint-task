import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import './app/styles/style.module.scss';

createRoot(document.getElementById("root")!).render(<App />);
