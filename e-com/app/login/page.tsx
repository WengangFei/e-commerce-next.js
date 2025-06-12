"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { FaRegEye } from "react-icons/fa";
import { useState } from "react"
 
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const[showPassword, setShowPassword] = useState(false);


    return ( 
        <div className='flex flex-col justify-center items-center '>
            <p className='text-2xl font-bold text-blue-400 mt-12 mb-6'>Login Page</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-2xl p-10 rounded-lg min-w-sm">  
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
                        Submit
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