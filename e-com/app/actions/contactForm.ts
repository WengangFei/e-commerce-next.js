'use server';

import connectDB from "@/config/db";
import Messages from "@/models/Messages";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";

const contactForm = async (prevState : any, formData: FormData) => {
    if(!formData.get('phone') || !formData.get('message')) return {success: 'failed', message:'Please fill all the fields'};

    const propertyId = formData.get('property_id');
    await connectDB();
    const property = await Property.findById(propertyId);
    const receiver = property.owner.toString();
    const data = {
        sender: formData.get('sender_id'),
        receiver: receiver,
        message: formData.get('message'),
        property: propertyId,
        email: formData.get('email'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        is_read: false,
    }
    try {
        const sendMessage = await Messages.create(data);
        revalidatePath('/messages','page');
        return {success: 'success',message: 'Message sent successfully'}
    } catch (error) {
        console.log(error);
        return {success: 'failed',message: error}
    }
}

export default contactForm