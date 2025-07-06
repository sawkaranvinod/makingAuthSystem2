import {forgotPasswordRouter} from "./forgotPassword.route.js";
import {verifyOtpForgotPasswordRouter} from "./verifyForgotPassword.route.js";
export function masterRouter(fastify,opts) {
    fastify.register(forgotPasswordRouter,{prefix:"/forgotpassword"});
    fastify.register(verifyOtpForgotPasswordRouter,{prefix:"/verifyotpforgotpassword"});
};