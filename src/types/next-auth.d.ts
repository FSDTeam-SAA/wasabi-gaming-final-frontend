import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      shareLink: string;
      loginHistory?: any[];
    } & DefaultSession["user"];

    // 🔥 ADD THIS
    accessToken?: string;
  }

  interface User {
    role: string;
    accessToken?: string;
    shareLink: string;
    loginHistory?: any[];
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    shareLink?: string;
    accessToken?: string;
    loginHistory?: any[];
    image?: string | null;
  }
}



// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: string;
//       accessToken?: string;
//       loginHistory?: any[];
//     } & DefaultSession["user"];
//   }

//   interface User {
//     role: string;
//     accessToken?: string;
//     loginHistory?: any[];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string;
//     role?: string;
//     accessToken?: string;
//     loginHistory?: any[];
//   }
// }



