import PropertyCard from "@/components/HomePage/PropertyCard";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import User from "@/models/User";
import { getUserSession } from "@/utiles/getUserSession";
import mongoose from "mongoose";

const SavedProperties = async () => {

    await connectDB();
    const session: any = await getUserSession();

    if (!session || !session.user) {
    throw new Error("User session not found");
    }

    const userId = session.user.id;
    const SavedPropertiesArray  = (await User.findById(userId).select('bookmarks')).bookmarks as mongoose.Types.ObjectId[];
    //retrieve saved properties
    const properties = await Property.find({
        _id: {
            $in: SavedPropertiesArray
        }
    })

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
                            <p>No Properties are Saved.</p>
                        )
                    }
                </div>
            </div>   
        </section>
     );
}
 
export default SavedProperties;