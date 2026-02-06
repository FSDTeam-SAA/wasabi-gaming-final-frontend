import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        deviceInfo: { label: "Device Info", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email & password required");
        }

        const deviceInfo = credentials.deviceInfo
          ? JSON.parse(credentials.deviceInfo)
          : null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              deviceInfo,
            }),
          }
        );

        const result = await res.json();

        console.log("Login result:", result);

        if (!res.ok || !result?.success) {
          throw new Error(result?.message || "Login failed");
        }

        const { user, accessToken } = result.data;

        return {
          id: user._id,
          email: user.email,
          name: user.schoolName,
          role: user.role,
          image: user.profileImage,
          shareLink: user.shareLink,
          accessToken,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial login - populate token with user data
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.image = user.image;
        token.shareLink = user.shareLink;
        token.accessToken = user.accessToken;
      }

      // Handle session update (e.g., profile changes)
      if (trigger === "update" && session) {
        if (session.user) {
          token.name = session.user.name ?? token.name;
          token.image = session.user.image ?? token.image;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
        session.user.shareLink = token.shareLink as string;
        session.accessToken = token.accessToken as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  // JWT Configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Cookie Configuration for Production
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  // Use secure cookies in production
  useSecureCookies: process.env.NODE_ENV === "production",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


