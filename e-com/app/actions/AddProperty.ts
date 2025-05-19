'use server';

import { addPropertyFormSchema } from '@/utiles/schema';

export const AddProperty = async (prevState: any,formData: FormData) => {

    const images = formData.getAll('images').filter((image) => image !== '').map((image: any) => image.name);

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
        console.log('checkResults==>', checkResults.error.flatten());
        return {
            success: false,
            fields: checkResults.error.flatten(),
            fields_values: data
        };
    }
    return { success: true };
};

