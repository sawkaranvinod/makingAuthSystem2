import checkUserIdMiddleware from "../middleware/checkUserId.middleware.js";
import handleCheckUserId from "../controllers/checkUserId.controller.js";

async function checkUserIdRoutes(fastify, opts) {
  fastify.post(
    "/check-userid-availablity",
    { preHandler: checkUserIdMiddleware },
    handleCheckUserId
  );
}

export default checkUserIdRoutes;
