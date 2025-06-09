'use client';

import { markMessageRead } from "@/app/actions/readMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const MarkMessageAsReadWrapper = ({id}:{id: string}) => {

    const queryClient = useQueryClient();
    useEffect(() =>{
        (async ()=>{
            await markMessageRead(id);
            //immediately invalidate the query cache
            queryClient.invalidateQueries({queryKey:['unreadMessages']});
        })()
    },[id,queryClient])

    return null;
}