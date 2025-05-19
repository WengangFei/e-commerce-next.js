import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getUserSession = async () => {
    const session = await getServerSession(authOptions);
    if(!session || !session.user) return null;
    return session;

    };