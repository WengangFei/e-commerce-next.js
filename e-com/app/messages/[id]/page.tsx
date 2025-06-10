import { MarkMessageAsReadWrapper } from "@/components/Messages/MarkMessageAsRead";
import connectDB from "@/config/db";
import Messages from "@/models/Messages";
import User from "@/models/User";


const MessageContent = async (
    { params }: { params: Promise<{ id: string }> }
) => {

    const id = (await params).id; 
    await connectDB();
    const data = (await Messages.find({_id: id}).populate('sender','username').lean())[0];
    
    return ( 
        <div>
            {/* update unread message number immediately */}
            <MarkMessageAsReadWrapper id={id} />{/* client component within a sever action */}
            <div className='md:text-sm text-8px mt-8 px-48'>
                <h1 className='text-sm mb-4 font-bold text-center text-blue-500 md:text-xl'>Message</h1>
                <form>
                    <div className="mb-4">
                        
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                        defaultValue={data?.sender?.username ?? ''}
                    />
                    </div>
                    <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        defaultValue={data?.email ?? ''}
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="phone"
                    >
                        Phone:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder={data?.phone}
                    />
                    </div>
                    <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="message"
                    >
                        Message:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                        id="message"
                        name="message"
                        placeholder={data?.message}
                    ></textarea>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default MessageContent;