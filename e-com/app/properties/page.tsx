import PropertyCard from '@/components/HomePage/PropertyCard';
import connectDB from '@/db_config/db';
import Property from '@/models/Property';
import { iProperty } from '@/type';



const PropertiesPage = async () => {
    await connectDB();
    const properties = await Property.find({}).lean<iProperty[]>();
 
    return ( 
        <section className=''>
            <div className="md:container m-auto py-6 px-6 ">
                <h1 className="text-2xl text-center font-bold mb-6 text-blue-500">Recent Properties</h1>
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
            </div>   
        </section>
     );
}
 
export default PropertiesPage;