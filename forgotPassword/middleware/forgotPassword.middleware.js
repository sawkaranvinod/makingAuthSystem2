import {sanatizeInput} from "../helper/sanatizeInput.helper.js";

export function forgotPasswordMiddleware(req,reply,done) {
    try {
        if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        if (!req.body.method || !req.body.deviceFingerPrint || !req.email) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        const data = {
            email: sanatizeInput(req.body.email),
            method: sanatizeInput(req.body.method),
            deviceFingerPrint:req.body.deviceFingerPrint,
        };
        if (!data.email || !data.method) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        req.body = data;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the forgot password middleware function",error.message);
        return reply.send({message:"internal server error"}).status(500);
    }
}