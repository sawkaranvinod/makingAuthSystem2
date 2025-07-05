import {sanatizeInput} from "../helper/sanatizeInput.helper.js"
export function verifyOtpRegisterMiddleware(req,reply,done) {
    try {
        if (!req.body || typeof Object.keys(req.body) !== "object" || Object.keys(req.body).length === 0 ) {
            return reply.send({message:"data is not complete"}).status(400);
        };
        const data = req.body;
        if (!data.otp || !data.deviceFingerPrint || !data.email) {
            return reply.send({message:"data is not complete"}).status(400);
        };
        data.otp = sanatizeInput(data.otp);
        data.email = sanatizeInput(email);
        if (!data.otp || !data.email) {
            return reply.send({message:"data is not complete"}).status(400);
        };
        data.ipAddress = req.ip;
        req.body = data;
        return done();
    } catch (error) {
        console.log("fastify middleware error",error.message);
        return reply.send({message:"internal server error"}).status(500);
    }
}