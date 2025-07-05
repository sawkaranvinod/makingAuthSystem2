import {grpcLogin} from "../grpc/utils/login.utils.js";
import {grpcSendOtp} from "../grpc/utils/sendOtp.util.js";
import {redisReserveData} from "../config/redis.config.js";
import {generateOTP} from "../helper/generateOtp.helper.js";
import bcrypt from "bcryptjs";
export async function handleLogin(req,reply) {
    try {
        const {email,password,deviceFingerPrint} = req.body;
        const checkCache = await redisReserveData.get(`bind:${email}`);
        if (!checkCache) {
            return reply.send("user not found").status(404)
        };
        const data = await JSON.parse(checkCache);
        const compareDeviceHash = await bcrypt.compare(deviceFingerPrint,data.devicehash);
        if (!compareDeviceHash) {
            return reply.send({message:"bad request"}).status(402);
        };
        let checkPassword;
       try {
            checkPassword = await grpcLogin(email,password);
       } catch (error) {
            console.log(error.message)
            return reply.send({message:"internal server error"}).status(500)
       }
        if (!checkPassword.passMatched) {
            return reply.send({message:"wrong password entered"}).status(200);
        };
        const otp = generateOTP();
        let sendOtp;
        try {
            sendOtp = await grpcSendOtp(email,"login otp",otp)
        } catch (error) {
            console.log(error);
            return reply.send({message:"internal server error"}).status(500);
        };
        if (!sendOtp.sent) {
            return reply.send({message:"internal server error"}).status(500);
        };
        data.otp = otp;
        data.ipAddress = req.ip;
        await redisReserveData.set(
            `bind:${email}`,
            JSON.stringify(data)
        );
        return reply.send({message:"otp sent sucessfully for login the database"}).status(200);
    } catch (error) {
        console.log("error in the handler function of the controllers",error.message);
        return reply.send({message:"internal server error"}).status(500);
    }
}