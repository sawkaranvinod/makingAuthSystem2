import {handleCheckUserIdExist} from "../controllers/checkUserIdExist.controller.js";
import {checkUserIdMiddleware} from "../middleware/checkUserIdExist.middleware.js";
export function checkUserIdExistRoutes(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            URL:"/",
            schema:{},
            preHandler:checkUserIdMiddleware,
            handler:handleCheckUserIdExist,
        }
    );
};