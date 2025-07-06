import { grpcRegister } from "../grpc/utils/register.utils.js";
import { redisReserveData } from "../config/redis.config.js";
import argon2 from "argon2";
import bcrypt from "bcryptjs";
import {generateToken} from "../helper/generateToken.helper.js";
import {config} from "dotenv";
config();
const accessTokenKey = process.env.ACCESS_TOKEN_KEY || "hellobro";
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY || "hellobro";

export async function handleVerifyOtpRegister(req, reply) {
  try {
    const {otp,ipAddress,deviceFingerPrint,email} = req.body;
    let data = await redisReserveData.get(`reserve:${email}`);
    if (!data) {
      return reply.status(404).send("bad request user not found");
    }
    data = JSON.parse(data);
    const compareHash = await bcrypt.compare(deviceFingerPrint,data.devicehash);
    if (data.ipAddress !== ipAddress || otp !== data.otp || compareHash) {
      return reply.status(404).send("bad request user not found");
    }
    // here we have to add a new grpc server which will just hash the password
    const hashedPassword = await argon2.hash(password);
    const registerResponse = await grpcRegister(
      data.name,
      email,
      hashedPassword,
      ipAddress,
      data.devicehash,
    );
    if (!registerResponse.saved) {
      return reply.status(500).send({ message: "Failed to save user" });
    };
    const accessToken = await generateToken({devicehash:data.devicehash},accessTokenKey,"30d");
    const refreshToken = await generateToken({email,name:data.name,devicehash:data.devicehash},refreshTokenKey,"180d");
    return reply.status(200).send({ message: "User registered successfully",accessToken,refreshToken });
  } catch (error) {
    console.log(
      "error in the controller of the handle verify otp register",
      error.message
    );
    return reply.status(500).send({ message: "internal server error" });
  }
}
