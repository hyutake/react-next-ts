"use client"

import React, { HTMLProps } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
    isLoggedIn?: boolean;
    children: React.ReactNode;
    className?: HTMLProps<HTMLElement>["className"];
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn = false, children, className = "bg-cool-gray-80" }) => {
    return (
        <div className='flex flex-col h-screen'>
            <Header/>
            <div className={`flex flex-1 ${className}`}>
                {isLoggedIn && <Sidebar />}
                <div className='flex-1 overflow-y-auto'>{children}</div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;