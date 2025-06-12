import { authOptions } from "@/utiles/authOptions";
import NextAuth from "next-auth/next";

console.log('running auth......')
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };