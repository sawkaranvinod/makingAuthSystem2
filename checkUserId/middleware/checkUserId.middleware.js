import checkBodySchema from "../helper/checkBodySchema.helper.js";
import bcrypt from "bcryptjs";
function checkUserIdMiddleware(req, reply,done) {
  try {
    if (!req.body || typeof req.body !== "object" || !Object.keys(req.body).length) {
      return reply.status(400).send({ message: "Enter details", available: false });
    }

    const data = checkBodySchema(req.body);
    if (!data || !data.email) {
      return reply.status(400).send({ message: "Enter a valid email", available: false });
    }
    data.deviceHash = bcrypt.hashSync(req.body.deviceFingerPrint,6);
    data.ipAddress = req.ip;
    req.body = data;
    
    return done();
  } catch (error) {
    console.log("Error in checkUserIdMiddleware:", error);
    return reply.status(500).send({ message: "Internal server error", available: false });
  }
}

export default checkUserIdMiddleware;
