import React from "react";
import Layout from "@/components/Layout/Layout";

interface ServerProps {
	children: React.ReactNode;
}

const ServerLayout: React.FC<ServerProps> = ({ children }) => {
	// if you access this page you have to be logged in (logically - may not be so functionally)
    return <Layout isLoggedIn={true}>{children}</Layout>;
};

export default ServerLayout;
