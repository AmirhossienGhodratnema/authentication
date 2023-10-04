import { serialize } from "cookie";


export default async function handler(req, res) {
    if (req.method !== 'GET') return;
    return res.status(200).setHeader('Set-Cookie', serialize('U', '', {
        httpOnly: true,
        maxAge: 0,
        path: '/'
    })).json({
        success: true,
        status: 200,
        message: 'Loged out'
    });
}