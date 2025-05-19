import { Types } from "mongoose";

export interface iProperty {
    _id: Types.ObjectId | string;
    name: string;
    type: string;
    address: string;
    images: string[];
    description: string;
    rates: {
        monthly: number;
        weekly: number;
        nightly: number;
    };
    location: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
    };
    beds: number;
    baths: number;
    square_feet: number;
    amenities: string[];
    is_featured: boolean;
    owner: string;
    seller_info: {
        name: string;
        email: string;
        phone: string;
    };
}

export interface AuthOption {
    providers: any;
    callbacks: any;
}
