import grpcCheckUserId from "../grpc/utils/checkUserId.grpc.js";
import {hotData,reserveData} from "../config/redis.config.js";

async function handleCheckUserId(req, reply) {
  try {
    const body = req.body;
    const email = body?.email;
    const ipAddress = body?.ipAddress;
    const availableInreserve = await reserveData.get(`reserveId:${email}`);

    if (availableInreserve) {
      return response.status(200).send({message:"this emailId is already used",available:false});
    }
    const availableInHotData = await hotData.get(`data:${email}`);
    if (availableInHotData) {
      return response.status(200).send({message:"this email is already in use",available:false});
    }
    const response = await grpcCheckUserId(email, ipAddress);
    if (!response) {
      return reply.status(501).send({ message: "internal server error" ,available:false});
    }
    await reserveData.set(`reserveId:${email}`,`${ipAddress}`);
    response.available = true;
    return reply.status(200).send(response);
  } catch (error) {
    console.log("error in the controller", error);
    return reply.status(501).send({ message: "internal server error",available:false});
  }
}

export default handleCheckUserId;
