import {updateNameMiddleware} from "../middleware/updateName.middleware.js";
import {handleUpdateName} from "../controllers/updateName.controller.js";
export function updateNameRoute(fastify,opts) {
    fastify.route(
        {
            method:"PATCH",
            url:"/",
            schema:{},
            preHandler:updateNameMiddleware,
            handler:handleUpdateName,
        }
    )
}