'use server';

import connectDB from "@/config/db";
import Messages from "@/models/Messages";
import { revalidatePath } from "next/cache";


export const deleteMessage = async (messageId : string) => {
   
    await connectDB();
    const message = await Messages.findById(messageId);
    if(!message){
        throw new Error('The message not found!');
    }
    await message.deleteOne();
    revalidatePath('/messages', 'page');

}