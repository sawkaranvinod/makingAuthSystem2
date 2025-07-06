import {sanatizeInput} from "../helper/sanatizeInput.helper.js";
export function updateNameMiddleware(req,reply,done) {
    try {
        if (!req.body || typeof req.body !== "object" || Object.keys(req.body) === 0) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        if (!req.body.email || !req.body.name || !req.body.deviceFingerPrint || !req.body.accessToken) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        const data  = {
            name: sanatizeInput(name),
            email: sanatizeInput(email),
            accessToken: req.header.accessToken,
            deviceFingerPrint: req.body.deviceFingerPrint,
        };
        if (!data.email || !data.name) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        req.body = data;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the updateName middleware",error.message);
        return reply.send({message:"internal server error"}).status(500);
    };
}