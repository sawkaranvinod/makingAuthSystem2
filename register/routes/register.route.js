import {registerMiddleware} from "../middleware/register.middleware.js";
import {handleRegister} from "../controllers/register.controller.js";
export function registerRouter(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"/register",
            schema:{},
            preHandler: registerMiddleware,
            handler: handleRegister,
        }
    )
};

