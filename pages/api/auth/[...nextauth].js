import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/db/models/User";

// let savedUser = null; need this for later

const fakeLogin = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "testuser" },
    password: { label: "Password", type: "password", placeholder: "testuser" },
  },
  async authorize(credentials) {
    if (
      credentials.username === "testuser" &&
      credentials.password === "testuser"
    ) {
      return {
        id: "64f7ca73e809f9f149e39936",
      };
    } else {
      return null;
    }
  },
});

const providers = [fakeLogin];

export const authOptions = {
  providers,
  callbacks: {
    async signIn({ account, profile }) {
      // need this for later
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};
export default NextAuth(authOptions);
