import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/db/models/User";

let savedUser = null;

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // httpOptions: {
      // https://github.com/nextauthjs/next-auth/issues/3920
      //
      //         https://next-auth.js.org/errors#oauth_callback_error connect ETIMEDOUT 140.82.121.5:443 {
      //   error: Error: connect ETIMEDOUT 140.82.121.5:443
      //       at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1595:16) {
      //     name: 'OAuthCallbackError',
      //     code: 'ETIMEDOUT'
      //   },
      //   providerId: 'github',
      //   message: 'connect ETIMEDOUT 140.82.121.5:443'
      // }

      //         Whoa there!
      // You have exceeded a secondary rate limit.

      // Please wait a few minutes before you try again;
      // in some cases this may take up to an hour.

      //   timeout: 40000,
      // only local?!
      // },
    }),
  ],

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

  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
