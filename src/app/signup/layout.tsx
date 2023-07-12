import React from "react";
import Layout from "@/components/Layout/Layout";

interface RegisterProps {
	children: React.ReactNode;
}

const RegisterLayout: React.FC<RegisterProps> = ({ children }) => {
	// if you access this page you have to be logged out (logically - may not be so functionally)
    return <Layout isLoggedIn={false}>{children}</Layout>;
};

export default RegisterLayout;
