import checkBodySchema from "../helper/checkBodySchema.helper.js";

async function checkUserIdMiddleware(req, reply) {
  try {
    if (!Object.keys(req.body).length) {
      return reply.status(401).send({ message: "enter details",available:false});
    }
    const data = checkBodySchema(req.body);
    const ipAddress = req.ip;
    if (!data) {
      return reply.status(401).send({ message: "enter email" ,available:false});
    }
    data.ipAddress = ipAddress;
    req.body = data;
  } catch (error) {
    return reply.status(501).send({ message: "internal server error", available:false });
  }
}

export default checkUserIdMiddleware;
