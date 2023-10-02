import User from "@/backend/model/user";
import ConnectionDB from "@/backend/utils/connectDb";
import { verifyPassword } from "@/backend/utils/auth";
import { serialize } from "cookie";
import { sign } from 'jsonwebtoken'


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

    const { email, password } = req.body;

    const secretKeyssss = process.env.SECRETE_KEY;
    const expiresIn = (60 * 60) * 24;


    if (!email || !password) return res.status(422).json({ success: false, status: 422, message: 'Check your email or password' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, status: 404, message: 'There is no user' });

    const resutlPassword = await verifyPassword(password, user.password);
    if (!resutlPassword) return res.status(400).json({ success: false, status: 400, message: 'The user profile is incorrect' });

    const token = sign({ email }, secretKeyssss, { expiresIn });

    return res.status(200).setHeader('Set-Cookie', serialize('U', String(token), {
        httpOnly: true,
        maxAge: expiresIn,
        path: '/'
    })).json({
        success: true,
        status: 200,
        message: 'Loing'
    });

};