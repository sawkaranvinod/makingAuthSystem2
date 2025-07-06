import {sanatizeInput} from "../helper/sanatizeInput.helper.js";

export function loginMiddleware(req, res, done) {
    try {
        if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
            return res.status(400).send({
                message:"body is required"
            });
        }
        if (!req.body.email || !req.body.password || !req.body.deviceFingerPrint) {
            return res.status(400).send({
                message:"email and password are required"
            })
        };
        const email = sanatizeInput(req.body.email);
        if (!email) {
            return res.status(400).send({
                message:"email and password are required"
            }); 
        }
        const data = {
            email: email,
            password: req.body.password.trim(),
            deviceFingerPrint: req.body.deviceFingerPrint,
        };
        req.body = data;
        return done();

    } catch (error) {
        console.log("internal server error",error.message);
        return res.status(500).send({
            message:"internal server error"
        })
    }
}