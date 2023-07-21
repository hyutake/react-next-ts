import React from "react";
import Layout from "@/components/Layout/Layout";

interface GameProps {
	children: React.ReactNode;
}

const GameLayout: React.FC<GameProps> = ({ children }) => {
	// if you access this page you have to be logged in (logically - may not be so functionally)
    return <Layout isLoggedIn={true}>{children}</Layout>;
};

export default GameLayout;