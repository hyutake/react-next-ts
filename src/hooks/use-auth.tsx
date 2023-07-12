"use client"

import { useState, useCallback } from "react";
import useStorage from "./use-storage";

// token, id, expiration
interface User {
    token: string;
    id: string;
    expiration: string; // ISO string
}

interface LoginData {
    username: string;
    password: string;
}

interface SignupData extends LoginData {
    alias: string;
}

interface LoginAPIResponse {
    token: string;
    alias: string;
    id: string;
}

const AUTH_SERVER_URL = 'http://localhost:4000/auth'

const useAuth = () => {
    // user will either be User (the object) or null
    const [user, setUser] = useStorage<User | null>("user", null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState<boolean>(false);

	// data: {username, password}
	const login = async (data: LoginData) => {
		try {
			setLoading(true);
            const response = await fetch(`${AUTH_SERVER_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const resData: LoginAPIResponse = await response.json();
			const expirationDate = new Date();
			expirationDate.setHours(expirationDate.getHours() + 1);
			const expiration = expirationDate.toISOString();
			setUser({
				...resData,
				expiration
			}); // will be {token, alias, id} from backend
			console.log("Login successful!");
		} catch (err: any) {
            console.error(err);
			setError(err.data);
            throw err;  // pass the error to the caller function
		} finally {
            setLoading(false);
        }
	};

	// data: {username, password, alias}
	const signup = async (data: SignupData) => {
		try {
			setLoading(true);
            const response = await fetch(`${AUTH_SERVER_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const resData = await response.json();  // just { message: string }
            console.log(resData.message);
		} catch (err: any) {
			setError(err.data);
            throw err;
		} finally {
            setLoading(false);
        }
	};

	const logout = useCallback(() => {
		setUser(null);
        console.log("Logged out!");
	}, [setUser]);

	return {
		user,
		error,
		loading,
		login,
		signup,
		logout,
	};
}

export default useAuth;