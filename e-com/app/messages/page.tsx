'use client';

import MessagesList from "@/components/Messages/MessagesList";
import { fetchAllMessages } from "@/lib/queries/messages";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const MessagesPage = () => {
    const { data: messages, isLoading, error } = useQuery({
        queryKey: ['all-messages'],
        queryFn: fetchAllMessages,
    });
   
    if (isLoading) return <p className='p-10'>Loading all messages... </p>;
    if (error) return <p className='p-10'>Error loading messages.</p>;

    return ( 
        <div className='p-10'>
            <p className="text-xl font-bold text-blue-500">Your Messages:</p>
            {
                messages.length > 0 ? (
                    messages?.map( 
                        message => (
                        <Link key={message._id as string} href={`/messages/${message._id}`}>
                             <MessagesList key={message._id as string} message={message} />
                        </Link>
                    ))
                ) : (
                    <p className='text-sm'>No messages yet</p>
                )
            }
        </div>
     );
}
 
export default MessagesPage;