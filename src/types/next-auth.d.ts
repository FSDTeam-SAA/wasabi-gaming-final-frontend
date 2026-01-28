import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      accessToken?: string;
      loginHistory?: any[];
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    accessToken?: string;
    loginHistory?: any[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    accessToken?: string;
    loginHistory?: any[];
  }
}



