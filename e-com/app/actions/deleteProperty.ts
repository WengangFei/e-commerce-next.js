'use server';

import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/db';
import Property from '@/models/Property';
import { getUserSession } from '@/utiles/getUserSession';
import { revalidatePath } from 'next/cache';


export const deleteProperty = async (id:string) => {
   
    //connect to DB
    await connectDB();
    //delete from mongoDB
    const userSession = await getUserSession();
    if(!userSession?.user?.id){
        throw new Error('The user not found!');
    }
    const property = await Property.findById(id);
    if(!property){
        throw new Error('The property not found!');
    }
    await property.deleteOne();
    //delete images from cloudinary
    const images = property.images as string[];
    const imagesIds = images.map((image) => image.split('/').pop()?.split('.')[0]);
    for ( const imageId of imagesIds) {
        await cloudinary.uploader.destroy('e-comm/'+imageId);
    }
    //revalidate cache
    revalidatePath('/','layout');
    
}   

