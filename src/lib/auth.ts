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
    CredentialsProvider({
      id: "google-login",
      name: "Google Login",
      credentials: {
        idToken: { label: "Google ID Token", type: "text" },
        role: { label: "Role", type: "text" },
        tempToken: { label: "Temp Token", type: "text" },
      },
      async authorize(credentials) {
        // CASE 1: Completing Registration (Step 2)
        if (credentials?.tempToken && credentials?.role) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/complete-google-registration`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                tempToken: credentials.tempToken,
                role: credentials.role,
              }),
            }
          );

          const result = await res.json();

          if (!res.ok || !result?.success) {
            throw new Error(result?.message || "Registration failed");
          }

          const { user, accessToken } = result.data;

          return {
            id: user._id,
            email: user.email,
            name: user.schoolName || `${user.firstName} ${user.lastName}`,
            role: user.role,
            image: user.profileImage,
            shareLink: user.shareLink,
            accessToken,
          };
        }

        // CASE 2: Initial Google Login (Step 1)
        if (credentials?.idToken) {
          const apiURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google-login`;
          console.log("🔐 Authenticating with Google ID Token at:", apiURL);

          const res = await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idToken: credentials.idToken,
            }),
          });

          const result = await res.json();
          console.log("📥 Google Login API Result:", JSON.stringify(result, null, 2));

          if (!res.ok || !result?.success) {
            // Check if backend returned needsRole in a failure structure
            if (result?.data?.needsRole) {
              throw new Error(JSON.stringify({
                code: "ROLE_REQUIRED",
                tempToken: result.data.tempToken
              }));
            }
            throw new Error(result?.message || result?.error || "Google Login failed");
          }

          // Handle needsRole case (Success 200 but needs action)
          if (result?.data?.needsRole) {
            throw new Error(JSON.stringify({
              code: "ROLE_REQUIRED",
              tempToken: result.data.tempToken
            }));
          }

          const { user, accessToken } = result.data;

          return {
            id: user._id,
            email: user.email,
            name: user.schoolName || `${user.firstName} ${user.lastName}`,
            role: user.role,
            image: user.profileImage,
            shareLink: user.shareLink,
            accessToken,
          };
        }

        throw new Error("Invalid credentials");
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

    async redirect({ url, baseUrl }) {
      // Handle logout - redirect to home page
      if (url.startsWith(baseUrl + "/api/auth/signout") || url === baseUrl) {
        return baseUrl;
      }

      // Handle login redirects based on role
      if (url.startsWith(baseUrl)) {
        return url;
      }

      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

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

  useSecureCookies: process.env.NODE_ENV === "production",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
