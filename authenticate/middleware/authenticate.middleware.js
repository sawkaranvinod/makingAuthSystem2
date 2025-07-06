
export function authenticateMiddleware(req, reply, done) {
    try {
        if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
            return reply.send({ message: "data is incomplete" }).status(400);
        };
        if (!req.body.deviceFingerPrint) {
            return reply.send({ message: "data is incomplete" }).status(400);
        }
        return done();
    } catch (error) {
        console.log("error in authenticate middleware", error.message);
        return reply.send({ message: "internal server error" }).status(500);
    }
}