"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [error, setError] = useState<string>('');

	const router = useRouter();

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// username and password will most likely have values, thanks to the 'required' prop, BUT it is possible to remove that manually
		const username = usernameRef.current?.value || '';
		const password = passwordRef.current?.value || '';

		// result will resolve to an object with { error: , status: , ok: , url:  } for CredentialsProvider
		// if an error or null was thrown in authorize(), it (or CredentialsSignIn for null) will be "placed" as a string in 'error'
		const result = await signIn("login", {
			username,
			password,
			redirect: false,		// to handle any errors (invalid credentials) on the same page 
		})

		console.log(`${result ? result.error : 'Invalid result returned'}`);

		if(result && result.error) {
			const errors = JSON.parse(result.error);
			setError(errors.credentials);
		} else {
			setError('');
			router.push('/');
		}
	};

	return (
		<>
			<form onSubmit={submitHandler} className="w-full max-w-2xl my-8 mx-auto">
				<div className=" text-center">
					<h1 className="text-4xl font-bold mb-4">Login</h1>
					<p className="italic">{error}</p>
				</div>
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
