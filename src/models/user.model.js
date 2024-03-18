import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        lowercase: true,
        minlength: [3, "Name should greater than 3"],
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        Select: false,
        minlength: [6, "Password should greater or equal to 6"],
    },
    access_token: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    }
},
);
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 8);
    next();
});
userSchema.methods.isPasswordCorrect = async function (password, Hashpassword) {
    return await bcrypt.compare(password, Hashpassword);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
export const User = mongoose.model("User", userSchema);