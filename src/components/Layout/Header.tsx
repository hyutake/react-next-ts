"use client";

import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton, ProfileButton } from "../buttons.component";

interface HeaderProps {
	isLoggedIn?: boolean; // optional prop
}

const Header: React.FC<HeaderProps> = () => {
	const { data: session } = useSession();

	const isLoggedIn = !!session;

	const nonLoggedInHeaderList = (
		<ul className="flex">
			<li>
				<LoginButton />
			</li>
		</ul>
	);

	const loggedInHeaderList = (
		<ul className="flex justify-between gap-3">
			<li>
				<ProfileButton />
			</li>
			<li>
				<LogoutButton />
			</li>
		</ul>
	);

	return (
		<header className="flex justify-between p-4 bg-cool-gray-90">
			<h1 className="text-3xl font-bold flex items-center justify-center">
				<a href="/">クリスプ</a>
			</h1>
			<nav className="flex flex-row items-center justify-between">
				{isLoggedIn ? loggedInHeaderList : nonLoggedInHeaderList}
			</nav>
		</header>
	);
};

export default Header;
