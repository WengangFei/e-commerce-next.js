'use client';


import { useFormStatus } from "react-dom";
import { IoSendSharp } from "react-icons/io5";


const FormSubmitButton = () => {
    
    const { pending } = useFormStatus();

    return ( 
         <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center hover:cursor-pointer"
            type="submit"
            >
            { pending ? 'Submit...' : 'Submit' }
            <IoSendSharp  className={ `fas fa-paper-plane ml-2 ${ pending && 'animate-spin'}`} /> 
        </button>
     );
}
 
export default FormSubmitButton;