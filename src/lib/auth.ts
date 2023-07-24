import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// To configure the NextAuth API handler... or smth like that 
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,  // 1 hour -> refers to the maximum IDLE time (i.e. time spent NOT ON the webpage) allowed before the token is expired
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
        const response = await fetch(`http://${process.env.BACKEND_SERVER}:4000/auth/login`, {
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
    // jwt callback is triggered when token is created (returns the token) - seems to also include everytime the session is accessed :/
    // will only have 'user', 'account', 'profile' and 'isNewUser' as input args on the FIRST time this is called on a NEW session
    // 'user' is the return value of authorize(), but this is for CredentialProvider only (I think?)
    jwt: async ({ token, user }) => {
      // you can persist data (from those "limited edition" parameters) by 'attaching' it to token
      // !! Note that 'token' here is NOT the full jwt token, it is just the "payload" part of the jwt token (middle section) !!
      console.log("=== JWT CALLBACK ===");  // just to check when jwt() is triggered
      
      // token will initially contain sub, iat, exp and jti (also known as "claims")
      /*
        sub: "subject" - somehow takes on the value of user.id automatically O.o (string)
        iat: "initialised at" (I think) - basically when this jwt() callback was called (number)
        exp: "expires at" - basically iat + maxAge (set in the session: {} option) (number)
        jti: "json token identifier" - unique id for this json web token (string)
      */

      if(user && user.id) { // user exists = first callback --> merge user (return val from authorize()) into token
        return { ...token, ...user, isExpired: false };
      }

      // check expiry: backend to be modified to return tokenExpiry as well
      const now = new Date();
      if(now > new Date(token.tokenExpiry as number * 1000)) {
        console.log("Access token expired!");
        token.isExpired = true;
      }

      return token;
    },
    // session callback is called whenever a session for the user is checked
    // note that the 'token' in the input arg IS the return value of jwt() - jwt() is ALWAYS called BEFORE session()
    // hence, because session() is triggered when calling useSession(), it will call jwt() as well because that is what it needs
    session: async ({ session, token }) => {
      session.user = token as any;
      return session;
    }
  },
  pages: {
    signIn: '/auth/?mode=login',
  },
  events: {
    // triggers after successful sign in - just for debug logs I think
    signIn() {
        console.log('=== signIn() event! ===');
    },
    // triggers after successful sign out
    signOut() {
      console.log('=== signOut() event! ===');
    },
  }
};
