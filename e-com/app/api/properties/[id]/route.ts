import connectDB from "@/db_config/db";
import Property from "@/models/Property";


export const GET = async (request,{params}:any) => {
    try{
        await connectDB();
        const property = await Property.findById(params.id);
        if(!property){
            return new Response(JSON.stringify({message:"Property not found"}),
             { status: 404 })
        }
        return new Response(JSON.stringify(property),
         { status: 200 })
    }catch(error){
        return new Response(JSON.stringify(error),
         { status: 500 })
    }
    
}