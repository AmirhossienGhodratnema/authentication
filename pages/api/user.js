import User from "@/backend/model/user";
import { verifyToken } from "@/backend/utils/auth";
import ConnectionDB from "@/backend/utils/connectDb";
import { } from 'next'

export default async function handler(req, res) {
    if (req.method !== 'GET') return;
    try {
        await ConnectionDB();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: 500,
            message: 'Error: Connecting to the database'
        });
    };


    const { U } = req.cookies;
    const result = await verifyToken(U);
    if (result.success) {
        const user = await User.findOne({ email: result.email }).select({
            password: 0,
            createdAt: 0,
            updatedAt: 0
        });
        if (!user) return res.json({ success: false, status: 404, message: 'User not defined' });
        return res.status(200).json({ success: true, status: 200, user });
    } else {
        return res.status(400).json({
            success: false,
            status: 400,
            message: 'The token is not valid'
        });
    };
    return res.json({
        message: 'ok',
    });
}