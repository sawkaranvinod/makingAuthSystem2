import JWT from "jsonwebtoken";
export async function verifyToken(token,key) {
    try {
        const payload = await JWT.verify(token,key);
        return payload;
    } catch (error) {
        return null;
    }
}