"use client";

import { useSession } from "next-auth/react";

const User: React.FC = () => {
	// the Session object returned from useSession() takes awhile to "load", meaning that the status will be 'loading'
	// hence, console.log(data) here will just yield a User object that has all its properties as 'undefined'
	const { data, status } = useSession();

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	const renderSessionData = (sessionData: any) => {
		// sessionData: { sub: , token: , id: , iat: , exp: , jti: }
		return (
			<ul>
				<li>
					<strong>status: </strong>
					{status}
				</li>
				{Object.keys(sessionData).map((key) => {
					if (key === "iat" || key === "exp" || key === 'tokenExpiry') {
						// iat & exp represent the # of seconds since EPOCH (1970-01-01T00:00:00Z) apparently
						const formattedDate = new Date(
							sessionData[key] * 1000
						).toLocaleString("en-US", { timeZone: "Asia/Singapore" });
						return (
							<li key={key}>
								<strong>{key}: </strong>
								<span className="italic">{`${formattedDate} (value: ${sessionData[key]})`}</span>
							</li>
						);
					} else if(key === 'isExpired') {
						return (
							<li key={key}>
								<strong>{key}: </strong>
								<span className="italic">{sessionData[key] ? 'true' : 'false'}</span>
							</li>
						);
					}
					return (
						<li key={key}>
							<strong>{key}: </strong>
							<span className="italic">{sessionData[key]}</span>
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<div>
			<h1 className="text-3xl font-bold">Client Session</h1>
			{renderSessionData(data?.user)}
		</div>
	);
};

export default User;