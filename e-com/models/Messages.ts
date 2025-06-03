import { model, models, Schema } from "mongoose";

const MessagesSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
    property: {
        type: Schema.Types.ObjectId,
        ref:'Property',
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    is_read: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
})

const Messages = models.Messages || model("Messages", MessagesSchema);
export default Messages