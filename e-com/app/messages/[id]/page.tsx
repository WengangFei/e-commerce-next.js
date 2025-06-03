import connectDB from "@/config/db";
import Messages from "@/models/Messages";




const MessageContent = async ({ params }: {params: {id: string}}) => {

    const {id} = await params;
    await connectDB();
    try{
        await Messages.findByIdAndUpdate(id, {is_read: true});
        console.log('message is read!');

    }catch(error){
        console.log(error);
    }

    
    return ( 
        <div>MessageContent</div>
     );
}
 
export default MessageContent;