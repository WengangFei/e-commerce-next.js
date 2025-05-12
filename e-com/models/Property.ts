import { Schema, model, models } from "mongoose";

//define a schema
const PropertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'Owner is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    location: {
        street: {
            type: String,
            required: [true, 'Street is required'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
        },
        state: {
            type: String,
            required: [true, 'State is required'],
        },
        zipcode: {
            type: String,
            required: [true, 'Zipcode is required'],
        }
    },
    beds: {
        type: Number,
        required: [true, 'Beds is required'],
    },
    baths: {
        type: Number,
        required: [true, 'Baths is required'],
    },
    square_feet: {
        type: Number,
        required: [true, 'Square Feet is required'],
    },
    amenities: [
        {
            type: String,
        }
    ],
    rates: {
        nightly: {
            type: Number,
        },
        weekly: {
            type: Number,
        },
        monthly: {
            type: Number,
        }
    },
    seller_info: {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
        }
    },
    image: [
        {
            type: String,
        }
    ],
    //default set to true will show on home page
    is_featured: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
});

const Property = models.Property || model("Property", PropertySchema);
//any time use the model called Property, apply this schema and all its validation rules, But this doesn’t move, convert, or rewrite any existing data in MongoDB collection.

export default Property;