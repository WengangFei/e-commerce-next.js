'use server';

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";





const editProperty = async (_:any,formData: FormData ): Promise<{
    success: boolean;
    message: string;
}> => {

    await connectDB();
    const property = await Property.findById(formData.get('id'));
    let imagesURL = [];

    const imageFile = formData.get('images') as File;
    //check if image is empty
    if(imageFile?.size !== 0){
        //construct new images array
        //delete old images from cloudinary
      
        const oldImagesArray = property?.images;
        const oldImagesIds = oldImagesArray.map((image:string) => image.split('/').pop()?.split('.')[0]);
        for ( const imageId of oldImagesIds) {
            await cloudinary.uploader.destroy('e-comm/'+imageId);
        }
        //upload new images to cloudinary
        //upload images to cloudinary
        
        for (const image of formData.getAll('images')) {
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

    }
    //update property
    const updatedProperty = await Property.findByIdAndUpdate(formData.get('id'),{
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
        images: imageFile?.size !== 0 ? imagesURL : property?.images,
    });
   

    if(!updatedProperty){
        return {
            success: false,
            message: 'Property not found',
        }
    }
    //revalidate cache
    revalidatePath('/','layout');
    return {
        success: true,
        message: 'Property updated successfully',
    }

};

export default editProperty;
