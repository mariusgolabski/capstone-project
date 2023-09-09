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
        id: "64f7ca73e809f9f149e39936",
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
        console.log(`find github user with id: ${profile.id} `);

        try {
          const existingUser = await User.findOne({ githubId: profile.id });
          console.log(`Github - user exists with github id: ${profile.id} `);

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
            console.log("saved user with id:", savedUser._id.toString());

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
        } catch (error) {
          console.error("Error while querying MongoDB:", error);
          throw error;
        }
      }
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

    // async redirect({ url, baseUrl }) {
    //   // If a user is signing out, redirect to /auth/signin
    //   if (url === "/") {
    //     return `${baseUrl}/auth/signin`;
    //   }
    //   // For other cases, use the default behavior
    //   return url.startsWith("/") ? `${baseUrl}${url}` : baseUrl;
    // },
  },

  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
