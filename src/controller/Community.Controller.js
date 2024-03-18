import { Community } from "../models/Community.model.js";
import { Member } from "../models/Member.Model.js";
import { ApiError } from "../utils/ApiError.js";

export const communityCreate = async (req, res) => {
    try {
        const { name } = req.body;
        const community = await Community.create({
            name,
            slug: name,
            owner: req.user._id,
        });
        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: community.id,
                    name: community.name,
                    slug: community.slug,
                    owner: community.owner,
                    created_at: community.created_at.toISOString(),
                    updated_at: community.updated_at.toISOString(),
                },
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const getAllCommunityDetail = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalCount = await Community.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const data = await Community.find()
        .populate({ path: "owner", select: "id name" })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    res.status(200).json({
        success: true,
        content: {
            meta: {
                total: totalCount,
                pages: totalPages,
                page: page,
            },
            data: data.map((data) => ({
                id: data.id,
                name: data.name,
                owner: data.owner,
                created_at: data.created_at.toISOString(),
                updated_at: data.updated_at.toISOString(),
            })),
        },
    });
};

export const getAllMember = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const totalCount = await Member.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
        const { id } = req.params;
        const allMember = await Member.find({ community: id })
            .populate([
                { path: "user", select: "id name" },
                { path: "role", select: "id name" },
            ])
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        res.status(200).json({
            success: true,
            content: {
                meta: {
                    total: totalCount,
                    pages: totalPages,
                    page: page,
                },
                data: allMember.map((data) => ({
                    id: data.id,
                    community: data.community,
                    user: data.user,
                    role: data.role,
                    created_at: data.created_at.toISOString(),
                })),
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyOwnedCommunity = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const totalCount = await Community.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
        const id = req.user.id;
        const communityDetail = await Community.find({ owner: id })
            .populate({
                path: "owner",
                select: "id name",
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        if (communityDetail.length == 0)
            throw new ApiError(400, "You not owned any community");

        res.status(200).json({
            success: true,
            content: {
                meta: {
                    total: totalCount,
                    pages: totalPages,
                    page: page,
                },
                data: communityDetail.map((data) => ({
                    id: data.id,
                    name: data.name,
                    slug: data.slug,
                    owner: data.owner,
                    created_at: data.created_at.toISOString(),
                    updated_at: data.created_at.toISOString(),
                })),
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyJoinedCommunity = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const totalCount = await Community.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
        const id = req.user._id.toString();
        // here finding the community id where user id matched
        const members = await Member.find({ user: id }, "-_id community");
        //Here just createing array of the id
        const memberIdValue = members.map((obj) => obj.community);
        // here populate that so i get the all details
        const communityDetail = await Community.find({
            _id: { $in: memberIdValue },
        })
            .populate({
                path: "owner",
                select: "id name",
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        res.status(200).json({
            success: true,
            content: {
                meta: {
                    total: totalCount,
                    pages: totalPages,
                    page: page,
                },
                data: communityDetail.map((data) => ({
                    id: data.id,
                    name: data.name,
                    slug: data.slug,
                    owner: data.owner,
                    created_at: data.created_at.toISOString(),
                    updated_at: data.created_at.toISOString(),
                })),
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
