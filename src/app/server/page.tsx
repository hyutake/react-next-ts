import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Layout from "@/components/Layout/Layout";

// maybe just move to profile or smth
const ServerPage = async () => {
	const session = await getServerSession(authOptions);
	console.log("=== getServerSession(authOptions) in Home() ===");
	console.log(session);
	const user = session ? session.user : null;

	return (
		<main className="flex justify-center items-center h-[70vh]">
			<div>
				{user && (
					<div className="max-w-4xl break-words">
						<h2 className="text-2xl font-bold text-white">Server Session</h2>
						<p>Id: {user.id}</p>
						<p>Token: {user.token}</p>
					</div>
				)}
			</div>
		</main>
	);
};

export default ServerPage;
