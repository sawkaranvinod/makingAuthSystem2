import {sanatizeInput} from "../helper/sanatizeInput.helper.js";

export function verifyOtpLoginMiddleware(req,reply,done) {
    try {
        if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        if (!req.body.email || !req.body.otp || !req.body.deviceFingerPrint) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        const data = {
            email: sanatizeInput(req.body.email),
            otp: sanatizeInput(req.body.otp),
            deviceFingerPrint: req.body.deviceFingerPrint,
        };
        if (!data.email || !data.otp || data.otp.length !== 6) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        req.body = data;
        return done();
    } catch (error) {
        console.log("error is inside the middleware function of the verifyOtpLogin",error.message);
        return reply.send({message:"internal server error"}).status(500);
    }
}