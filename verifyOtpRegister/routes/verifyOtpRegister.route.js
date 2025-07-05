import {verifyOtpRegisterMiddleware} from "../middleware/verifyOtpRegister.middleware.js";
import {handleVerifyOtpRegister} from "../controllers/handleVerifyOtpRegister.controller.js";
export function verifyOtpRegister(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"",
            schema:{},
            preHandler:verifyOtpRegisterMiddleware,
            handler:handleVerifyOtpRegister,
        }
    );
};