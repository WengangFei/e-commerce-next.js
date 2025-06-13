import { Schema, model, models } from "mongoose";
import bcrypt from 'bcryptjs';


const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        // match: [
        //     /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        //     "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
        // ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    image: {
        type: String,
    },
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref:'Property',
        },
    ]
},
    {
        timestamps: true,
    });

    UserSchema.methods.comparePassword = async function (password: string) {
        return await bcrypt.compare(password, this.password);
    }
//if the model already exists (e.g., from a previous call), reuse it. || otherwise, create a new model with the name "User" and the UserSchema.
const User = models.User || model("User", UserSchema);
export default User;