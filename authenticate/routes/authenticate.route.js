import { authenticateMiddleware } from "../middleware/authenticate.middleware.js";
import { handleAuthenticate } from "../controllers/authenticate.controller.js";

export function authenticateRouter(fastify, opts) {
    fastify.route({
        method: "POST",
        url: "/",
        schema: {},
        preHandler: authenticateMiddleware,
        handler: handleAuthenticate,
    });
}