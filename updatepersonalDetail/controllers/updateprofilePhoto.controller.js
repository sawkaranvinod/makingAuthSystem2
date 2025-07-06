import { config } from "dotenv";
import { verifyToken } from "../helper/verifyToken.helper.js";
import bcrypt from "bcryptjs";
import { grpcUpdateProfilePhoto } from "../grpc/utils/updateProfilePhoto.utils.js";
config();
const accessTokenKey = process.env.ACCESS_TOKEN_KEY || "hellobro";

export async function handleUpdateProfilePhoto(req, reply) {
    try {
        const { email, profilePhoto, accessToken, deviceFingerPrint } = req.body;
        const verifyAccessToken = await verifyToken(accessToken, accessTokenKey);
        if (!verifyAccessToken) {
            return reply.send({ message: "unauthorized action" }).status(401);
        }
        const comparehash = await bcrypt.compare(deviceFingerPrint, verifyAccessToken.devicehash);
        if (!comparehash) {
            return reply.send({ message: "unauthorized action" }).status(401);
        }
        let response;
        try {
            response = await grpcUpdateProfilePhoto(email, profilePhoto);
        } catch (error) {
            console.log("error is coming from the grpc server of the update profile photo function", error.message);
            return reply.send({ message: "internal server error" }).status(500);
        }
        if (!response || Object.keys(response).length === 0 || !response.updated) {
            return reply.send({ message: "internal server error" }).status(500);
        }
        return reply.send({ message: "success" }).status(200);
    } catch (error) {
        console.log("error in the handler function of the update profile photo controller", error.message);
        return reply.send({ message: "internal server error" }).status(500);
    }
}