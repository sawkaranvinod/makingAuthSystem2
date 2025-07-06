import JWT from "jsonwebtoken";

export async function generateToken(payload, key,expiresIn) {
    try {
        const token = JWT.sign(payload, key, { expiresIn });
        return token;
    } catch (error) {
        console.log("error in generating JWT token");
        return null;
    }
}