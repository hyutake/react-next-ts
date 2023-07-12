import React from "react";
import Layout from "@/components/Layout/Layout";

interface AboutProps {
	children: React.ReactNode;
}

const AboutLayout: React.FC<AboutProps> = ({ children }) => {
    return <Layout isLoggedIn={false}>{children}</Layout>;
};

export default AboutLayout;
