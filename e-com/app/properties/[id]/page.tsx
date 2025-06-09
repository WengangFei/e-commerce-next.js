import HeaderImage from "@/components/PropertyPage/HeaderImage";
import PropertyDetails from "@/components/PropertyPage/PropertyDetails";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { iProperty } from "@/utiles/type";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";


const PropertyPage = async ( 
    { params }: { params: Promise<{ id: string }> }
) => {
    await connectDB();
    const id = (await params).id; 
    const property = await Property.findById(id).lean<iProperty>();

    return ( 
        <div>
            <HeaderImage images={property!.images as string[]}/>
            <section className="container ml-10 py-6 gap-1 hover:text-blue-500">
                <Link href='/properties' className='flex items-center text-[10px] font-bold text-blue-500 hover:text-black md:text-sm'>
                    <IoMdArrowRoundBack />
                    <span className='ml-2'>Back To Property</span>
                </Link>
            </section>
            <h1 className='text-sm font-bold text-center text-blue-500 md:text-xl'>
                Property Details
            </h1>
            <PropertyDetails details={JSON.parse(JSON.stringify(property!))} propertyId={id}/>
      
        </div>
     );
}
 
export default PropertyPage;