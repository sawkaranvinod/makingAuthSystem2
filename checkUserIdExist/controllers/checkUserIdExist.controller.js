import { redisReserveData } from "../config/redis.config.js";
import { grpcCheckUserId } from "../grpc/utils/checkUserId.grpc.js";

export async function handleCheckUserIdExist(req, reply) {
  try {
    const data = req.body;
    const { email, devicehash, ipAddress } = data;
    const grpcResponse = await grpcCheckUserId(email);
    if (!grpcResponse || !grpcResponse.avilable) {
      return reply
        .send({ message: "userId is already in use", exist: false })
        .status(200);
    }

    await redisReserveData.set(
      `bind:${email}`,
      JSON.stringify({ ipAddress, devicehash }),
      "EX",
      900
    );
    return reply
      .send({ message: "email is exist", exist: true })
      .status(200);
  } catch (error) {
    console.log(
      "error in the controller of the check user id exist ",
      error.message
    );
    return reply.send({ message: "internal server error" }).status(500);
  }
}
