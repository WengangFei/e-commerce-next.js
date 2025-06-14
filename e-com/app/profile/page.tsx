import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getUserSession } from "@/utiles/getUserSession";
import Image from "next/image";
import defaultImage from '@/assets/images/profile.png'

import { deleteProperty } from "../actions/deleteProperty";
import PropertyList from "@/components/profile/PropertyList";
import { iProperty } from "@/utiles/type";

const Profile = async () => {
    await connectDB();
    const userSession: any = await getUserSession();
    //serialize data
    const data = (await Property.find({id: userSession?.user?.id}).lean()).map(item =>({
        ...item,
        _id: item._id?.toString(),
        owner: item.owner?.toString(),
        createdAt: item.createdAt?.toISOString(),
        updatedAt: item.updatedAt?.toISOString(),
    }));


  
    return ( 
     
        <section className="bg-blue-50">
            <div className="container m-auto py-24">
                <div
                className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <h1 className="text-xl font-bold mb-4 md:text-2xl">
                        My Profile
                    </h1>
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/5 mx-10 mt-10">
                                <div className="mb-4">
                                    <Image
                                        className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                        src={userSession?.user?.image || defaultImage}
                                        alt="User"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                    />
                                </div>

                                <h2 className="text-xl mb-4">
                                    <span className="font-bold block">Name: </span> 
                                    { userSession?.user?.name }
                                </h2>
                                <h2 className="text-xl mb-4">
                                    <span className="font-bold block">Email: </span> 
                                    { userSession?.user?.email }
                                </h2>
                                <h2 className="text-xl">
                                    <span className="font-bold block">Member Since:</span>
                                         {userSession?.user?.createdAt}
                                </h2>
                            </div>

                            <div className="md:w-3/5 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">My Listings</h2>
                            {
                                data.length === 0 ? (
                                    <p className="text-gray-600 mb-4">
                                        No Properties Found
                                    </p>
                                    ) : (
                                    data.map( property => (
                                        <PropertyList key={property._id}  property={property as any}/>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
     );
}
 
export default Profile;