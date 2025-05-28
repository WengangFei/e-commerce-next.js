'use client'

import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { iProperty } from "@/utiles/type";
import { toast } from "react-toastify";



const BookmarkPage = ({ details }: { details: iProperty }) => {

    const [marked, setMarked] = useState(false);

    //fetch bookmark status
    useEffect(() => {
        (async () => {
            const resp = await fetch(`/api/bookmark/${details._id}`);
            const result = await resp.json();
            setMarked(result.bookmarked);
        })();
    },[]);

    const handleBookmark = async () => {
        const resp = await fetch(`/api/bookmark/${details._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ flag: marked }),
        });

        const result = await resp.json();
        if (result.success) {
            toast.success(result.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        };
        setMarked(result.bookmarked);
    }

    
    return ( 
        <div>
            <button
              className={`${ marked ? 'bg-red-500' : 'bg-blue-500'} hover:bg-blue-600 text-white font-bold w py-2 px-4 gap-2 rounded-lg flex items-center justify-center w-full hover:cursor-pointer`}
              onClick={handleBookmark}
            >
                {
                    marked ? (
                        <>
                            <FaBookmark />
                            <span className='text-sm'>Bookmarked Property</span>
                        </>
                        
                    ) : (
                        <>
                            <FaRegBookmark />
                            <span className='text-sm'>Bookmark Property</span>
                        </>
                        
                    )
                }
                
            </button>
           

        </div>
     );
}
 
export default BookmarkPage;