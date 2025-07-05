import {sanatizeInput} from "../helper/sanatizeInput.helper.js";
import bcrypt from "bcryptjs";
export function checkUserIdMiddleware(req,reply,done) {
    try {
        if (!req.body || typeof req.body !== "object" || Object.keys(req.body) === 0) {
            return reply.mesage({mesage:"data is incomplete"}).status(400);
        };
        const data = req.body;
        if (!data.email || data.deviceFingerPrint) {
            return reply.send({message:"data is incomplete"}).status(400);
        };
        const devicehash = bcrypt.hashSync(data.deviceFingerPrint,6);
        data = {
            email: sanatizeInput(data.email),
            devicehash,
            ipAddress: req.ip,
        };
        req.body = data;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the check user id exist",error.mesage);
        return reply.send({message:"internal server error"}).status(500);
    }
}
// change the error here