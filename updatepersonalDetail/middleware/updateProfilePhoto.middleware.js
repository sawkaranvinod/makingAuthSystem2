import { sanatizeInput } from "../helper/sanatizeInput.helper.js";

export function updateProfilePhotoMiddleware(req, reply, done) {
    try {
        if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
            return reply.send({ message: "data is incomplete" }).status(400);
        }
        const { email, profilePhoto, deviceFingerPrint, accessToken } = req.body;
        if (!email || !profilePhoto || !deviceFingerPrint || !accessToken) {
            return reply.send({ message: "data is incomplete" }).status(400);
        }
        const data = {
            email: sanatizeInput(email),
            profilePhoto,
            deviceFingerPrint,
            accessToken,
        };
        if (!data.email || !data.profilePhoto) {
            return reply.send({ message: "data is incomplete" }).status(400);
        }
        req.body = data;
        return done();
    } catch (error) {
        console.log("error in the middleware function of updateProfilePhoto", error.message);
        return reply.send({ message: "internal server error"})
    }
}