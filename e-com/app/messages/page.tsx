'use client';

import MessagesList from "@/components/Messages/MessagesList";
import { fetchAllMessages } from "@/lib/queries/messages";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import { deleteMessage } from "../actions/deleteMessage";
import { toast } from "react-toastify";


const MessagesPage = () => {
    const { data: messages, isLoading, error, refetch,isSuccess } = useQuery({
        queryKey: ['all-messages'],
        queryFn: fetchAllMessages,
    });

    const queryClient = useQueryClient();
    //delete message
    const deleteMessageHandler = async (messageId: string) => {
        await deleteMessage(messageId);
        queryClient.invalidateQueries(['unreadMessages'])
        toast('Message deleted successfully!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        refetch();
    }
   
    if (isLoading) return <p className='p-10'>Loading all messages... </p>;
    if (error) return <p className='p-10'>Error loading messages.</p>;

    return ( 
        <div className='flex flex-col p-10 md:p-20'>
            <p className="text-xl font-bold text-blue-500">Your Messages:</p>
            {
                messages ? (
                    messages?.map( 
                        message => (
                            <div className='items-center justify-center flex w-full gap-1 ' key={message._id as string}>
                                <Link href={`/messages/${message._id}`} className='flex-grow'>
                                    <MessagesList key={message._id as string} message={message} />
                                </Link>
                                <div className='flex flex-col gap-2 bg-blue-300 px-4 py-2 rounded-lg'>
                                    <button onClick={() => deleteMessageHandler(message._id)}>
                                    <MdDeleteForever color='red' size={20} className='hover:cursor-pointer hover:scale-130'/>
                                    </button>
                                    <span className='text-[8px] font-bold text-black '>Delete</span>
                                </div>
                                
                            </div>
                        
                    ))
                ) : (
                    <p className='text-sm'>No messages yet</p>
                )
            } 
           
        </div>
     );
}
 
export default MessagesPage;