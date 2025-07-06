import {sanatizeInput} from "../helper/sanatizeInput.helper.js";

export function verifyOtpForgotPasswordMiddleware(req,reply,done){
    try {
        if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        if (!req.body.otp || req.body.password || !req.body.deviceFingerPrint || !req.body.otp) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        const data = {
            email: sanatizeInput(req.body.email),
            password: req.body.password.trim(),
            deviceFingerPrint: req.body.deviceFingerPrint,
            otp: sanatizeInput(req.body.otp),
        };
        if (!data.email || !data.otp) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        req.body = data;
        return done();
    } catch (error) {
        console.log("error in the middleware of the verifyOtp forgotpassword",error.message);
        return reply.send({message:"internal server error"}).status(500);
    }
}