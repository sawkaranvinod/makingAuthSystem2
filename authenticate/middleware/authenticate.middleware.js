import { sanatizeInput } from "../helper/sanatizeInput.helper.js";

export function authenticateMiddleware(req, reply, done) {
    try {
        if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
            return reply.send({ message: "data is incomplete" }).status(400);
        }
        const { email, password, deviceFingerPrint } = req.body;
        if (!email || !password || !deviceFingerPrint) {
            return reply.send({ message: "data is incomplete" }).status(400);
        }
        const data = {
            email: sanatizeInput(email),
            password: password.trim(),
            deviceFingerPrint,
        };
        if (!data.email || !data.password) {
            return reply.send({ message: "data is incomplete" }).status(400);
        }
        req.body = data;
        return done();
    } catch (error) {
        console.log("error in authenticate middleware", error.message);
        return reply.send({ message: "internal server error" }).status(500);
    }
}