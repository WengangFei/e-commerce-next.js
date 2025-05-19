import connectDB from "@/db_config/db";
import Property from "@/models/Property";



export const GET = async () => {
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