import { verify } from "jsonwebtoken";

const { hash, compare } = require("bcryptjs");


async function hashPassword(password) {
    const hashPasswor = await hash(password, 12);
    return hashPasswor;
};

async function verifyPassword(password, hash) {
    const result = await compare(password, hash);
    return result
}


async function verifyToken(token) {
    try {
        const result = verify(token, process.env.SECRETE_KEY)
        return { email: result.email, success: true }
    } catch (error) {
        return false;

    }
}

export { hashPassword, verifyPassword, verifyToken }