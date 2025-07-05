import {redisReserveData} from "../config/redis.config.js";
import {config} from "dotenv";
import {generateToken} from "../helper/generateToken.helper.js";
import {grpcSaveLoginDetail} from "../grpc/utils/login.utils.js";
import bcrypt from "bcrypt";
config();
const accessTokenKey = process.env.ACCESS_TOKEN_KEY || "hellobro";
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY || "hellobro";

export async function handleVerifyOtpLogin(req,reply) {
    try {
        const {email,otp,deviceFingerPrint} = req.body;
        let data = await redisReserveData(`bind:${email}`);
        if (!data) {
            return reply.send({message:"user not found"}).status(404);
        };
        data = await JSON.parse(data);
        const comparehash = await bcrypt.compare(deviceFingerPrint,data.devicehash);
        if (!comparehash) {
            return reply.send({message:"user not found"}).status(404);
        };
        if (data.otp !== otp) {
            return reply.send({message:"otp is incorrect"}).status(400);
        };
        let saveData;
        const ipAddress = data.ipAddress || req.ip;
        try {
            saveData = await grpcSaveLoginDetail(ipAddress,data.devicehash);
        } catch (error) {
            console.log("error is comming from the grpc server of the login detail saving",error.message);
            return reply.send("internal server error").status(500);
        };
        if (!Object.keys(saveData).length || !saveData.saved ) {
            return reply.send({message:"internal server error"}).status(500);
        };
        const bindingString = Date.now();
        const accessToken = await generateToken({bindingString},accessTokenKey,"30d");
        const refreshToken = await generateToken({email,name:data.name,bindingString,devicehash:data.devicehash});
        return reply.send({message:"user login sucessfully",accessToken,refreshToken,name:data.name}).status(200);
    } catch (error) {
        console.log("error in the controller of the verify otp login controller",error.message);
        return reply.send({message:"internal server error"}).status(500);
    }
}