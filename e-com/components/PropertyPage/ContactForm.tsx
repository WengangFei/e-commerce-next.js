'use client';

import contactForm from "@/app/actions/contactForm";
import { useSession } from "next-auth/react";
import { use, useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const ContactForm = ({ property_id }: { property_id: string}) => {
  type User = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };

    const { data, status } = useSession();
 
      const [state, formAction] = useActionState( async (_: any, formData: FormData) => {
        const response = await contactForm(formData); 
        if (response.success) {
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
        }else{
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
        return response;
      },
      { success: false }
    );
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
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                    type="submit"
                  >
                    <i className="fas fa-paper-plane mr-2"></i> Send Message
                  </button>
                </div>
              </form>
        </div>
     );
}
 
export default ContactForm;