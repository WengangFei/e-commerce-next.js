'use client';

import { AddProperty } from '@/app/actions/AddProperty';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';



const AddPropertiesForm = () => {

    const initialState = { success: false, property_id: '' };
    const [state, formAction] = useActionState(AddProperty, initialState);
    const [loader, setLoader] = useState(false);
    //redirect to property page
    const router = useRouter();

    useEffect(() => {
        if ('success' in state && state.success) {
            setLoader(false);
            const timeout = setTimeout(() => {
            router.push(`/properties/${state.property_id}`);
            }, 3000);

            return () => clearTimeout(timeout); // clean up on unmount
        }
    }, [state]);
   
  return (
    <div className="container mx-auto py-8 p-4 md:py-8">
    <form action={formAction}>
        <h2 className="text-3xl text-center font-semibold mb-6">
            Add Property
        </h2>
        <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
            >Property Type</label
>
            <select
            id="type"
            name="type"
            className="border rounded w-full py-2 px-3"
            required
            >
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="CabinOrCottage">Cabin or Cottage</option>
            <option value="Room">Room</option>
            <option value="Studio">Studio</option>
            <option value="Other">Other</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2"
            >Listing Name
            </label>
            <input
            type="text"
            id="name"
            name="name"
            className={`border rounded w-full py-2 px-3 mb-2 ${
            'fields' in state && state.fields && Object.keys(state.fields.fieldErrors || {}).includes('name')
                ? 'border-red-500'
                : ''
            }`}
            placeholder="eg. Beautiful Apartment In Miami"
            required
            defaultValue={(state as any)?.fields_values?.name || ''}
            />
        </div>
        <div className="mb-4">
            <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
            >Description</label
            >
            <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows={4}
            placeholder="Add an optional description of your property"
            defaultValue={(state as any) ?.fields_values?.description || ''}
            ></textarea>
        </div>

        <div className={`mb-4 bg-blue-50 p-4 ${Object?.keys((state as any)?.fields?.fieldErrors || {})?.includes('location') ? 'bg-red-200' : ''}`}>
            <label className="block text-gray-700 font-bold mb-2">Location</label>
            <input
            type="text"
            id="street"
            name="location.street"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Street"
            defaultValue={(state as any)?.fields_values?.location?.street || ''}
            />
            <input
            type="text"
            id="city"
            name="location.city"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="City"
            required
            defaultValue={(state as any)?.fields_values?.location?.city || ''}
            />
            <input
            type="text"
            id="state"
            name="location.state"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="State"
            required
            defaultValue={(state as any)?.fields_values?.location?.state || ''}
            />
            <input
            type="text"
            id="zipcode"
            name="location.zipcode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Zipcode"
            required
            defaultValue={(state as any)?.fields_values?.location?.zipcode || ''}
            />
        </div>

        <div className="mb-4 flex flex-wrap">
            <div className="w-full sm:w-1/3 pr-2">
            <label htmlFor="beds" className="block text-gray-700 font-bold mb-2"
                >Beds</label
            >
            <input
                type="number"
                id="beds"
                name="beds"
                className="border rounded w-full py-2 px-3"
                required
                defaultValue={(state as any)?.fields_values?.beds || ''}
            />
            </div>
            <div className="w-full sm:w-1/3 px-2">
            <label htmlFor="baths" className="block text-gray-700 font-bold mb-2"
                >Baths</label
            >
            <input
                type="number"
                id="baths"
                name="baths"
                className="border rounded w-full py-2 px-3"
                required
                defaultValue={(state as any)?.fields_values?.baths || ''}
            />
            </div>
            <div className="w-full sm:w-1/3 pl-2">
            <label
                htmlFor="square_feet"
                className="block text-gray-700 font-bold mb-2"
                >Square Feet</label
            >
            <input
                type="number"
                id="square_feet"
                name="square_feet"
                className="border rounded w-full py-2 px-3"
                required
                defaultValue={typeof (state as any)?.fields_values?.square_feet === 'string' ? (state as any).fields_values.square_feet : ''}
            />
            </div>
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2"
            >Amenities</label
            >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div>
                    <input
                    type="checkbox"
                    id="amenity_wifi"
                    name="amenities"
                    value="Wifi"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Wifi')}
                    />
                    <label htmlFor="amenity_wifi">Wifi</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_kitchen"
                    name="amenities"
                    value="Full kitchen"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Full kitchen')}
                    />
                    <label htmlFor="amenity_kitchen">Full kitchen</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_washer_dryer"
                    name="amenities"
                    value="Washer & Dryer"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Washer & Dryer')}
                    />
                    <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_free_parking"
                    name="amenities"
                    value="Free Parking"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Free Parking')}
                    />
                    <label htmlFor="amenity_free_parking">Free Parking</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_pool"
                    name="amenities"
                    value="Swimming Pool"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Swimming Pool')}
                    />
                    <label htmlFor="amenity_pool">Swimming Pool</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_hot_tub"
                    name="amenities"
                    value="Hot Tub"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Hot Tub')}
                    />
                    <label htmlFor="amenity_hot_tub">Hot Tub</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_24_7_security"
                    name="amenities"
                    value="24/7 Security"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('24/7 Security')}
                    />
                    <label htmlFor="amenity_24_7_security">24/7 Security</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_wheelchair_accessible"
                    name="amenities"
                    value="Wheelchair Accessible"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Wheelchair Accessible')}
                    />
                    <label htmlFor="amenity_wheelchair_accessible"
                    >Wheelchair Accessible</label
                    >
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_elevator_access"
                    name="amenities"
                    value="Elevator Access"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Elevator Access')}
                    />
                    <label htmlFor="amenity_elevator_access">Elevator Access</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_dishwasher"
                    name="amenities"
                    value="Dishwasher"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Dishwasher')}
                    />
                    <label htmlFor="amenity_dishwasher">Dishwasher</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_gym_fitness_center"
                    name="amenities"
                    value="Gym/Fitness Center"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Gym/Fitness Center')}
                    />
                    <label htmlFor="amenity_gym_fitness_center"
                    >Gym/Fitness Center</label
                    >
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_air_conditioning"
                    name="amenities"
                    value="Air Conditioning"
                    className="mr-2"    
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Air Conditioning')}
                    />
                    <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_balcony_patio"
                    name="amenities"
                    value="Balcony/Patio"
                    className="mr-2"    
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Balcony/Patio')}
                    />
                    <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_smart_tv"
                    name="amenities"
                    value="Smart TV"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Smart TV')}
                    />
                    <label htmlFor="amenity_smart_tv">Smart TV</label>
                </div>
                <div>
                    <input
                    type="checkbox"
                    id="amenity_coffee_maker"
                    name="amenities"
                    value="Coffee Maker"
                    className="mr-2"
                    defaultChecked={(state as any)?.fields_values?.amenities?.includes('Coffee Maker')}
                    />
                    <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
                </div>
            </div>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
            <label className="block text-gray-700 font-bold mb-2"
            >Rates (Leave blank if not applicable)</label
            >
            <div
            className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
            <div className="flex items-center">
                <label htmlFor="weekly_rate" className="mr-2">Weekly</label>
                <input
                type="number"
                id="weekly_rate"
                name="rates.weekly"
                className="border rounded w-full py-2 px-3"
                defaultValue={(state as any)?.fields_values?.rates?.weekly as string}
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="monthly_rate" className="mr-2">Monthly</label>
                <input
                type="number"
                id="monthly_rate"
                name="rates.monthly"
                className="border rounded w-full py-2 px-3"
                defaultValue={(state as any)?.fields_values?.rates?.monthly as string}
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="nightly_rate" className="mr-2">Nightly</label>
                <input
                type="number"
                id="nightly_rate"
                name="rates.nightly"
                className="border rounded w-full py-2 px-3"
                defaultValue={(state as any)?.fields_values?.rates?.nightly as string}
                />
            </div>
            </div>
        </div>

        <div className="mb-4">
            <label
            htmlFor="seller_name"
            className="block text-gray-700 font-bold mb-2"
            >Seller Name</label
            >
            <input
            type="text"
            id="seller_name"
            name="seller_info.name"
            className="border rounded w-full py-2 px-3"
            placeholder="Name"
            defaultValue={typeof (state as any)?.fields_values?.seller_info?.name === 'string' ? (state as any)?.fields_values?.seller_info?.name : ''}
            />
        </div>
        <div className="mb-4">
            <label
            htmlFor="seller_email"
            className="block text-gray-700 font-bold mb-2"
            >Seller Email</label
            >
            <input
            type="email"
            id="seller_email"
            name="seller_info.email"
            className="border rounded w-full py-2 px-3"
            placeholder="Email address"
            required
            defaultValue={(state as any)?.fields_values?.seller_info?.email as string}
            />
        </div>
        <div className="mb-4">
            <label
            htmlFor="seller_phone"
            className="block text-gray-700 font-bold mb-2"
            >Seller Phone</label
            >
            <input
            type="tel"
            id="seller_phone"
            name="seller_info.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="Phone"
            defaultValue={(state as any)?.fields_values?.seller_info?.phone as string}
            />
        </div>

        <div className="mb-4">
            <label htmlFor="images" className="block text-gray-700 font-bold mb-2"
            >Images (Select up to 4 images)</label
            >
            <input
            type="file"
            id="images"
            name="images"
            className="border rounded w-full py-2 px-3"
            accept="image/*"
            multiple
            required
            />
        </div>

        <div>
            <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => setLoader(true)}
            >
            { 
                loader ? (
                    <div className='flex items-center justify-center gap-6'>
                        <img src='/vercel.svg' alt='loader' className='w-6 h-6 animate-spin'/>
                        Adding Property...
                    </div>
                
                ) : 'Add Property'
            }
            </button>
        </div>
        </form>
        {
            (state as any)?.success ? (
                <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">Property added successfully!</span>
                </div>
            ):(
                <div className={`mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${(state as any)?.fields?.fieldErrors ? 'block' : 'hidden'}`}  role="alert">
                    { 
                        (state as any)?.fields?.fieldErrors &&
                        Object.values((state as any)?.fields?.fieldErrors).map( (error,index) => (
                            <div key={index}>
                                <span className="block sm:inline">{error as string}</span>
                            </div>
                        ))
                    }
                    
                </div>
            )
        }
    </div>
  );
}

export default AddPropertiesForm