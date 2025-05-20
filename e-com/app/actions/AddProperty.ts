'use server';

import connectDB from '@/db_config/db';
import Property from '@/models/Property';
import { getUserSession } from '@/utiles/getUserSession';
import { addPropertyFormSchema } from '@/utiles/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';



export const AddProperty = async (prevState: any,formData: FormData) => {

    const images = formData.getAll('images').filter((image) => image !== '').map((image: any) => image.name);
    console.log('images =>', images);
    const data = {
        type: formData.get('type'),
        name: formData.get('name'),
        location:{
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode'),
        },

        square_feet: formData.get('square_feet'),
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        description: formData.get('description'),
        amenities: formData.getAll('amenities'),
        rates: {
            nightly: formData.get('rates.nightly'),
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly'),
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
        images,
    };

    const checkResults = addPropertyFormSchema.safeParse(data);
    console.log('data =>', data);
    if (!checkResults.success) {
        return {
            success: false,
            fields: checkResults.error.flatten(),
            fields_values: data,
        };
    }
    //all data good, save data in DB
    await connectDB();
    const sessionUser = await getUserSession();
    if(!sessionUser || !sessionUser.user.id){
        throw new Error('User id not found');
    }

    const newProperty = await Property.create({
        ...data,
        owner: sessionUser.user.id,
    });
    console.log('newProperty =>', newProperty);
    if(!newProperty){
        throw new Error('Error creating property');
    }
    //update cache
    revalidatePath('/','layout');
    redirect(`/properties/${newProperty?._id}`);
};

