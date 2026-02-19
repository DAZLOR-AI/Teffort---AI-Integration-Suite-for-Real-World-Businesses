import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "email" } },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        return { id: "demo-user", email: credentials.email, name: "Demo User" };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  secret: process.env.NEXTAUTH_SECRET
};
