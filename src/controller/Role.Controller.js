import { Role } from "../models/Role.model.js";

export const roleCreation = async (req, res) => {
    try {
        const { name } = req.body;
        const roleCreated = await Role.create({
            name
        })
        res.status(200).json({
            success: true,
            "content": {
                "data": roleCreated
            },
            message: "Role created",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
};

export const getAllDetail = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalCount = await Role.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const data = await Role.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    res.status(200).json({
        success: true,
        content: {
            "meta": {
                total: totalCount,
                pages: totalPages,
                page: page
            },
            data: data.map((data) => ({
                id: data.id,
                name: data.name,
                created_at: data.created_at.toISOString(),
                updated_at: data.updated_at.toISOString(),
            })),
        },
    })
}