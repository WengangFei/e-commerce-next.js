import connectDB from "@/config/db";
import User from "@/models/User";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; 

export const authOptions: AuthOptions = {
    // debug: true,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Missing email or password");
                }
                const user = await User.findOne({ email: credentials?.email });
                
                if (!user) {
                    throw new Error("No user found with this email");
                }
                const isPasswordValid = await bcrypt.compare(credentials?.password as string, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }
                return { id: user._id.toString(), email: user.email, name: user.username };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            httpOptions: {
                timeout: 100000
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            httpOptions: {
                timeout: 100000
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        //Invoked on successful login
        async signIn({ user, account, email, credentials }) {      
            await connectDB();
            //create user in db
            if (!user?.email) {
                console.log("Email not available in profile");
                return false;
            }

            const userExist = await User.findOne({ email: user.email });

            if (!userExist) {
                try {
                    await User.create({
                        email: user.email,
                        username: user.name || "NewUser",
                        image: (user as any).avatar_url || user.image || "", // GitHub uses `avatar_url`
                    });
                } catch (err) {
                    console.log("User creation error:", err);
                    return false;
                }
            }

            return true;
        },
        //session callback function that modifies the session object before it is returned to the client
        async session({ session }: any) {
           
            const user = await User.findOne({ email: session.user.email });
            if (user) {
                session.user.id = user._id.toString();
            }
            return session;
        }
    },
};