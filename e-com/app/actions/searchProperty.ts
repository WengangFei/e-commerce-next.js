'use server';

import { redirect } from "next/navigation";

export const searchProperty = async (formData: FormData) => {
    const locationQuery = formData.get('location')?.toString().trim();
    const typeQuery = formData.get('type')?.toString().trim();

    if (!locationQuery) {
        throw new Error("Location is required");
    }
//pass params to searchedProperties page and retrieve params to get the location and type from DB
    redirect(`/searchedProperties?location=${encodeURIComponent(locationQuery)}&type=${typeQuery}`);
}