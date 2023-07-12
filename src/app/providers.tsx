"use client";

import ScoreProvider from "@/store/score-context";
import { SessionProvider } from "next-auth/react";

type Props = {
	children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
	return (
		<SessionProvider>
			<ScoreProvider>{children}</ScoreProvider>
		</SessionProvider>
	);
};
