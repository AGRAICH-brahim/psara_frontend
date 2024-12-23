import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log(isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (role !== "ROLE_ADMIN") {
        return <Navigate to="/home" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
