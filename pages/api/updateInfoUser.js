import User from "@/backend/model/user";
import { verifyPassword, verifyToken } from "@/backend/utils/auth";
import ConnectionDB from "@/backend/utils/connectDb";


export default async function handler(req, res) {
    if (req.method !== 'POST') return;
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

    const { name, lastName, password } = req.body;
    console.log(name, lastName, password)
    const { U } = req.cookies;
    if (!U) return res.status(401).json({ success: false, status: 401, message: 'Token is not defined' });
    const result = await verifyToken(U);
    if (!result) return res.status(401).json({ success: false, status: 401, message: 'Unauthorized' });
    const user = await User.findOne({ email: result.email });
    if (!user) return res.status(401).json({ success: false, status: 401, message: 'User not defined' });
    const checkPass = await verifyPassword(password, user.password);
    if (!checkPass) return res.status(401).json({ success: false, status: 401, message: 'Password is incorrect' });
    const updateUser = await User.updateOne({ email: user.email }, { $set: { name, lastName } })
    if (updateUser.modifiedCount == 0) return res.status(401).json({ success: false, status: 401, message: 'Not updated' })
    return res.status(200).json({ success: true, status: 200, message: 'User updated' });
};