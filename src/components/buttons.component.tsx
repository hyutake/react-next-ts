"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "./UI/Button";

export const LoginButton = () => {
	return (
		<Button onClick={() => signIn()} label="Login" />
	);
};

export const LogoutButton = () => {
	const logoutHandler = () => {
		const proceed = window.confirm("Logout?");
		if(proceed) {
			signOut({
				redirect: true,
				callbackUrl: '/'
			})
		}
	}

	return (
		<Button onClick={logoutHandler} label="Logout" />
	);
};

export const ProfileButton = () => {
	return (
		<Link href="/profile">
			<Button label="Profile" />
		</Link>
	);
};

export const ServerButton = () => {
	return (
		<Link href="/server">
			<Button label="Server" />
		</Link>
	)
}
