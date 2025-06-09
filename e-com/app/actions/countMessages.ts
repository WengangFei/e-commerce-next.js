'use server';

import connectDB from "@/config/db";
import Messages from "@/models/Messages";
import { getUserSession } from "@/utiles/getUserSession";



export const countUnreadMessages = async () =>{
    const { user } = await getUserSession();
    await connectDB();
    const messagesCount = await Messages.countDocuments({
        receiver: user.id,
        is_read: false,
    }).lean();
    return messagesCount
}