import React from "react";
import Layout from "@/components/Layout/Layout";

interface AimProps {
	children: React.ReactNode;
}

const AimLayout: React.FC<AimProps> = ({ children }) => {
	// if you access this page you have to be logged in (logically - may not be so functionally)
    return <Layout isLoggedIn={true}>{children}</Layout>;
};

export default AimLayout;
