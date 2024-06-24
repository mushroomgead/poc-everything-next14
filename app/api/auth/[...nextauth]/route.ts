import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
// import "dotenv/config";

console.log("process.env.GITHUB_IDx: ", process.env.GITHUB_ID);

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
});

export { handler as GET, handler as POST };
