'use server';

import connectDB from "@/config/db";
import User from "@/models/User";



const loginFormAction = async (prevState: any, data:{ email: string; password: string;}) => {

    const { email, password } = data;
    try {
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
            return JSON.parse(JSON.stringify({ success: 'failed', message: 'User not exist!' }));
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return JSON.parse(JSON.stringify({ success: 'failed', message: 'Password is incorrect!' }));
        }
        return JSON.parse(JSON.stringify({ success: 'success', message: 'Login successful', user }));
    } catch (err) {
        console.log('Login Error =>', err);
        return JSON.parse(JSON.stringify({success: 'failed', message: 'Something went wrong'}));
    }
}

export default loginFormAction