"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginPage: React.FC = () => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// username and password will most likely have values, thanks to the 'required' prop, but you can technically remove that manually
		const username = usernameRef.current?.value || '';
		const password = passwordRef.current?.value || '';
		console.log("Username: " + username);
		console.log("Password: " + password);

		// result will resolve to an object with { error: , status: , ok: , url:  } for CredentialsProvider
		const result = await signIn("credentials", {
			username,
			password,
			redirect: false,		// to deal with errors on the same page
		})

		console.log(result);
	};

	return (
		<>
			<form onSubmit={submitHandler} className="w-full max-w-2xl my-8 mx-auto">
				<h1 className="text-4xl font-bold mb-4">Login</h1>
				<p className="mb-2">
					<label className="w-full block font-semibold" htmlFor="username">
						Username
					</label>
					<input
						className="w-full block p-1 rounded text-center text-cool-gray-90"
						ref={usernameRef}
						id="username"
						type="text"
						name="username"
						required
					/>
				</p>
				<p className="mb-2">
					<label className="w-full block font-semibold" htmlFor="password">
						Password
					</label>
					<input
						className="w-full block p-1 rounded text-center text-cool-gray-90"
						ref={passwordRef}
						id="password"
						type="password"
						name="password"
						required
					/>
				</p>
				<div className="flex justify-between">
					<p>New user? Click {<Link href='/signup' className="text-blue-300 hover:underline">here</Link>} to sign up!</p>
					<div className="flex items-center justify-end gap-4">
						<Link className="hover:text-red-400" href={"/"}>
							Cancel
						</Link>
						<button className="py-2 px-6 rounded bg-zinc-200 text-cool-gray-100 hover:bg-primary-blue-005">
							Submit
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default LoginPage;
