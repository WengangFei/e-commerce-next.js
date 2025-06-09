'use client';

import { iProperty } from "@/utiles/type";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaRulerCombined } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import MapWrapper from "./MapWrapper";
import ShareButton from "./ShareButton";
import BookmarkPage from "./BookmarkPage";
import ContactForm from "./ContactForm";
import { Gallery, Item } from 'react-photoswipe-gallery';





const PropertyDetails = ({ details, propertyId }: { details: iProperty, propertyId: string }) => {
// console.log('details =>',details);

    
    return ( 

        <div className='bg-blue-50 p-8 gap-4 flex flex-col md:flex-row'>
            <div className='text-sm font-bold p-4 rounded-lg md:w-2/3 gap-4 flex flex-col'>
                {/* property details */}
                <div className='p-4 rounded-lg bg-white'>
                    <p className='text-[12px]'>Apartment</p>
                    <p className='text-xl my-2'>{details.name}</p>
                    <div className='flex gap-2 items-center'>
                        <FaLocationDot color='#facc15'/>
                        <span className='text-[10px] text-yellow-600 md:text-sm'>{details.location.street + ' ' + details.location.city + ', ' + details.location.state + ' ' + details.location.zipcode}</span> 
                    </div>
                    <p className='my-4 py-1 text-[8px] bg-blue-500 text-white w-fit px-1 rounded-md md:text-[10px]'>
                        Rates & Options
                    </p>
                    <div className='flex justify-center gap-12 md:gap-24'>
                        <p className='my-2 py-1 text-[8px] text-black w-fit px-1 rounded-lg md:text-[10px]'>
                            <span className='text-gray-500 mr-1'>Monthly:</span> 
                            <span className="text-sm text-blue-400">
                                ${details.rates.monthly}
                            </span>
                        </p>
                        <p className='my-2 py-1 text-[8px] text-black w-fit px-1 rounded-lg md:text-[10px]'>
                        <span className='text-gray-500 mr-1'>Weekly:</span> 
                        <span className="text-sm text-blue-400">
                            ${details.rates.weekly}
                        </span>
                        </p>
                        <p className='my-2 py-1 text-[8px] text-black w-fit px-1 rounded-lg md:text-[10px]'>
                        <span className='text-gray-500 mr-1'>Nightly:</span> 
                        <span className="text-sm text-blue-400">${details.rates.nightly}</span>
                        </p>
                    </div>
                </div>
                {/* description */}
                <div className='p-4 rounded-lg bg-white'>
                    <p className='my-2 py-1 text-[8px] bg-blue-500 text-white w-fit px-1 rounded-md md:text-[10px]'>
                        Description
                    </p>
                    <p className='my-2 py-1 text-[8px] text-black w-fit px-1 rounded-lg md:text-[10px]'>
                        {details.description}
                    </p>
                    <div className='flex justify-center gap-12 md:gap-24'>
                        <div className='flex items-center gap-2 my-2 py-1 text-[8px] text-blue-400 w-fit px-1 rounded-lg md:text-[10px]'>
                            <FaBed  size={25} color='#60a5fa'/> 
                            <span className='text-[10px] md:text-sm'>{details.beds} Beds</span>
                        </div>
                        <div className='flex items-center gap-2 my-2 py-1 text-[8px] text-blue-400 w-fit px-1 rounded-lg md:text-[10px]'>
                            <FaBath size={25} color='#60a5fa'/>
                            <span className='text-[10px] md:text-sm'>{details.baths} Baths</span>
                        </div>
                        <div className='flex items-center gap-2 my-2 py-1 text-[8px] text-blue-400 not-only:w-fit px-1 rounded-lg md:text-[10px]'>
                            <FaRulerCombined size={25} color='#60a5fa'/>
                            <span className='text-[10px] md:text-sm'>{details.square_feet} sqft</span>
                        </div>
                    </div>
                </div>
                {/* Amenities */}
                <div className='p-4 rounded-lg bg-white'>
                    <p className='my-4 py-1 text-[8px] bg-blue-500 text-white w-fit px-1 rounded-md md:text-[10px]'>Amenities</p>
                    <div className='grid grid-cols-4'>
                        { 
                            details.amenities.map((amenity: string, index: number) => (
                                <div key={index} className='flex items-center gap-2 my-2 py-1 text-[8px] text-blue-400 w-fit px-1 rounded-lg md:text-[10px]'>
                                    <FaCheck color='green'/> 
                                    <span className='text-[10px] md:text-sm'>{amenity}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* images */}
                <Gallery>
                    <div className='p-4 rounded-lg bg-white'>
                        <p className='my-4 py-1 text-[8px] bg-blue-500 text-white w-fit px-1 rounded-md md:text-[10px]'>Images</p>
                        <div className='grid grid-cols-2 gap-2'>
                            { 
                                details.images.map((image: string) => (
                                    <div key={image}>
                                        <Item
                                            original={image}
                                            thumbnail={image}
                                            width="1024"
                                            height="768"
                                            >
                                            {({ ref, open }) => (   
                                                <Image
                                                    src={image}
                                                    alt='property'
                                                    width={550}
                                                    height={450}
                                                    ref={ref}
                                                    onClick={open}
                                                    className='object-cover w-full rounded-xl cursor-pointer'
                                                />
                                            )}
                                        </Item>
                                    </div>
                                    
                                ))
                            }
                        </div>
                    </div>
                </Gallery>
                {/* owner info */}
                <div className='p-4 rounded-lg bg-white'>
                    <p className='my-4 py-1 text-[8px] bg-blue-500 text-white w-fit px-1 rounded-md md:text-[10px]'>Property Owner Info:</p>
                    <div className='grid grid-cols-2 gap-2 lg:grid-cols-3'>
                        <div className='flex items-center gap-2 my-2 py-1 text-[8px] text-blue-400 w-fit px-1 rounded-lg md:text-[10px]'>
                            <FaUser size={10} color='#60a5fa'/> 
                            <span className='text-[8px] md:text-sm'>{details.seller_info.name}</span>
                        </div>
                        <div className='flex items-center gap-2 my-2 py-1 text-[8px] text-blue-400 w-fit px-1 rounded-lg md:text-[10px]'>
                            <FaPhone size={10} color='#60a5fa'/> 
                            <span className='text-[8px] md:text-sm'>{details.seller_info.phone}</span>
                        </div>
                        <div className='flex items-center gap-2 my-2 py-1 text-[8px] text-blue-400 w-fit px-1 rounded-lg md:text-[10px]'>
                            <FaEnvelope size={10} color='#60a5fa'/> 
                            <span className='text-[8px] md:text-sm'>{details.seller_info.email}</span>
                        </div>
                    </div>
                </div>
                {/* map */}
                <div className='p-4 rounded-lg bg-white'>
                    <p className='my-4 py-1 text-[8px] bg-blue-500 text-white w-fit px-1 rounded-md md:text-[10px]'>Map:</p>
                    <div className='w-full'>
                      <MapWrapper location={details.location}/>
                    </div>
                </div>

            </div>


            <div className=" p-2 mt-4 md:w-1/3">
                <div className='grid grid-cols-1 gap-2 md:maw-w-2xl'>
                    <BookmarkPage details={JSON.parse(JSON.stringify(details))}/>
                    <ShareButton details={JSON.parse(JSON.stringify(details))}/>
                    <ContactForm property_id={propertyId}/>
                </div>
            </div>


        </div>
    );
}
 
export default PropertyDetails;