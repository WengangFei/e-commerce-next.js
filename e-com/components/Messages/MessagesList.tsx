'use client';


import { fetchMessageSender } from "@/lib/queries/messages";
import formatDate from "@/utiles/timeFormat";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { MdSendToMobile } from "react-icons/md";


const MessagesList = ({ message }:{message: any}) => {
  
    const { data: sender } = useQuery({
        queryKey: ['message-sender', message.sender],
        queryFn: ({ queryKey }) =>fetchMessageSender(queryKey[1]),
    })

    return ( 
        
        <div className={`${ message.is_read ? 'bg-white' : 'bg-yellow-200'} flex gap-4 my-2 shadow-md p-1 rounded-lg hover:bg-blue-100 hover:cursor-pointer`}>
            <div className='w-12 h-12 relative flex flex-col items-center'>
                <Image
                    src={sender ? sender.image : '/globe.svg'}
                    alt="profile"
                    className="object-cover rounded-full"
                    height={35}
                    width={35}
                />
                <p className='text-xs font-bold'>{message.name.slice(0,3)}</p>
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex items-center gap-1'>
                     <MdSendToMobile color='#3b82f6' size={10}/>
                    <p className='text-xs font-bold'>{message.property?.name ?? 'No Property'}</p>
                </div>
               
                <p className='text-xs'>{message.message.length > 100 ? message.message.slice(0,50) + '...' : message.message}</p>
                <p className='text-[8px] text-gray-400 ml-auto'>{formatDate(message.createdAt.toString())}</p>
             
                
            </div>
            
        </div>
     );
}
 
export default MessagesList;