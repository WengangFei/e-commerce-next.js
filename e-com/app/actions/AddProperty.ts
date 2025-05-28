'use server';

import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/db';
import Property from '@/models/Property';
import { getUserSession } from '@/utiles/getUserSession';
import { addPropertyFormSchema } from '@/utiles/schema';
import { revalidatePath } from 'next/cache';




export const AddProperty = async (prevState: any,formData: FormData) => {

    const images = formData.getAll('images').filter((image) => image !== '')
   
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
    };

    const checkResults = addPropertyFormSchema.safeParse(data);
    
    if (!checkResults.success) {
        return {
            success: false,
            fields: checkResults.error.flatten(),
            fields_values: data,
        };
    }
    //upload images to cloudinary
    const imagesURL = [];
    for (const image of images) {
        if (!(image instanceof File)) {
            return Response.json({ error: 'Expected a file upload' }, 
                { status: 400 });
        }
        //convert image to buffer
        const imageBuffer = await image.arrayBuffer() ;
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
        //encode to base64 string
        const imageBase64 = imageData.toString('base64');
        //upload to cloudinary
        const upload = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`,
            {
                folder: 'e-comm',
            }
        );
        imagesURL.push(upload.secure_url);
       
    }
    // console.log('imagesURL =>', imagesURL);
    // //all data good, save data in DB
    await connectDB();
    const sessionUser = await getUserSession();
    if(!sessionUser || !sessionUser.user.id){
        throw new Error('User id not found');
    }

    const newProperty = await Property.create({
        ...data,
        owner: sessionUser.user.id,
        images: imagesURL,
    });

    if(!newProperty){
        throw new Error('Error creating property');
    }
    //update cache
    revalidatePath('/','layout');
    // redirect(`/properties/${newProperty?._id}`);
    return {
        success: true,
        property_id: newProperty?._id.toString(),
     
    };
};

