import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./providers/AuthProvider";
import { AppRouter } from "./routes/AppRoute";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Toaster />
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;