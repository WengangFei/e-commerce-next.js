import PropertyCard from './PropertyCard';
import Link from 'next/link';
import connectDB from '@/config/db';
import Property from '@/models/Property';
import { iProperty } from '@/utiles/type';





const HomeProperties = async () => {

    //connect to MongoDB
    await connectDB();
    //fetch all properties
    const properties = await Property.find({}).sort({ createdAt: -1 }).limit(3).lean<iProperty[]>();


    return ( 
        <section className='mt-12'>
            <div className="md:container m-auto py-6 px-6 ">
                <h1 className="text-2xl text-center font-bold mb-6 text-blue-500">
                    Recent Properties
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-3  gap-6'>
                    {
                        properties.length > 0 ? (
                            properties.map( property => (
                                <PropertyCard key={property._id as string} property={property} /> 
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
 
export default HomeProperties;