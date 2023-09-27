const { hash } = require("bcryptjs");


export default async function hashPassword(password) {
    const hashPasswor = await hash(password, 12);
    return hashPasswor;
};