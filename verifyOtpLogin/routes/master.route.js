import {verifYOtpLoginRoute} from "./verifyOtpLogin.route.js";
export function masterRouter(fastify,opts) {
    fastify.register(verifYOtpLoginRoute,{prefix:"/verifyotplogin"});
}