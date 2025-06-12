'use server';

import connectDB from "@/config/db";
import User from "@/models/User";
import bcrypt from "bcrypt";


const signupFormAction = async (prevState: any, formData:{
    username: string;
    email: string;
    password: string;}) => {
    const hashedPassword = await bcrypt.hash(formData.password, 10);
    const data = {
        username: formData.username,
        email: formData.email,
        password: hashedPassword,
    }
    
    try{
        await connectDB();
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return {success: 'failed', message: 'Email already exists'}
        }
        const user = await User.create({
            username: data.username,
            email: data.email,
            password: data.password,
        });
        return JSON.parse(JSON.stringify({ success: 'success', message: 'User created successfully', user }));
    }catch(err){
        console.log('Signup Error =>',err);
        return JSON.parse(JSON.stringify({success: 'failed', message: 'Something went wrong'}));
    }
}

export default signupFormAction;