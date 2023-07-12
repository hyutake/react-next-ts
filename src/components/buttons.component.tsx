"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
	return (
		<button
			className="rounded border text-primary-blue-005 border-white bg-transparent px-4 py-2 hover:bg-primary-blue-005 hover:text-cool-gray-90"
			onClick={() => signIn()}
		>
			Login
		</button>
	);
};

export const RegisterButton = () => {
	return (
		<Link href="/register">
			<button className="mr-3 py-2 px-4 rounded-3xl bg-cool-gray-100 hover:bg-primary-blue-005">
				Register
			</button>
		</Link>
	);
};

export const LogoutButton = () => {
	return (
		<button
			className="rounded border text-primary-blue-005 border-white bg-transparent px-4 py-2 hover:bg-primary-blue-005 hover:text-cool-gray-90"
			onClick={() => signOut()}
		>
			Logout
		</button>
	);
};

export const ProfileButton = () => {
	return (
		<Link href="/profile">
			<button className="rounded border text-primary-blue-005 border-white bg-transparent px-4 py-2 hover:bg-primary-blue-005 hover:text-cool-gray-90">
				Profile
			</button>
		</Link>
	);
};
