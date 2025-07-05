import {loginMiddleware} from "../middleware/login.middleware.js";
import {handleLogin} from "../controllers/login.controller.js";
export function loginRouter(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{},
            preHandeler:loginMiddleware,
            handler:handleLogin,
        }
    )
}