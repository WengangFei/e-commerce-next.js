import connectDB from "@/config/db";
import Property from "@/models/Property";



export const GET = async () => {
    console.log('pro page');
    try{
        await connectDB();
        const properties = await Property.find({});

        return new Response(JSON.stringify(properties),
         { status: 200 })
    }catch(error){
        return new Response(JSON.stringify(error),
         { status: 500 })
    }
    
}