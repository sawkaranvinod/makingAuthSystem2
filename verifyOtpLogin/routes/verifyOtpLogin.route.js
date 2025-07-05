import {verifyOtpLoginMiddleware} from "../middleware/verifyOtpLogin.middleware.js";
import {handleVerifyOtpLogin} from "../controllers/verifyOtpLogin.controller.js";
export function verifYOtpLoginRoute(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{},
            preHandler:verifyOtpLoginMiddleware,
            handler:handleVerifyOtpLogin,
        }
    )
}