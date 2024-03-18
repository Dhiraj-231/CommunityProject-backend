import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });
export const isAuth = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token || req.header("Authorization")?.replace("Bearer", "");
        if (!token) {
            throw new ApiError(404, "Login first");
        }
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decode?._id);
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
