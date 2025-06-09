import PropertyCard from '@/components/HomePage/PropertyCard';
import PaginationCompo from '@/components/PropertyPage/PaginationCompo';
import connectDB from '@/config/db';
import Property from '@/models/Property';
import { iProperty } from '@/utiles/type';
import Link from 'next/link';
import { FaBackwardStep } from "react-icons/fa6";




const PropertiesPage = async (
    { searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) => {
    
    const page = (await searchParams).page ? Number((await searchParams).page) : 1;
    const pageSize = 3;
    await connectDB();
    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments();

    const properties = await Property.find({}).sort({ createdAt: -1 }).skip(skip).limit(pageSize).lean();


    return ( 
        <section className="md:container m-auto py-6 px-6 ">
            <div className='mb-4'>
                <h1 className="text-2xl text-center font-bold mb-6 text-blue-500">
                    Recent Properties
                </h1>
                {
                    page > 1 &&
                    <Link href={`/properties`} className="flex w-fit items-center  text-[10px] border border-gray-300 rounded-md font-bold p-1 gap-1 mb-2 text-blue-400 hover:text-blue-500">
                        <FaBackwardStep /> 
                        Back To First Page
                    </Link> 
                }
                <div className='grid grid-cols-1 md:grid-cols-3  gap-6'>
                    {
                        properties.length > 0 && (
                            <>
                                {
                                    properties.map( property => (
                                        <PropertyCard key={property._id as string} property={property as unknown as iProperty} /> 
                                    ))
                                }
                            </>
                    ) 
                    }
                </div>
            </div>  
            <PaginationCompo page={page} total={total} pageSize={pageSize}/>
        </section>
     );
}
 
export default PropertiesPage;