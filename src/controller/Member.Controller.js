import { Community } from "../models/Community.model.js";
import { Member } from "../models/Member.Model.js";
import { ApiError } from "../utils/ApiError.js";

export const AddMember = async (req, res) => {
    try {
        const { community, role, user } = req.body;
        const communityDetail = await Community.findOne({ _id: community });
        if (!(communityDetail.owner == req.user._id.toString())) throw new ApiError(401, "NOT_ALLOWED_ACCESS");

        const member = await Member.create({
            community,
            role,
            user
        });
        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: member.id,
                    community: member.community,
                    user: member.user,
                    role: member.role,
                    created_at: member.created_at.toISOString(),
                }
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const removeMember = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString();
        const adminRole = await Community.findOne({ owner: userId });
        if (!adminRole) throw new ApiError(401, "NOT_ALLOWED_ACCESS");
        const memeberdetail = await Member.findOneAndDelete({ user: id });
        if (!memeberdetail) throw new ApiError(401, "You are not member of this community");
        res.status(200).json({
            success: true,
            message: "Member removed.."
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}