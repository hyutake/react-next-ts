import React from "react";
import Layout from "@/components/Layout/Layout";

interface LoginProps {
	children: React.ReactNode;
}

const LoginLayout: React.FC<LoginProps> = ({ children }) => {
	// if you access this page you have to be logged out (logically - may not be so functionally)
    return <Layout isLoggedIn={false}>{children}</Layout>;
};

export default LoginLayout;
