import connectDB from "@/config/db";
import Property from "@/models/Property";


export const GET = async (request:Request,{params}:any) => {
    // console.log('id page =>',params);
    try{
        await connectDB();
        const property = await Property.findById((await params).id).lean();
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