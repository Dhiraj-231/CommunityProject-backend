import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
    community: {
        type: Schema.Types.ObjectId,
        ref: 'Community',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

export const Member = mongoose.model("Member", memberSchema);