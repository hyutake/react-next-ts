import React from "react";
import Layout from "@/components/Layout/Layout";

interface AuthProps {
	children: React.ReactNode;
}

const AuthLayout: React.FC<AuthProps> = ({ children }) => {
	// if you access this page you have to be logged out (logically - may not be so functionally)
    return <Layout isLoggedIn={false}>{children}</Layout>;
};

export default AuthLayout;
