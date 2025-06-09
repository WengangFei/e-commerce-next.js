'use client'

import { deleteProperty } from "@/app/actions/deleteProperty";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IoIosWarning } from "react-icons/io";
import Link from "next/link";
import { iProperty } from "@/utiles/type";
 

const PropertyList = ({ property }:{ property: iProperty}) => {
// console.log('property =>',property);
    //delete property
    const handleDeleteProperty = async (id:string) => {
        
        deleteProperty(id);
        toast.success('Deleting the Property......',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }


    return ( 
            <div className="mb-10 shadow-md p-4 rounded-lg" key={property._id as string}>
            <a href="/property.html">
            <Image
                className="rounded-md object-cover w-fit h-auto"
                src={ property.images[0] }
                alt="Property"
                width={450}
                height={200}
                priority
            />
            </a>
            <div className="mt-2">
                <p className="text-lg font-semibold">Property Name</p>
                <p className="text-gray-600">
                    { property.name }
                </p>
                <div>
                    <span className="font-semibold">Location:</span> 
                    <p className='text-gray-600 text-[10px] md:text-sm'>
                        { property.location.street + ' ' + property.location.city + ', ' + property.location.state + ' ' + property.location.zipcode }
                    </p>
                    
                </div>
            </div>
            <div className="mt-2 text-[10px] flex gap-4">
                <Button variant="outline" className='text-xs !px-1 !py-1 cursor-pointer ml-auto' size={null}>
                    <Link href={`/properties/${property._id}/edit`}>Edit</Link>
                    
                    <FaEdit color='gray'/>
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className='text-xs !px-1 !py-1 cursor-pointer' size={null}>Delete
                            <MdDeleteForever size={10} color='red'/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                        <DialogTitle className='text-red-500 flex items-center gap-4 justify-center'>
                            Warning
                            <IoIosWarning color='#FFC300' size={30}/>
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this property?
                        </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild className='ml-auto'>
                            <Button type="button" variant="destructive" className='cursor-pointer hover:bg-red-500'
                            onClick={()=>handleDeleteProperty(property._id as string)}
                            >
                                Delete
                            </Button>
                        </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                
            </div>
        </div>
     );
}
 
export default PropertyList;