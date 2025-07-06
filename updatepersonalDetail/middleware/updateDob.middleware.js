import {sanatizeInput} from "../helper/sanatizeInput.helper.js";
export function updateDobMiddleware(req,reply,done) {
    try {
        if (!req.body || typeof req.body !== "object" || Object.keys(req.body) === 0) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        if (!req.body.email || !req.body.dob || !req.body.deviceFingerPrint || !req.body.accessToken) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        const data  = {
            name: sanatizeInput(dob),
            email: sanatizeInput(email),
            accessToken: req.header.accessToken,
            deviceFingerPrint: req.body.deviceFingerPrint,
        };
        if (!data.email || !data.dob) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        req.body = data;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the updatedob middleware",error.message);
        return reply.send({message:"internal server error"}).status(500);
    };
}