import { Formik } from "formik";
import Link from "next/link";

interface FormValues {
	username: string;
	password: string;
}

interface FormErrors {
	username?: string;
	password?: string;
}

interface FormProps {
	authErrors?: object;
	mode: string;
	onSubmit: (values: FormValues) => Promise<void>;
}

const AuthForm: React.FC<FormProps> = ({ authErrors, mode, onSubmit }) => {
	console.log(authErrors);

	return (
		<div>
			<Formik
				initialValues={{ username: "", password: "" }}
				validate={(values: FormValues) => {
					// validate form input values
					const errors: FormErrors = {};
					if (!values.username) {
						errors.username = "Username cannot be empty!";
					}
					if (!values.password) {
						errors.password = "Password cannot be empty";
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					console.log("Submitting...");
					setTimeout(() => {
						onSubmit(values);
						setSubmitting(false);
					}, 400);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form
						onSubmit={handleSubmit}
						className="w-full max-w-2xl my-8 mx-auto"
					>
						<div className="text-center">
							<h1 className="text-4xl font-bold mb-4">
								{mode === "login" ? "Login" : "Sign up"}
							</h1>
							{authErrors && (
								<ul>
									{Object.values(authErrors).map((err) => {
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
								id="username"
								type="text"
								name="username"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.username}
								required
							/>
						</p>
						{touched.username && errors.username && (
							<p className="text-red-400">*{errors.username}</p>
						)}
						<p className="mb-2">
							<label className="w-full block font-semibold" htmlFor="password">
								Password
							</label>
							<input
								className="w-full block p-1 rounded text-center text-cool-gray-90"
								id="password"
								type="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								required
							/>
						</p>
						{touched.password && errors.password && (
							<p className="text-red-400">*{errors.password}</p>
						)}
						{mode === "login" && (
							<div className="flex justify-between">
								<p>
									New user? Click{" "}
									{
										<Link
											href="/auth/?mode=signup"
											className="text-blue-300 hover:underline"
										>
											here
										</Link>
									}{" "}
									to sign up!
								</p>
								<div className="flex items-center justify-end gap-4">
									<Link className="hover:text-red-400" href={"/"}>
										Cancel
									</Link>
									<button
										type="submit"
										className="py-2 px-6 rounded bg-zinc-200 text-cool-gray-100 hover:bg-primary-blue-005"
										disabled={isSubmitting}
									>
										Submit
									</button>
								</div>
							</div>
						)}
						{mode === "signup" && (
							<div className="flex items-center justify-end gap-4">
								<Link className="hover:text-red-400" href={"/auth/?mode=login"}>
									Return to Login
								</Link>
								<button
									type="submit"
									className="py-2 px-6 rounded bg-zinc-200 text-cool-gray-100 hover:bg-primary-blue-005"
								>
									Register
								</button>
							</div>
						)}
					</form>
				)}
			</Formik>
		</div>
	);
};

export default AuthForm;
