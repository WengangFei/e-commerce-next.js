import mongoose from "mongoose";
// mongoose provides a schema-based solution to model application data and simplifies operations like querying, validation, and business logic.


let connected = false;

const connectDB = async () => {
    mongoose.set("strictQuery", true);//only fields in the schema will be saved in DB
    //if DB is already connected, do not connect again
    if (connected){
        console.log('DB already connected.');
        return;
    }
    //connect to DB
    try{
        await mongoose.connect(process.env.MONGODB_URI!);
        connected = true;
        console.log('DB is connected.');
    }catch(err){
        console.log(err);
    }
};

export default connectDB;