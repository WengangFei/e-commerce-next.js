import PropertyCard from "@/components/HomePage/PropertyCard";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { iProperty } from "@/utiles/type";
import Link from "next/link";

const SearchedProperties = async (
    { searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined  }>}
) => {


    const locationQuery = (await searchParams).location?.toString().trim();
    const typeQuery = (await searchParams).type?.toString().trim();
     await connectDB();

    // Base search condition with required location
    const searchConditions: any = [
        {
            $or: [
                { 'location.street': { $regex: locationQuery, $options: 'i' } },
                { 'location.city': { $regex: locationQuery, $options: 'i' } },
                { 'location.state': { $regex: locationQuery, $options: 'i' } },
                { 'location.zipcode': { $regex: locationQuery, $options: 'i' } }
            ]
        }
    ];

    // If type is not "All" and is provided, add it to the query
    if (typeQuery && typeQuery !== 'All') {
        searchConditions.push({ type: typeQuery });
    }

    const properties = await Property.find({
        $and: searchConditions
    }).lean() as unknown as iProperty[];



    return ( 
         <section className='mt-12'>
            <div className="md:container m-auto py-6 px-6 ">
                <h1 className="text-2xl text-center font-bold mb-6 text-blue-500">
                    Searched Properties
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-3  gap-6'>
                    {
                        properties.length > 0 ? (
                            properties.map( property => (
                                <PropertyCard key={property._id as string} property={property as iProperty} /> 
                            ))
                            
                    ) : 
                        (
                            <p>No Properties</p>
                        )
                    }
                </div>
                {
                    properties.length > 2 && (
                        <div className='text-center mt-6'>
                            <Link href="/properties" className='text-blue-700 font-bold hover:text-gray-500'>
                                View More......
                            </Link>
                        </div>
                    )
                }
            </div>   
        </section>
     );
}
 
export default SearchedProperties;