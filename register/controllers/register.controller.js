import {grpcSendOtp} from "../grpc/utils/sendOtp.util.js";
import {generateOTP} from "../helper/generateOtp.helper.js";
import {redisReserveUserData} from "../config/redis.config.js";
import bcrypt from "bcryptjs";
export async function handleRegister(request,reply) {
    try {
        const data = request?.body;
        const otp = generateOTP();
        const reserverOrNot = await redisReserveUserData.get(`reserve:${data.email}`);
        if(!reserverOrNot){
            return reply.send({message:"bad request"}).status(400);
        }
        const reserverOrNotData = await JSON.parse(reserverOrNot);
        const comparingHash = await bcrypt.compare(data.deviceFingerPrint,reserverOrNotData.devicehash);
        if (comparingHash) {
            return reply.send({message:"bad request"}).status(401);
        }
        const response = await grpcSendOtp(data.email,"OTP for resistering",otp);
        if (!response.sent) {
            return reply.send({message:"internal server error"}).status(500);
        };
        data.otp = otp;
        data.deviceFingerPrint = null,
        data.devicehash = reserverOrNotData.devicehash;
        await redisReserveUserData.set(
            `reserve:${data.email}`,
            JSON.stringify(data),
            "EX",
            900
        );
        return reply.send({message:"otp is sent"}).status(200);
    } catch (error) {
        console.log("error in the handler function of the controller",error);
        return reply.send({message:"internal server error"}).status(500);
    }
};