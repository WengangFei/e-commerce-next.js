'use server';

import connectDB from "@/config/db";
import Messages from "@/models/Messages";
import { revalidatePath } from "next/cache";

export const markMessageRead = async (id: string) => {
        await connectDB();
        try{
            await Messages.findByIdAndUpdate(id, {is_read: true});
            revalidatePath('/messages','page');
        }catch(error){
            console.log(error);
        }
}