import mongoose, { Mongoose, Schema } from "mongoose";

const communitySchema = new Schema({
    name: {
        type: String,
        required: [true, " Please provide valid name of community"],
        min: [3, 'Name should greater than or equal to 3'],
        max: [30, 'Name must not exceed the value of 30'],
    },
    slug: {
        type: String,
        required: [true, 'please provide slug'],
        unique: [true, "Slug must be unique"],
        maxlength: 255
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    }
});

export const Community = mongoose.model("Community", communitySchema);