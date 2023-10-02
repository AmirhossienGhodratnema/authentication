import User from "@/backend/model/user";
import ConnectionDB from "@/backend/utils/connectDb";
import { hashPassword } from "@/backend/utils/auth";


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return req.status(400).json({
            success: false,
            status: 400,
            message: 'It is not a post method'
        });
    };
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
    const { email, password } = req.body;
    if (!email || !password) return res.status(422).json({ success: false, status: 422, message: 'Check your email or password' });
    const user = await User.findOne({ email });
    if (user) return res.status(422).json({ success: false, status: 422, message: 'The user exists' });
    const resutlPassword = await hashPassword(password);
    const newUser = await User.create({ email, password: resutlPassword });
    return res.status(201).json({
        success: true,
        status: 201,
        message: 'User was created'
    });
};