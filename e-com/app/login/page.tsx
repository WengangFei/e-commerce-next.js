"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { FaRegEye } from "react-icons/fa";
import { useState } from "react"
import { FaBasketballBall } from "react-icons/fa";
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react';
 
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
 


const LoginPage = () => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: "",
    },
    })

    // 2. Define a submit handler.
    async function loginHandler (values: z.infer<typeof formSchema>) {
        setButtonLoading(true);
        const res = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        });
        if(res?.error){
            toast.error(res.error);
        }else{
            toast.success('Login successful');
            router.push('/');
            setButtonLoading(false);
        }
    }
    const[showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [buttonLoading, setButtonLoading] = useState(false);

    return ( 
        <div className='flex flex-col justify-center items-center '>
            <p className='text-2xl font-bold text-blue-400 mt-12 mb-6'>Login Page</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(loginHandler)} className="space-y-8 shadow-2xl p-10 rounded-lg min-w-sm">  
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className='flex items-center justify-center'>
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='w-full flex-grow'>
                                <FormControl>
                                    <Input placeholder="password" {...field} type={`${showPassword ? 'text' : 'password'}`}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className='ml-2 hover:cursor-pointer hover:scale-125 transition-transform transform duration-300 ease-in-out'>
                            <FaRegEye className='text-blue-500'/>
                        </button>
                    </div>
                    <Button type="submit" className='w-full bg-blue-500 hover:bg-blue-700 hover:cursor-pointer'>
                        { 
                            buttonLoading ? (
                                <div className='flex items-center justify-center'>
                                    Submitting......
                                    <FaBasketballBall className='animate-spin ml-2'/>
                                </div>
                            ) : (
                                <>Submit</>
                            )
                        }
                    </Button>
                    <p className='text-xs mt-[-15px] text-center text-blue-500'>
                        Don't have an account? <br />
                        Click 
                        <Link href='/signup'>
                            <span className='text-black font-bold ml-2 underline transition-transform transform duration-300 hover:scale-115 inline-block'>
                                Here
                            </span>
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
     );
}
 
export default LoginPage;