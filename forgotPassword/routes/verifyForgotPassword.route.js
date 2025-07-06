import {verifyOtpForgotPasswordMiddleware} from "../middleware/verifyOtpForgotPassword.middleware.js";
import {handleVerifyOtpForgotPassword} from "../controller/verifyOtpForgotpassword.controller.js";
export function verifyOtpForgotPasswordRouter(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{},
            preHandler:verifyOtpForgotPasswordMiddleware,
            handler:handleVerifyOtpForgotPassword,
        }
    )
}