import checkUserIdMiddleware from "../middleware/checkUserId.middleware.js";
import handleCheckUserId from "../controllers/checkUserId.controller.js";

async function checkUserIdRoutes(fastify, opts) {
  fastify.route(
    {
      method:"POST",
      url:"/checkuseridavailablity",
      schema:{},
      preHandler: checkUserIdMiddleware,
      handler: handleCheckUserId,
    }
  )
}

export default checkUserIdRoutes;
