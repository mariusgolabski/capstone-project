import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/db/models/User";

let savedUser = null;

const fakeLogin = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "testuser" },
    password: { label: "Password", type: "password", placeholder: "testuser" },
  },
  // and adding a fake authorization with static username and password:
  async authorize(credentials) {
    if (
      credentials.username === "testuser" &&
      credentials.password === "testuser"
    ) {
      return {
        _id: "64f7ca73e809f9f149e39936",
        firstName: "test",
        lastName: "test",
        jobTitle: "test",
        companyName: "test",
        userCoverImagePath: "/bg3.jpg",
        userProfileImagePath:
          "https://avatars.githubusercontent.com/u/22275708?v=4",
        email: "m.golabski@gmx.de",
        githubId: "22275708",
      };
    } else {
      return null;
    }
  },
});

const providers =
  process.env.VERCEL_ENV === "preview"
    ? [fakeLogin]
    : [
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
        // ...add more providers here
      ];

export const authOptions = {
  providers,
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "github") {
        const existingUser = await User.findOne({ githubId: profile.id });

        if (!existingUser) {
          // If the user doesn't exist, create a new user record
          const newUser = new User({
            firstName: "test",
            lastName: "test",
            jobTitle: "test",
            companyName: "test",
            userCoverImagePath: "/bg3.jpg",
            userProfileImagePath: profile.avatar_url,
            email: profile.email,
            githubId: profile.id,
          });

          savedUser = await newUser.save();
          console.log("Saved user ID:", savedUser._id.toString());

          return {
            id: savedUser._id.toString(),
            user: savedUser,
          };
        } else {
          savedUser = existingUser; // Use the existing user
          return {
            id: existingUser._id.toString(),
            user: existingUser,
          };
        }
      }
      return true; // Allow sign-in to proceed
    },

    async jwt({ token, user }) {
      if (user && savedUser) {
        token.id = savedUser._id.toString();
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },

  // pages: {
  //   signIn: "/auth/signin",
  // },
};

export default NextAuth(authOptions);
