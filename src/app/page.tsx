"use client";

import Layout from "@/components/Layout/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();

	return (
		<Layout isLoggedIn={!!session}>
			<main className="flex justify-center items-center h-[70vh]">
				<div className="flex flex-col gap-4">
					<h1 className="text-3xl font-bold text-white">HomePage</h1>
				</div>
			</main>
		</Layout>
	);
}
