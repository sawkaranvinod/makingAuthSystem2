import {verifyOtpRegister} from "./verifyOtpRegister.route.js"
export function masterRouter(fastify,opts) {
    fastify.register(verifyOtpRegister,{prefix:"/api/v1"});
};