"use client"

import React, { useContext } from 'react';
import useAuth from '@/hooks/use-auth';

interface LoginData {
    username: string;
    password: string;
}

interface SignupData extends LoginData {
    alias: string;
}

type User = {
    token: string;
    id: string;
    expiration: string; // ISO string
} | null

type AuthProviderProps = {
    children: React.ReactNode
}

type AuthContextObj = {
    user: User | null;
    error: null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextObj>({
    user: null,
    error: null,
    loading: false,
    login: (data: LoginData) => Promise.resolve(),
    signup: (data: SignupData) => Promise.resolve(),
    logout: () => {}
})

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;