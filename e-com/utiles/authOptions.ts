import connectDB from "@/db_config/db";
import User from "@/models/User";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


console.log('Starting google provider......')


export const authOptions = {
    // debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {//not auto choose last login google account
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
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
        async signIn({ user, account, profile, email, credentials }) {      
            console.log("signIn ..........");
            await connectDB();
            //create user in db
            if (!profile?.email) {
                console.log("Email not available in profile");
                return false;
            }

            const userExist = await User.findOne({ email: profile.email });

            if (!userExist) {
                try {
                    await User.create({
                        email: profile.email,
                        username: profile.name || "NewUser",
                        image: profile.avatar_url || profile.image || "", // GitHub uses `avatar_url`
                    });
                } catch (err) {
                    console.log("User creation error:", err);
                    return false;
                }
            }

            return true;
        },
        //session callback function that modifies the session object before it is returned to the client
        async session({ session }) {
            console.log('session => ', session);
           
            const user = await User.findOne({ email: session.user.email });
            if (user) {
                session.user.id = user._id.toString();
            }
            return session;
            
            
        }
    },
};