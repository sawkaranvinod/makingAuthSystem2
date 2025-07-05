import { loginRouter } from "./login.route.js";
export function masterRouter(fastify,opts) {
    fastify.register(loginRouter,{prefix:"/login"})
}