import bcrypt from "bcryptjs";
import {redisReserveData} from "../config/redis.config.js";
import {grpcSendOtp} from "../grpc/utils/sendOtp.util.js";
import {generateOTP} from "../helper/generateOtp.helper.js";
export async function handleForgotPassword(req,reply) {
    try {
        const {email,method,deviceFingerPrint} = req.body;
        let data = await redisReserveData(`bind:${email}`);
        if (!data) {
            return reply.send({message:"user not found"}).status(404);
        };
        data = await JSON.parse(data);
        if (Object.keys(data).length !== 2) {
            return reply.send({message:"user not found"}).status(404);
        }
        const comparehash = await bcrypt.compare(deviceFingerPrint,data.devicehash);
        if (!comparehash) {
            return reply.send({message:"unotherized request"}).status(402);
        };
        const otp = generateOTP();
        let response;
        try {
            response = await grpcSendOtp(email,"forgot password otp",otp);
        } catch (error) {
            console.log("error is coming from grpc server",error.message);
            return reply.send({message:"internal server error"}).status(500);
        };
        if (!response) {
            return reply.send({message:"internal server error"}).status(500);
        };
        data.email = email;
        data.method = method;
        data.otp = otp;
        await redisReserveData.set(`forgotpassword:${email}`,JSON.stringify(data),"EX",300);

        return reply.send({message:"otp is sent successfully"}).status(200);

    } catch (error) {
        console.log("error in the main controller of the handle forgot pasword",error.message);
        return reply.send({message:"internal server error"}).status(500);
    }
}