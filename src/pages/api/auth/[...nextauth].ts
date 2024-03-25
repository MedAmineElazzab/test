import api from "@/_v1/api/api";
import { setCookie } from "cookies-next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process?.env?.GOOGLE_CLIENT_ID as string,
      clientSecret: process?.env?.GOOGLE_CLIENT_SECRET as string,
    }),
    LinkedinProvider({
      clientId: process?.env?.LINKEDIN_CLIENT_ID as string,
      clientSecret: process?.env?.LINKEDIN_CLIENT_SECRET as string,
      accessTokenUrl: process?.env?.LINEKDIN_ACCESS_TOKEN as string,
      authorization: {
        params: { scope: "openid profile email" },
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      profile(profile, tokens) {
        const defaultImage =
          "https://cdn-icons-png.flaticon.com/512/174/174857.png";
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? defaultImage,
        };
      },
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password, remember } = credentials as any;
        try {
          const { data } = await api.post<{
            user: {
              id: string;
              email: string;
              firstName: string;
              lastName: string;
            };
            accessToken: string;
            token: string;
            refreshToken: string;
          }>("/auth/signin", {
            email,
            password,
            remember: remember === "true" ? true : false,
          });
          return {
            id: data?.user?.id,
            email: data?.user?.email,
            name: data?.user?.firstName + " " + data?.user?.lastName,
            image: data?.accessToken + "|" + data?.refreshToken,
          };
        } catch (error: any) {
          throw new Error(
            error?.cause ? error?.cause : "Email ou mot de passe n'existe pas!"
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
        });
      }
      return session;
    },
  },
  pages: {
    signIn: "/v2/auth/",
    // error: "/auth/error",
    // signOut: "/auth/signout",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

export default NextAuth(authOptions);
