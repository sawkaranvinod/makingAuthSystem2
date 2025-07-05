import grpcCheckUserId from "../grpc/utils/checkUserId.grpc.js";
import { hotData, reserveData } from "../config/redis.config.js";

async function handleCheckUserId(req, reply) {
  try {
    const body = req.body;
    const email = body?.email;
    const ipAddress = body?.ipAddress;
    const availableInreserve = await reserveData.get(`reserve:${email}`);
    if (availableInreserve) {
      const reserveObj = JSON.parse(availableInreserve);
      if (reserveObj.ipAddress === String(ipAddress)) {
        await reserveData.set(
          `reserve:${email}`,
          JSON.stringify({ ipAddress }),
          "EX",
          900
        );
        return reply.status(200).send({ message: "email is available", available: true });
      }
      return reply.status(200).send({ message: "this emailId is already used", available: false });
    }

    const availableInHotData = await hotData.get(`data:${email}`);
    if (availableInHotData) {
      return reply.status(200).send({ message: "this email is already in use", available: false });
    }

    const grpcResponse = await grpcCheckUserId(email, ipAddress);
    if (!grpcResponse) {
      return reply.status(501).send({ message: "internal server error", available: false });
    }
    if (!grpcResponse.available) {
      return reply.send({message:"userId is already in use",available:false});
    };
     await reserveData.set(
      `reserve:${email}`,
      JSON.stringify({ ipAddress }),
      "EX",
      900
    );
    return reply.status(200).send({ message: "email is available", available: true});
  } catch (error) {
    console.log("error in the controller", error);
    return reply.status(501).send({ message: "internal server error", available: false });
  }
}

export default handleCheckUserId;
