import {checkUserIdExistRoutes} from "./checkUserIdExist.route.js";
export function masterRouter(fastify,opts) {
    fastify.register(checkUserIdExistRoutes,{prefix:"/checkuseridexist"});
}