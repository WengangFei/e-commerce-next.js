
// lib/queries/messages.ts
import connectDB from "@/config/db";
import Messages from "@/models/Messages";
import User from "@/models/User";


export const fetchUnreadMessages = async () => {
    const res = await fetch('/api/messages');
    const data = await res.json();
    return data.filter((msg: any) => !msg.is_read);
}



export const fetchAllMessages = async () => {

    try{
        const resp = await fetch('/api/messages',{
            cache: 'no-cache',
        });
        if(!resp.ok){
            throw new Error('Failed to fetch messages');
        }
        const data = await resp.json();
        return data;
    }catch(error){
        console.log(error);
    }
};

export const fetchMessageSender = async (id: string) => {
    
    try{
        const resp = await fetch(`/api/messages/sender/${id}`);
        if(!resp.ok){
            throw new Error('Failed to fetch messages sender');
        }
        const data = await resp.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

