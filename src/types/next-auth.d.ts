import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            token: string;
            id: string;
            tokenExpiry: number;
        }
    }
}