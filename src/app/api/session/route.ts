import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
        authenticated: !!session,   // literally just a double negation to 'force' the value of session to be a boolean value
        session
    });
}