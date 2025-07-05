import {registerRouter} from "./register.route.js";
export function masterRouter(fastify,opts) {
    fastify.register(registerRouter,{prefix:"/api/v1"});
};