"use client"

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
    isLoggedIn?: boolean;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn = false, children }) => {
    return (
        <div className='flex flex-col h-screen bg-cool-gray-80'>
            <Header/>
            <div className='flex flex-1'>
                {isLoggedIn && <Sidebar />}
                <div className='flex-1 overflow-y-auto my-4'>{children}</div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;