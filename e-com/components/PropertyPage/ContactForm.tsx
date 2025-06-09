'use client';

import contactForm from "@/app/actions/contactForm";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import ContactFormSubmitButton from "./ContactFormSubmitButton";


 type User = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
const ContactForm = ({ property_id }: { property_id: string}) => {
 

      const { data, status } = useSession();
 
      const [state, formAction] = useActionState( contactForm,{ success: false });
      
    // update react query
    const queryClient = useQueryClient();
    useEffect(() => {
      if (state.success) {
       queryClient.invalidateQueries({ queryKey: ['all-messages']});
       queryClient.invalidateQueries({ queryKey: ['unreadMessages']});
      }
       if (state.success) {
          toast.success("Message sent successfully",{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (state.success === 'failed') {
          toast.error("Failed to send message",{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
    }, [state.success]);

    if (status === "loading") {
      return <p>Loading session...</p>;
    } 
    

    return ( 
        <div className='md:text-sm text-8px mt-8'>
            <h1 className='text-sm mb-4 font-bold text-center text-blue-500 md:text-xl'>contact form</h1>
               <form action={formAction}>
                <div className="mb-4">
                  <input 
                    type="hidden" name="sender_id" value={(data?.user as User)?.id}/>
                  <input 
                    type="hidden" name="property_id" value={property_id}/> 
                    
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    defaultValue={data?.user?.name ?? ''}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    defaultValue={data?.user?.email ?? ''}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="message"
                  >
                    Message:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <div>
                  <ContactFormSubmitButton />
                </div>
              </form>
        </div>
     );
}
 
export default ContactForm;