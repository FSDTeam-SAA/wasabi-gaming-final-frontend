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

        // ✅ IMPORTANT: explicitly return loginHistory
        return {
          id: user._id,
          email: user.email,
          name: user.schoolName,
          role: user.role,
          image: user.profileImage,
          shareLink: user.shareLink,
          accessToken,
          loginHistory: user.loginHistory ?? [], // 🔥 FIX
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // 🔑 first login only
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.image = user.image;
        token.shareLink = user.shareLink;
        token.accessToken = user.accessToken;

        // 🔥 VERY IMPORTANT
        token.loginHistory = user.loginHistory;
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

        // 🔥 FIX
        session.user.loginHistory = token.loginHistory as any[];
        session.accessToken = token.accessToken as string;
      }

      

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


