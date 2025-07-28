import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { MaterialsPage } from "../../pages/materials";
import { LoginPage } from "../../pages/login";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/materials"
                element={
                    <PrivateRoute>
                        <MaterialsPage />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<Navigate to="/materials" replace />} />
        </Routes>
    );
};
