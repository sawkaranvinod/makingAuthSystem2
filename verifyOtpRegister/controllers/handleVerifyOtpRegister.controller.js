import { grpcRegister } from "../grpc/utils/register.utils.js";
import { redisReserveData } from "../config/redis.config.js";
import argon2 from "argon2";

export async function handleVerifyOtpRegister(req, reply) {
  try {
    const { otp, ipAddress, email, password, name } = req.body;
    let data = await redisReserveData.get(`reserve:${email}`);
    if (!data) {
      return reply.status(404).send("bad request user not found");
    }
    data = JSON.parse(data);
    if (data.ipAddress !== ipAddress || otp !== data.otp) {
      return reply.status(404).send("bad request user not found");
    }
    // here we have to add a new grpc server which will just hash the password
    const hashedPassword = await argon2.hash(password);
    const registerResponse = await grpcRegister(
      name,
      email,
      hashedPassword,
      ipAddress
    );
    if (!registerResponse.saved) {
      return reply.status(500).send({ message: "Failed to save user" });
    }
    return reply.status(200).send({ message: "User registered successfully" });
  } catch (error) {
    console.log(
      "error in the controller of the handle verify otp register",
      error.message
    );
    return reply.status(500).send({ message: "internal server error" });
  }
}
