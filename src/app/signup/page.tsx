"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

const SignupPage: React.FC = () => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [error, setError] = useState<object | null>(null);

	const router = useRouter();

	const scrambleString = (input: string) => {
		const characters = input.split(""); // get each individual character
		const scrambled = characters.sort(() => Math.random() - 0.5);
		return scrambled.join("");
	};

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// username and password will most likely have values, thanks to the 'required' prop, BUT it is possible to remove that manually
		const username = usernameRef.current?.value || "";
		const password = passwordRef.current?.value || "";
		const alias = scrambleString(username); // get a randomized alias based on username

		console.log("Alias: " + alias);

		const response = await fetch("http://localhost:4000/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username,
				password,
				alias,
			}),
		});

		const data = await response.json();

		if (response.status === 422) {
			console.log(data.message);
			setError(data.errors);
		} else if (response.ok) {
			setError({});
			console.log(data.message);
			router.push("/login");
		}
	};

	return (
		<>
			<form onSubmit={submitHandler} className="w-full max-w-2xl my-8 mx-auto">
				<div className=" text-center">
					<h1 className="text-4xl font-bold mb-4">Sign Up</h1>
					{error && (
						<ul>
							{Object.values(error).map((err) => {
								return <li key={err}>{err}</li>;
							})}
						</ul>
					)}
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

				<div className="flex items-center justify-end gap-4">
					<Link className="hover:text-red-400" href={"/login"}>
						Return to Login
					</Link>
					<button className="py-2 px-6 rounded bg-zinc-200 text-cool-gray-100 hover:bg-primary-blue-005">
						Register
					</button>
				</div>
			</form>
		</>
	);
};

export default SignupPage;
