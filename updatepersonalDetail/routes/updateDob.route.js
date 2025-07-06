import {updateDobMiddleware} from "../middleware/updateDob.middleware.js";
import {handleUpdateDob} from "../controllers/updateDob.controller.js";
export function updateDobRoute(fastify,opts) {
    fastify.route(
        {
            method:"PATCH",
            url:"/",
            schema:{},
            preHandler:updateDobMiddleware,
            handler:handleUpdateDob,
        }
    );
};