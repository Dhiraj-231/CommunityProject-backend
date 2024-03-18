import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
    name: {
        type: String,
        minLength: [3, "Please provide Role"],
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

export const Role = mongoose.model("Role", roleSchema);