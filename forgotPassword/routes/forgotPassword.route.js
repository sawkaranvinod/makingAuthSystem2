import {forgotPasswordMiddleware} from "../middleware/forgotPassword.middleware.js";
import {handleForgotPassword} from "../controller/forgotPassword.controller.js";
export function forgotPasswordRouter(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{},
            preHandler:forgotPasswordMiddleware,
            handler:handleForgotPassword,
        }
    )
}