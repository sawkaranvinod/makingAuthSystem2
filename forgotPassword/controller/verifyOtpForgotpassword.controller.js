import {redisReserveData} from "../config/redis.config.js";
import bcrypt from "bcryptjs";
import argon from "argon2";
import {grpcForgotPassword} from "../grpc/utils/forgotPassword.utils.js";


export async function handleVerifyOtpForgotPassword(req,reply) {
    try {
        const {email,otp,password,deviceFingerPrint} = req.body;
        let data = await redisReserveData(`bind:${email}`);
        if (!data) {
            return reply.send({message:"user not found"}).status(404);
        };
        data = await JSON.parse(data);
        if (Object.keys(data).length <= 2) {
            return reply.send({message:"user not found"}).status(404);
        };
        const comparehash = await bcrypt.compare(deviceFingerPrint,data.devicehash);
        if (!comparehash) {
            return reply.send({message:"user is not authorized to do this"}).status(402);
        };
        if (otp !== data.otp) {
            return reply.send({message:"otp is incorrect"}).status(404);
        };
        const hashedNewPassword = await argon.hash(password);
        let response;
        try {
            response = await grpcForgotPassword(email,hashedNewPassword);
        } catch (error) {
            console.log("error is coming from the grpc server",error.message);
            return reply.send({message:"internal server error"}).status(500);
        };
        if (!response) {
            return reply.send({message:"internal server error"}).status(500);
        };
        return reply.send({message:"password changed sucessfully"}).status(200);
    } catch (error) {
        console.log("error in the main controller of the verify otp forgot password",error.message);
        return reply.send({message:"internal server error"}).status(500);
    }
}