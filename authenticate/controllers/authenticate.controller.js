import {generateToken} from "../helper/generateToken.helper.js";
import {verifyToken} from "../helper/verifyToken.helper.js";
import bcrypt from "bcryptjs";
import {config} from "dotenv";
config();
const accessTokenKey = process.env.ACCESS_TOKEN_KEY || "hellobro";
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY || "hellobro";
export async function handleAuthenticate(req,reply) {
    try {
        const accessToken = req.body?.accessToken;
        const refreshToken = req.body?.refreshToken;
        const deviceFingerPrint = req.body.deviceFingerPrint;
        if (!refreshToken) {
            return reply.send({message:"unauthorized"}).status(401);
        };
        if (accessToken) {
            const accessTokenPayload = await verifyToken(accessToken,accessTokenKey);
            if (accessTokenPayload) {
                const comparehash = await bcrypt.compare(deviceFingerPrint,accessTokenPayload.devicehash);
                if (comparehash) {
                    return reply.send({refreshToken,accessToken}).status(200);
                };
                return reply.send({message:"unaurthorized request"}).status(400);
            };
        };
        const refreshTokenPayload = await verifyToken(refreshToken,refreshTokenKey);
        if (!refreshTokenPayload) {
            return reply.send({message:"unaurthorized request"}).status(400);
        };
        const comparehash = await bcrypt.compare(deviceFingerPrint,refreshTokenPayload.devicehash);
        if (!comparehash) {
            return reply.send({message:"unaurthorized request"}).status(400);
        };
        const newAccessToken = await generateToken({devicehash:refreshTokenPayload.devicehash},accessTokenKey,"30d");
        const newRefreshtoken = await generateToken(refreshTokenPayload,refreshTokenKey,"180d");
        return reply.send({accessToken:newAccessToken,refreshToken:newRefreshtoken}).status(200);

    } catch (error) {
        console.log("error in the main handle function of the controller of authenticate",error.message);
        return reply.send({message:"internal server error"}).status(500);
    }
}