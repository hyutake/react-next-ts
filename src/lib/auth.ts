import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// To configure the NextAuth API handler... or smth like that 
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,  // 1 hour
  },
  providers: [
    CredentialsProvider({
      id: "login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter username here..." },
        password: { label: "Password", type: "password", placeholder: "Enter password here..." },
      },
      async authorize(credentials) {
        const {username, password} = credentials as { username: string; password: string }
        const response = await fetch("http://localhost:4000/auth/login", {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { "Content-Type" : 'application/json' }
        })

        const data = await response.json();

        if(response.status === 422) {   // backend will return validation errors back as a res with status 422
          console.log(data.message);
          throw new Error(JSON.stringify(data.errors));
        }

        if(response.ok && data) return data;  // login is authenticated by backend, will return user-specific identification info

        return null;  // throws 'CredentialsSignIn' as an error automatically, which will affect the return value of signIn()
      },
    }),
  ],
  callbacks: {
    // jwt callback is triggered when token is created (returns the token)
    // will only have 'user', 'account', 'profile' and 'isNewUser' as input args on the FIRST time this is called on a NEW session
    // 'user' is the return value of authorize(), but this is for CredentialProvider only (I think?)
    jwt: async ({ token, user }) => {
      // you can persist data (from those "limited edition" parameters) by 'attaching' it to token
      return { ...token, ...user };
    },
    // session callback is called whenever a session for the user is checked
    // note that the 'token' in the input arg IS the return value of jwt() - jwt() is ALWAYS called BEFORE session()
    session: async ({ session, token }) => {
      // console.log('=== session() callback! ===')
      // console.log(token);

      session.user = token as any;
      // console.log(session);
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  events: {
    // triggers after successful sign in - just for debugging
    signIn() {
        console.log('=== signIn() event! ===');
    },
    // triggers after successful sign out
    signOut() {
      console.log('=== signOut() event! ===');
    },
  }
};
