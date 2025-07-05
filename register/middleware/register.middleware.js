import {sanatizeInput} from "../helper/sanatizeInput.helper.js"
export function registerMiddleware(request,reply,done) {
    try {
        if (!request.body || typeof request.body !== "object" || !Object.keys(request.body).length ) {
            return reply.send({message:"body is empty"});
        };
        const {name,email,password} = request.body;
        if (!name || !email || !password) {
            return reply.send({message:"data is not complete"});
        };
        const data = {
            name: sanatizeInput(name),
            email: sanatizeInput(email),
            password: sanatizeInput(password),
            ipAddress: request.ip,
        };
        if (!data.name || !data.email || !data.password) {
            return reply.send({message:"data is not complete"});
        };
        request.body = data;
        return done();
    } catch (error) {
        console.log("error in the register middlewaare",error.message);
        return reply.send({message:"internal server error"}).status(500);
    }
}