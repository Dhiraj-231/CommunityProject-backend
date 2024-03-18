import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({
            $or: [{ email }]
        });
        if (existUser) throw new ApiError(409, "User already exist");
        const user = await User.create({
            name,
            email,
            password,
        })
        user.access_token = user.generateAccessToken();;
        await user.save();
        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    created_at: user.created_at.toISOString(),
                },
                "meta": {
                    "access_token": user.access_token
                }
            },
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

export const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new ApiError(400, "User not exist");
        const matchPassword = await user.isPasswordCorrect(password, user.password);
        if (!matchPassword) throw new ApiError(401, 'Email or password wrong..');
        user.access_token = user.generateAccessToken();
        await user.save();
        res.status(200).cookie("token", user.access_token,
            {
                httpOnly: true,
                secure: true,
            }).json({
                status: true,
                content: {
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        created_at: user.created_at.toISOString(),
                    },
                    meta: {
                        access_token: user.access_token,
                    },
                },
                message: "Login successfully..."
            });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getMyDetail = async (req, res) => {
    try {

        const { _id } = req.user;
        const user = await User.findById({ _id }).select('-password');
        res.status(200).json({
            success: true,
            user,
            message: "Done"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const logOutUser = async (req, res) => {
    const user = await User.findById(req.user._id);
    user.access_token = undefined;
    await user.save({ validateBeforeSave: false })

    res
        .status(200)
        .clearCookie("token", { httpOnly: true })
        .json({
            success: true,
            message: "Logout successfully",
        });
}